import { PropsUtils } from "./PropsUtils";

type EventCallbackParameters = any[];

export type WithEventsCallback = (...params: EventCallbackParameters) => void;

type CallbackAndSettings = {
  async: boolean;
  callback: WithEventsCallback;
};

type OffSymbol = symbol;
type EventNameSymbol = symbol;

const ALL_EVENTS = Symbol("all events");

/**
 * Call this function to remove attached event listener.
 */
export type Unsubscribe = () => void;

type CallbacksMap = {
  [symbol: EventNameSymbol]: CallbackAndSettings[];
};

type CallbacksReverseLookup = {
  [offSymbol: OffSymbol]: [
    eventNameSymbol: EventNameSymbol,
    callback: WithEventsCallback
  ];
};

/**
 * This class should be used as a base class for classes emitting events.
 * Depending on settings, events can be emitted asynchronously or synchronously, async as default.
 */
export class WithEvents {
  private callbacksReverseLookup: CallbacksReverseLookup = {};
  private callbacks: CallbacksMap = {};

  private capturing: boolean = false;
  private capturedOffs: Unsubscribe[] = [];

  captureUnsubscribes() {
    this.capturedOffs = [];
    this.capturing = true;
  }

  getCapturedUnsubscribe() {
    const captured = [...this.capturedOffs];
    this.capturedOffs = [];
    this.capturing = false;

    return PropsUtils.sequence(...captured);
  }

  /**
   * Adds new event listener for given eventName, returns unique id which can be used to unregister the listener
   * with the off() method.
   */
  protected on(
    eventName: symbol,
    callback: WithEventsCallback,
    async = true
  ): Unsubscribe {
    const offSymbol: OffSymbol = Symbol();

    this.callbacksReverseLookup[offSymbol] = [eventName, callback];

    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = [];
    }

    const callbackAndSettings: CallbackAndSettings = {
      async,
      callback,
    };

    this.callbacks[eventName].push(callbackAndSettings);

    const unsubscribe = () => {
      this.off(offSymbol);
    };

    if (this.capturing) {
      this.capturedOffs.push(unsubscribe);
    }

    return unsubscribe;
  }

  /**
   * Experimental
   */
  onAnyEvent(callback: WithEventsCallback, async = true) {
    return this.on(ALL_EVENTS, callback, async);
  }

  /**
   * Removes listener previously attached. Is private.
   *
   * call unsubscribe() function returned from .on() method to unsubscribe.
   */
  private off(offSymbol: OffSymbol): void {
    if (!this.callbacksReverseLookup[offSymbol]) {
      return;
    }

    const [eventName, callback] = this.callbacksReverseLookup[offSymbol];
    delete this.callbacksReverseLookup[offSymbol];

    const currentEvents = this.callbacks[eventName];
    this.callbacks[eventName] = currentEvents.filter(
      (fn) => fn.callback !== callback
    );
  }

  /**
   * Emits given event with parameters.
   * @param eventName
   * @param params
   */
  protected emit(eventName: symbol, params: EventCallbackParameters) {
    for (const { callback, async } of this.callbacks[eventName] || []) {
      if (async) {
        window.setTimeout(() => {
          callback.apply(this, params);
        }, 0);
      } else {
        callback.apply(this, params);
      }
    }

    // experimental - calls handlers on any event
    if (eventName !== ALL_EVENTS) {
      this.emit(ALL_EVENTS, [eventName, ...params]);
    }
  }
}
