import { z } from "zod";
import { regex } from "@/utils/regex";

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
