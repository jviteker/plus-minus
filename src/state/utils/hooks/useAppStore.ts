import { ApplicationStateStore } from "../../ApplicationStateStore";

export const useAppStore = () => {
  const store = ApplicationStateStore.getInstance();
  return store;
};
