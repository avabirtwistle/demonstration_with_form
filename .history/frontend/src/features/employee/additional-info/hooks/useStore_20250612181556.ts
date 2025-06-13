// src/features/employee/additional-info/hooks/useStore.ts
import { defaultValues, Schema } from "@/features/employee/additional-info/types/schema";
import { createStore } from "@/utils/createStore";

type State = { formData: Schema };

type Actions = { updateFormData: (data: Schema) => void };

type Store = State & Actions;

const useStore = createStore<Store>((set) => ({
  formData: defaultValues,
  updateFormData: (data) => set((state) => { state.formData = data; }),
}), { name: "employee-additional-info-store" });

export { useStore };