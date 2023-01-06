import _ from "lodash";
import { KeysOf } from "../../model/utils/UtilityTypes";

type AnyVoidFunction = (...args: any[]) => void;

export class PropsUtils {
  static omitUndefined<FullPropsType extends object>(
    props: FullPropsType
  ): Partial<FullPropsType> {
    const sanitized: Partial<FullPropsType> = {};

    for (const key in props) {
      const value = props[key];
      if (value !== undefined) {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  static pick<FullPropsType extends object>(
    fullProps: FullPropsType,
    keysToPick: KeysOf<FullPropsType>
  ) {
    const picked: Partial<FullPropsType> = {};

    for (const key of keysToPick) {
      picked[key] = fullProps[key];
    }

    return picked;
  }

  static reject<FullPropsType extends object>(
    fullProps: FullPropsType,
    keysToReject: KeysOf<FullPropsType>
  ) {
    const picked: Partial<FullPropsType> = {};
    const toRejectMap: Record<string, boolean> = {};
    for (const key of keysToReject) {
      toRejectMap[key as string] = true;
    }

    for (const key in fullProps) {
      if (!toRejectMap[key]) {
        picked[key] = fullProps[key];
      }
    }

    return picked;
  }

  static pickNoUndefined<FullPropsType extends object>(
    fullProps: FullPropsType,
    keysToPick: KeysOf<FullPropsType> | string[]
  ) {
    return this.omitUndefined(
      this.pick(fullProps, keysToPick as KeysOf<FullPropsType>)
    );
  }

  static rejectNoUndefined<FullPropsType extends object>(
    fullProps: FullPropsType,
    keysToReject: KeysOf<FullPropsType> | string[]
  ) {
    return this.omitUndefined(
      this.reject(fullProps, keysToReject as KeysOf<FullPropsType>)
    );
  }

  static arrayDiff<T>(arr1: T[], minus: T[]): T[] {
    return _.difference(arr1, minus);
  }

  static sequence(...fs: (AnyVoidFunction | undefined)[]) {
    return (...args: any[]) => {
      for (const fn of fs) {
        fn && typeof fn === "function" && fn(...args);
      }
    };
  }

  static eval<T>(funcOrValue: T | (() => T) | undefined): T | undefined {
    if (typeof funcOrValue === "function") {
      return (funcOrValue as () => T)();
    }

    return funcOrValue;
  }
}
