import { z } from "zod"

// Schema for free location auto-population form
const schema = z.object({
  freeLocations: z.object({
    slot_id:      z.number(),
    slot_qr_code: z.string().min(1),
    slot_number:  z.number(),
    occupied:     z.number(),
    level_id:     z.number(),
    level_qr_id:  z.string().min(1),
    level_num:    z.number(),
    rack_id:      z.number(),
    rack_qr_id:   z.string().min(1),
  })
})

type Schema = z.infer<typeof schema>

const defaultValues: Schema = {
  freeLocations: {
    slot_id:      0,
    slot_qr_code: "",
    slot_number:  0,
    occupied:     0,
    level_id:     0,
    level_qr_id:  "",
    level_num:    0,
    rack_id:      0,
    rack_qr_id:   "",
  }
}

export {
  defaultValues,
  schema as employeeSkillsSchema,
  type Schema,
}
