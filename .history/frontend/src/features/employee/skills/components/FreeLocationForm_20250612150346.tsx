import { useEffect } from "react"
import { TextField } from "@/features/form/components/controllers/text-field"
import { useFreeLocations } from "@/features/employee/skills/hooks/useQueries"
import { useFormContext } from "@/features/form/hooks/useFormContext"
import { Schema } from "@/features/employee/skills/types/schema"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

export const FreeLocationForm = () => {
  const { setValue } = useFormContext<Schema>()
  const { data: loc, isLoading } = useFreeLocations()

  const fields: Array<keyof Schema['freeLocations']> = [
    'slot_id',
    'slot_qr_code',
    'slot_number',
    'occupied',
    'level_id',
    'level_qr_id',
    'level_num',
    'rack_id',
    'rack_qr_id',
  ]

  useEffect(() => {
    if (!isLoading && loc) {
      fields.forEach(field => {
        setValue(
          `freeLocations.${field}` as const,
          loc[field]
        )
      })
    }
  }, [isLoading, loc, setValue])

  const labels: Record<keyof Schema['freeLocations'], string> = {
    slot_id:      "Slot ID",
    slot_qr_code: "Slot QR Code",
    slot_number:  "Slot Number",
    occupied:     "Occupied",
    level_id:     "Level ID",
    level_qr_id:  "Level QR ID",
    level_num:    "Level Number",
    rack_id:      "Rack ID",
    rack_qr_id:   "Rack QR ID",
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="subtitle2">Next Free Location:</Typography>
      </Grid>
      {fields.map(field => (
        <Grid xs={4} key={field}>
          <TextField<Schema>
            name={`freeLocations.${field}`}
            label={labels[field]}
            type={typeof loc?.[field] === 'number' ? 'number' : 'text'}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      ))}
    </Grid>
  )
}
