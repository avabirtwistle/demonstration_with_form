import { defaultValues, Schema } from "@/features/newPlant/locationFind/types/schema";
import { createStore } from "@/utils/createStore";

type State = {
  formData: Schema;
};

type Actions = {
  updateFormData: (data: State["formData"]) => void;
};

type Store = State & Actions;

const useStore = createStore<Store & { reset: () => void }>(
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
    name: "employee-skills-store",
  }
);

export { useStore, useStore as useEmployeeSkillsStore };
