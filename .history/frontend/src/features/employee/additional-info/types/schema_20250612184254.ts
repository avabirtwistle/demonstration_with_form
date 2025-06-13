// src/features/employee/location-qrScan/types/schema.ts
import { z } from "zod";
import { regex } from "@/utils/regex";

const schema = z.object({
  portfolioLink: z.union([z.string().regex(regex.link), z.literal("")]),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  portfolioLink: "LOC-02-02-03",
};

export {
  schema,
  schema as employeeAdditionalInfoSchema,
  type Schema,
  defaultValues,
};