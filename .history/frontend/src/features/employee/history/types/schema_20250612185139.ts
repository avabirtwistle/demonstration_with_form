import { z } from "zod";

// Define the individual tray registry item schema
const trayRegistrySchema = z.object({
  qrCode: z.string().min(1),
});

// Define the full form schema
const schema = z.object({
  trayRegistry: z.array(trayRegistrySchema).min(1),
});

// Infer TypeScript type from schema
type Schema = z.infer<typeof schema>;

// Default form values
const defaultValues: Schema = {
  trayRegistry: [],
};

// Export consistently
export {
  schema,
  schema as employeeHistorySchema,
  defaultValues,
  type Schema,
};
