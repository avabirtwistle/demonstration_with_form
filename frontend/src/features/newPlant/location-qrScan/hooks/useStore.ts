import {
  defaultValues,
  Schema,
} from "@/features/newPlant/location-qrScan/types/schema";
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
      set((state) => {
        state.formData = defaultValues;
      }),
  }),
  {
    name: "employee-location-qrScan-store",
  }
);

export { useStore, useStore as useEmployeeAdditionalInfoStore };
