import React from "react";
import { useProficiencyLevels } from "@/features/employee/skills/hooks/useQueries";
import { Schema } from "@/features/employee/skills/types/schema";
import { d } from "@/utils/dictionary";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { TextField } from "@/features/form/components/controllers/text-field";

const ProficiencyLevels = () => {
  const { control, readOnly } = useFormContext<Schema>();
  const { data: options = [], isLoading } = useProficiencyLevels();

  // Watch stored values from DB
  const values = useWatch({ control, name: "proficiencyLevels" as const });

  if (isLoading || !values) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress size={20} />
        <Typography sx={{ ml: 1 }}>Loading proficiency levels...</Typography>
      </Box>
    );
  }

  // Map schema keys to UI labels
  const fields: Record<keyof Schema['proficiencyLevels'], string> = {
    projectManagement: d.projectManagement,
    communication: d.communication,
    technicalSkills: d.technicalSkills,
    leadership: d.leadership,
    problemSolving: d.problemSolving,
  };

  // Helper to get label for stored value
  const getLabel = (value: string) => {
    const match = options.find((opt) => opt.value === value);
    return match ? match.label : "";
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{d.proficiencyLevels}:</Typography>
      </Grid>

      {Object.entries(fields).map(([key, label]) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <TextField<Schema>
            name={`proficiencyLevels.${key}` as const}
            label={label}
            inputProps={{ readOnly: true }}
            defaultValue={getLabel(values[key as keyof typeof values])}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { ProficiencyLevels };
