import { z } from "zod";

const schema = z.object({
  datePlanted: z.coerce.date(), // No max() — allows future dates
  categoryId: z.string().min(1, "Category is required"),
  variety: z.string().min(1, "Variety is required"),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  variety: "",
  datePlanted: new Date(), // Default to today
  categoryId: "",
};

export {
  schema,
  schema as plantInfoSchema,
  type Schema,
  defaultValues,
};
