import {
  defaultValues,
  Schema,
} from "@/features/newPlant/history/types/schema";
import { createStore } from "@/utils/createStore";

type State = {
  formData: Schema;
};

type Actions = {
  updateFormData: (data: State["formData"]) => void;
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
    name: "employee-history-store",
  }
);

export { useStore, useStore as useEmployeeHistoryStore };
