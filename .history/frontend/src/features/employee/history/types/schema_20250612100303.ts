import { calculatePastDate } from "@/utils/calculatePastDate";
import { z } from "zod";

const trayRegistrySchema = z.object({
  qrCode: z.string().min(1),
});

const schema = z
  .object({
    trayRegistry: z.array(trayRegistrySchema).min(1),
  })

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  trayRegistry: [],
};

export {
  defaultValues,
  schema,
  schema as employeeHistorySchema,
  type Schema,
};
