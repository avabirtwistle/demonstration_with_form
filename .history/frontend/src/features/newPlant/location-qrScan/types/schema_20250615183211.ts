import { z } from "zod";
import { regex } from "@/utils/regex";

//define the location schema representing a qr code
const locationSchema = z.object({
  qrCode: z.string().min(1)
});

//infer the typescript type from the schema
type Schema = z.infer<typeof schema>;

//provide default values matching that type
const defaultValues: Schema = {
  qrCode: "",
};

//export
export {
  locationSchema as schema,
  locationSchema as locationQR,
  type Schema,
  defaultValues,
};


