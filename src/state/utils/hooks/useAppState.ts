import { useEffect, useState } from "react";
import { ApplicationState } from "../../ApplicationState";

export const useAppState = () => {
  const store = ApplicationState.getInstance();

  const [slice, setSlice] = useState(() => {
    const state = store.getState();
    return state;
  });

  useEffect(() => {
    return store.onStateUpdated((state) => {
      setSlice(state);
    });
  }, []);

  return [slice, store] as const;
};
