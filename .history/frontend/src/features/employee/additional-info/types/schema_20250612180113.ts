import { z } from "zod";
import validator from "validator";
import { regex } from "@/utils/regex";
import { startOfToday } from "date-fns";

const schema = z.object({
  portfolioLink: z.union([z.string().regex(regex.link), z.literal("")]),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  portfolioLink: "",
};

export {
  schema,
  schema as employeeAdditionalInfoSchema,
  type Schema,
  defaultValues,
};
