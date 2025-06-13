// src/features/employee/skills/components/ProficiencyLevels.tsx
import { Typography, TextField, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useProficiencyLevels } from "../hooks/useQueries";
import { d } from "@/utils/dictionary";

const FIELDS = [
  "projectManagement",
  "communication",
  "technicalSkills",
  "leadership",
  "problemSolving",
] as const;

export const ProficiencyLevels = () => {
  const { data, isLoading } = useProficiencyLevels();

  return (
    <>
      <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Grid xs={12}>
          <Typography variant="subtitle1">
            {d.proficiencyLevels}
            {isLoading && <CircularProgress size={16} sx={{ ml: 1 }} />}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {FIELDS.map((field) => (
          <Grid xs={2.4} key={field}>
            <TextField
              label={d[field]}
              value={isLoading ? "" : data?.[field] ?? ""}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
