import { useEffect } from "react";
import { Typography, TextField, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { useProficiencyLevels } from "@/features/employee/skills/hooks/useQueries";
import { Schema } from "@/features/employee/skills/types/schema";
import { d } from "@/utils/dictionary";

const ProficiencyLevels = () => {
  const proficiencyLevelsQuery = useProficiencyLevels();
  const { setValue, watch } = useFormContext<Schema>();

  // When data arrives, write it into the form
  useEffect(() => {
    if (proficiencyLevelsQuery.data) {
      Object.entries(proficiencyLevelsQuery.data).forEach(
        ([key, val]) => {
          // assume keys match your schema: projectManagement, communication, etc.
          setValue(`proficiencyLevels.${key}` as any, val);
        }
      );
    }
  }, [proficiencyLevelsQuery.data, setValue]);

  // Read current form values back out for display
  const levels = watch("proficiencyLevels");

  // list of the fields we need, in order
  const fields: Array<keyof Schema["proficiencyLevels"]> = [
    "projectManagement",
    "communication",
    "technicalSkills",
    "leadership",
    "problemSolving",
  ];

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Grid xs={12}>
          <Typography variant="subtitle1">
            {d.proficiencyLevels}
            {proficiencyLevelsQuery.isLoading && (
              <CircularProgress size={16} sx={{ ml: 1 }} />
            )}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {fields.map((fieldKey) => (
          <Grid xs={2.4} key={fieldKey}>
            <TextField
              label={d[fieldKey]}
              value={
                proficiencyLevelsQuery.isLoading
                  ? ""
                  : levels?.[fieldKey] ?? ""
              }
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export { ProficiencyLevels };
