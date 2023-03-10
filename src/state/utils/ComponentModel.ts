import produce from "immer";
import _ from "lodash";
import { ObjectPaths } from "../../model/utils/UtilityTypes";
import { WithEvents } from "./WithEvents";

const STATE_UPDATE = Symbol("State updated");
let c = 0;

type Change = {
  key: string;
  transaction: boolean;
  passThrough: boolean;
  shouldEmit: boolean;
};

/**
 * ComponentModel
 *   - provides immutable state
 *   - offers methods to read/update that immutable state
 *
 * When the state is updated, callbacks registered with .onStateUpdated() are invoked.
 *
 * .updateState() invokes the callbacks
 *
 * Transactions support
 * --------------------
 *
 * .begin()
 *   .updateState()
 *   .updateState()
 * .commit()
 *
 * notifies state update once at the end.
 *
 * Debouncing notifications
 * ------------------------
 *
 * By default, state updated notifications are debounced. This can be turned off by calling .syncFeel() method.
 *   - used in FormModel
 *
 * Transactions vs. debouncing
 * ---------------------------
 *
 * Transactions are meant to be used by extending classes
 *   - in their methods which do more complex state updates
 *   - the contents of the transaction is fully under the control (known in the model method implementation)
 *
 * Debouncing is a mechanism to batch multiple calls to exposed methods from outside (from react components)
 *   - the rate and count of calls is not under control of the model
 *
 */
export abstract class ComponentModel<
  StateType extends object
> extends WithEvents {
  _setStatedByParent: boolean = false;

  private id: number = ++c;
  private name?: string;
  private createdAt: number = new Date().getTime();

  private EMIT_DEBOUNCE = 35;

  private debug: boolean = false;

  private inTransaction: boolean = false;
  /**
   * Passthrough mode just sets the value to the state but does not emit the notification.
   */
  private inPassThrough: boolean = false;

  private initialized: boolean = false;
  private changes: Change[] = [];

  protected state: StateType = {} as StateType;

  /**
   * Allows adding handlers to be called when the model is destroyed, like unsubscribing from MCs.
   */
  private onDestroy: (() => void)[] = [];

  constructor(initialState: Partial<StateType> = {}) {
    super();
    this.state = {
      ...initialState,
    } as StateType;
  }

  protected clip(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  /**
   * Do not call this method directly, call it using this.initOnce().
   * This method should be called by the "owning" component, the one which really owns the model.
   *
   * Need to have it public to be able to read param types in useModel hook.
   * @param params
   */
  public abstract __init(...params: any[]): void;

  /**
   * Use this method to register cleanup callbacks.
   */
  protected __callOnDestroy(callback: () => void) {
    this.onDestroy.push(callback);
  }

  /**
   * Call to this method invokes all handlers registered by __callOnDestroy. It is used by the useModel hook.
   */
  public __destroy() {
    for (const callback of this.onDestroy) {
      callback();
    }
  }

  public initOnce(initParams: any[]) {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.__init(...initParams);
  }

  setDebug(debug: boolean = true, name?: string) {
    this.debug = debug;
    if (name !== undefined) {
      this.name = name;
    }

    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  syncFeel() {
    this.notifyStateUpdated = this._notifyStateUpdated;

    return this;
  }

  /**
   * Allows for setting the state value without notification.
   */
  passThrough(setStateCallback: (model: this) => void) {
    this.inPassThrough = true;
    this.begin();

    setStateCallback(this);

    this.endNoCommit();
    this.inPassThrough = false;
  }

  /** Opens a "transaction", meaning updates to the state will be notified only when commit() is called. */
  protected begin() {
    this.inTransaction = true;
  }

  protected endNoCommit() {
    this.inTransaction = false;
    this.changes = [];
  }

  /**
   * Commits transaction and notifies of state updates.
   */
  protected commit() {
    if (this.inPassThrough) {
      return;
    }

    this.inTransaction = false;

    // if there is something to commit
    if (this.changes.length) {
      this.changes.push({
        key: "commit",
        transaction: true,
        passThrough: false,
        shouldEmit: true,
      });
    }

    this.notifyStateUpdated();
  }

  /**
   * Allows for injecting sub-model state into this state.
   */
  protected useSubModel<
    U extends keyof StateType,
    V extends ComponentModel<StateType[U] & object>
  >(subModel: V, as: U, initParams: Parameters<V["__init"]>) {
    subModel.initOnce(initParams);
    this.state[as] = subModel.getState();

    // cleanup the un state updated subscription
    this.__callOnDestroy(
      subModel.onStateUpdated((newSubState) => {
        this.updateState(as as ObjectPaths<StateType, 4>, newSubState);
      })
    );

    return subModel;
  }

  protected identify() {
    const now = new Date().getTime();
    const time = ((now - this.createdAt) / 1000).toFixed(3);
    return [[this.id, this.name, `🕑 ${time}s`].join("-")];
  }

  getState() {
    return this.state;
  }

  protected isEqual = ComponentModel.RelaxedEqual;

  public setIsEqualComparator(comparator: typeof this.isEqual) {
    this.isEqual = comparator;
  }

  static StrictEqual<T>(a: T, b: T): boolean {
    return a === b;
  }

  static RelaxedEqual<T>(a: T, b: T): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }

      return true;
    }

    return a === b;
  }

  /**
   * Creates new state and triggers event.
   * @param propPath
   * @param newValue
   * @returns False if value was same as current value, true otherwise.
   */
  protected updateState(
    propPath: ObjectPaths<StateType, 4>,
    newValue: any,
    // @ts-ignore
    isEqual: typeof this.isEqual = this.isEqual
  ): boolean {
    const current = _.get(this.state, propPath);
    if (isEqual(current, newValue)) {
      if (this.debug) {
        // console.log(this.identify(), `SAME STATE - path: "${propPath}"`);
      }
      return false;
    }

    const change = {
      key: propPath,
      transaction: this.inTransaction,
      passThrough: this.inPassThrough,
      shouldEmit: !this.inTransaction,
    };

    this.changes.push(change);

    if (this.debug) {
      console.log(
        "↻ UPDATE STATE",
        this.identify(),
        `path: "${propPath}", newValue:`,
        newValue,
        "current:",
        current,
        change
      );
    }

    this.state = produce(this.state, (draft) => {
      _.set(draft, propPath, newValue);
    });

    this.notifyStateUpdated();

    return true;
  }

  private _notifyStateUpdated = () => {
    const changesToEmit = this.changes.filter((change) => change.shouldEmit);
    if (changesToEmit.length) {
      if (this.debug) {
        console.log(
          "'⇝ EMIT changes':",
          this.identify(),
          this.changes.map(
            (change) => `{${change.key}, emit: ${change.shouldEmit}}`
          )
        );
      }

      this.changes = [];
      this.emit(STATE_UPDATE, [this.state]);
    }
  };

  protected notifyStateUpdated: () => void = _.debounce(
    this._notifyStateUpdated,
    this.EMIT_DEBOUNCE
  );

  /**
   * Allows registering a callback which is invoked when the state is updated.
   */
  onStateUpdated(callback: (state: StateType) => void, async: boolean = true) {
    return this.on(STATE_UPDATE, callback, async);
  }
}
