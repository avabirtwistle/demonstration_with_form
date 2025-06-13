// src/features/employee/additional-info/types/schema.ts
import { z } from "zod";
import { regex } from "@/utils/regex";

const schema = z.object({
  portfolioLink: z.union([z.string().regex(regex.link), z.literal("")]),
});

type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  portfolioLink: "",
};

export {
  schema,
  schema as employeeAdditionalInfoSchema,
  type Schema,
  defaultValues,
};

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

// src/features/form/hooks/useOnDemandScan.ts
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldPath } from "react-hook-form";

/**
 * Generic QR scan hook: fills scanned code into given field path.
 */
export function useOnDemandScan<FormValues extends Record<string, unknown>>()() {
  const { setValue } = useFormContext<FormValues>();
  const last = useRef<string | null>(null);

  return async function startScan(fieldPath: FieldPath<FormValues>) {
    await fetch("http://localhost:5000/reset_qr", { method: "POST" });
    const es = new EventSource("http://localhost:5000/stream");
    es.onmessage = (e) => {
      const code = e.data;
      if (code && code !== last.current) {
        last.current = code;
        setValue(fieldPath, code);
      }
      es.close();
    };
    es.onerror = () => { es.close(); };
  };
}
