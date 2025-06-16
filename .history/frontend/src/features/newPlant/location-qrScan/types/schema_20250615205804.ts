// src/features/employee/location-qrScan/types/schema.ts
import { z } from "zod";
import { regex } from "@/utils/regex";

const schema = z.object({
  locationCode: z.string().min(1)
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  locationCode: "",
};

export {
  schema,
  schema as locationQR,
  type Schema,
  defaultValues,
};