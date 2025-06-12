// ProficiencyLevels.tsx
import { useEffect } from "react"
import { TextField } from "@/features/form/components/controllers/text-field"
import { useProficiencyLevelValues } from "@/features/employee/skills/hooks/useQueries"
import { useFormContext } from "@/features/form/hooks/useFormContext"
import { Schema } from "@/features/employee/skills/types/schema"
import { d } from "@/utils/dictionary"
import { Typography, Grid } from "@mui/material"

export const ProficiencyLevels = () => {
  const { setValue } = useFormContext<Schema>()
  const { data: levels, isLoading } = useProficiencyLevelValues()

  // Define fields to match schema keys and labels
  const fields: Array<keyof Schema['proficiencyLevels']> = [
    'projectManagement',
    'communication',
    'technicalSkills',
    'leadership',
    'problemSolving',
  ]

  // Autofill form fields when saved values arrive
  useEffect(() => {
    if (!isLoading && levels) {
      fields.forEach(field => {
        setValue(
          `proficiencyLevels.${field}` as const,
          levels[field]
        )
      })
    }
  }, [isLoading, levels, setValue])

  // Map each field key to its display label
  const labels: Record<keyof Schema['proficiencyLevels'], string> = {
    projectManagement: d.projectManagement,
    communication:      d.communication,
    technicalSkills:    d.technicalSkills,
    leadership:         d.leadership,
    problemSolving:     d.problemSolving,
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">{d.proficiencyLevels}:</Typography>
      </Grid>
      {fields.map(field => (
        <Grid item xs={2.4} key={field}>
          <TextField<Schema>
            name={`proficiencyLevels.${field}`}
            label={labels[field]}
            type="text"
            InputProps={{ readOnly: isLoading }}
          />
        </Grid>
      ))}
    </Grid>
  )
}