// src/features/employee/skills/components/ProficiencyLevels.tsx
import { useEffect } from "react";
import { Typography, TextField, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { useProficiencyLevels } from "../hooks/useQueries";
import { d } from "@/utils/dictionary";
import type { Schema } from "@/features/employee/skills/types/schema";

// these must exactly match your schema keys
const FIELDS: Array<keyof Schema["proficiencyLevels"]> = [
  "projectManagement",
  "communication",
  "technicalSkills",
  "leadership",
  "problemSolving",
];

export const ProficiencyLevels = () => {
  const { data, isLoading, isError } = useProficiencyLevels();
  const { setValue, watch } = useFormContext<Schema>();

  // as soon as the query returns, dump the entire object into your form
  useEffect(() => {
    if (data) {
      setValue("proficiencyLevels", data);
    }
  }, [data, setValue]);

  // now read from form state (initially all "", then replaced by `data`)
  const levels = watch("proficiencyLevels");

  return (
    <>
      <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Grid xs={12}>
          <Typography variant="subtitle1">
            {d.locationInfo}{" "}
            {isLoading && <CircularProgress size={14} />}
            {isError && "  (Failed to load)"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {FIELDS.map((field) => (
          <Grid xs={2.4} key={field}>
            <TextField
              label={d[field]}
              value={
                isError
                  ? "Error"
                  : isLoading
                  ? ""
                  : levels[field] || ""
              }
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
