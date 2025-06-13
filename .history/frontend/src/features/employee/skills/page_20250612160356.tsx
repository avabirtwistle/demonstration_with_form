import { Form } from "@/features/form/components/form";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ProficiencyLevels } from "@/features/employee/skills/components/location-fields";
import { useStore } from "@/features/employee/skills/hooks/useStore";
import { defaultValues, schema, Schema } from "@/features/employee/skills/types/schema";
import { d } from "@/utils/dictionary";
import Grid from "@mui/material/Grid2";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const Page = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <ProficiencyLevels />
    </Grid>
  </Grid>
);

type ProviderProps = {
  readOnly?: boolean;
};

const Provider = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useStore();

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate("/employee/location-qrScan");
  };

  return (
    <Form
      submitButtonText={d.saveAndContinue}
      slotProps={{
        submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> },
      }}
      schema={schema}
      values={formData}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      readOnly={readOnly}
      title={d.skills}
    >
      <Page />
    </Form>
  );
};

export { Provider as EmployeeSkills };
