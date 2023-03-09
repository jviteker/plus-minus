import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ApplicationStateStore, AppState } from "../../ApplicationStateStore";

export const useStateSlice = <SliceKey extends keyof AppState>(
  sliceKey: SliceKey,
  debouncedInterval: number = 0
) => {
  const store = ApplicationStateStore.getInstance();

  const [slice, setSlice] = useState(() => {
    const state = store.getState();
    return state[sliceKey];
  });

  const debouncedSetState = useCallback(
    _.debounce((state) => {
      // console.log("'set sice':", "set sice", debouncedInterval);
      setSlice(state[sliceKey]);
    }, debouncedInterval),
    []
  );

  useEffect(() => {
    if (debouncedInterval) {
      return store.onStateUpdated(debouncedSetState);
    } else {
      return store.onStateUpdated((state) => {
        setSlice(state[sliceKey]);
      });
    }
  }, []);

  return slice;
};
