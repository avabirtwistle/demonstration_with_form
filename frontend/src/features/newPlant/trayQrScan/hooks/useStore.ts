import {
  defaultValues,
  Schema,
} from "@/features/newPlant/trayQrScan/types/schema";
import { createStore } from "@/utils/createStore";

type State = {
  formData: Schema;
};

type Actions = {
  updateFormData: (data: State["formData"]) => void;
  reset: () => void;
};

type Store = State & Actions;

const useStore = createStore<Store>(
  (set) => ({
    formData: defaultValues,
    updateFormData: (data) =>
      set((state) => {
        state.formData = data;
      }),
    reset: () =>
      set(() => ({
        formData: defaultValues,
      })),
  }),
  {
    name: "employee-trayQrScan-store",
  }
);

export { useStore, useStore as useEmployeeHistoryStore };
