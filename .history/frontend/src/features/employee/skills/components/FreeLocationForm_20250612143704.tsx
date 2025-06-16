import { useEffect } from "react"
import { TextField } from "@/features/form/components/controllers/text-field"
import { useFreeLocations } from "@/features/employee/skills/hooks/useQueries"
import { useFormContext } from "@/features/form/hooks/useFormContext"
import { Schema } from "@/features/employee/skills/types/schema"
import { Typography, Grid } from "@mui/material"

export const FreeLocationForm = () => {
  const { setValue } = useFormContext<Schema>()
  const { data: loc, isLoading } = useFreeLocations()

  // Define fields to match schema keys and labels
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

  // Autofill form fields when saved values arrive
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

  // Map each field key to its display label
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
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Next Free Location:</Typography>
      </Grid>
      {fields.map(field => (
        <Grid item xs={4} key={field}>
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
