import { TextField } from "@/features/form/components/controllers/text-field";
import { useProficiencyLevels } from "@/features/employee/skills/hooks/useQueries";
import { Schema } from "@/features/employee/skills/types/schema";
import { d } from "@/utils/dictionary";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { useFormContext } from "@/features/form/hooks/useFormContext";

const ProficiencyLevels = () => {
  const { setValue } = useFormContext<Schema>();
  const { data: proficiencies } = useProficiencyLevels();

  useEffect(() => {
    if (proficiencies) {
      setValue("proficiencyLevels.projectManagement", proficiencies.projectManagement);
      setValue("proficiencyLevels.communication", proficiencies.communication);
      setValue("proficiencyLevels.technicalSkills", proficiencies.technicalSkills);
      setValue("proficiencyLevels.leadership", proficiencies.leadership);
      setValue("proficiencyLevels.problemSolving", proficiencies.problemSolving);
    }
  }, [proficiencies, setValue]);

  return (
    <>
      <Grid sx={{ display: "flex", alignItems: "center" }} size={{ xs: 12 }}>
        <Typography>{d.proficiencyLevels}:</Typography>
      </Grid>

      <Grid size={{ xs: 2.4 }}>
        <TextField<Schema>
          name="proficiencyLevels.projectManagement"
          label={d.projectManagement}
          inputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid size={{ xs: 2.4 }}>
        <TextField<Schema>
          name="proficiencyLevels.communication"
          label={d.communication}
          inputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid size={{ xs: 2.4 }}>
        <TextField<Schema>
          name="proficiencyLevels.technicalSkills"
          label={d.technicalSkills}
          inputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid size={{ xs: 2.4 }}>
        <TextField<Schema>
          name="proficiencyLevels.leadership"
          label={d.leadership}
          inputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid size={{ xs: 2.4 }}>
        <TextField<Schema>
          name="proficiencyLevels.problemSolving"
          label={d.problemSolving}
          inputProps={{ readOnly: true }}
        />
      </Grid>
    </>
  );
};

export { ProficiencyLevels };
