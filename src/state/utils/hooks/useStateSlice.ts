import { useEffect, useState } from "react";
import { ApplicationStateStore, AppState } from "../../ApplicationStateStore";

export const useStateSlice = <SliceKey extends keyof AppState>(
  sliceKey: SliceKey
) => {
  const store = ApplicationStateStore.getInstance();

  const [slice, setSlice] = useState(() => {
    const state = store.getState();
    return state[sliceKey];
  });

  useEffect(() => {
    return store.onStateUpdated((state) => {
      setSlice(state[sliceKey]);
    });
  }, []);

  return slice;
};
