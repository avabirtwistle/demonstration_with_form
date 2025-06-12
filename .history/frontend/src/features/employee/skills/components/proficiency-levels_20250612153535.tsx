import React from "react";
import { useProficiencyLevels } from "@/features/employee/skills/hooks/useQueries";
import { Schema } from "@/features/employee/skills/types/schema";
import { d } from "@/utils/dictionary";
import {
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const ProficiencyLevels = () => {
  const { control } = useFormContext<Schema>();
  const { data: options = [], isLoading } = useProficiencyLevels();

  if (isLoading) {
    return <Typography>Loading proficiency levels...</Typography>;
  }

  // Map schema keys to UI labels
  const fields: Record<keyof Schema['proficiencyLevels'], string> = {
    projectManagement: d.projectManagement,
    communication: d.communication,
    technicalSkills: d.technicalSkills,
    leadership: d.leadership,
    problemSolving: d.problemSolving,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{d.proficiencyLevels}:</Typography>
      </Grid>

      {Object.entries(fields).map(([key, label]) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
              name={`proficiencyLevels.${key}` as const}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  {options.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
};

export { ProficiencyLevels };
