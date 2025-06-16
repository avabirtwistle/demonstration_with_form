// src/features/employee/location-qrScan/types/schema.ts
import { z } from "zod";
import { regex } from "@/utils/regex";

const schema = z.object({
  portfolioLink: z.string().min(1)
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  portfolioLink: "",
};

export {
  schema,
  schema as locationQR,
  type Schema,
  defaultValues,
};