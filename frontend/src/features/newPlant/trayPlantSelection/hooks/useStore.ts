import {
  defaultValues,
  Schema,
} from "@/features/newPlant/trayPlantSelection/types/schema";
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
      set((categoryId) => {
        categoryId.formData = data;
      }),
  }),
  {
    name: "plant-info-store",
  }
);

export { useStore, useStore as usePlantInfoStore };
