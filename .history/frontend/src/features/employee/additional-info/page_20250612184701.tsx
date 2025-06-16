import { References } from "@/features/employee/additional-info/components/references";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useStore } from "@/features/employee/additional-info/hooks/useStore";
import {
  defaultValues,
  schema,
  Schema,
} from "@/features/employee/additional-info/types/schema";
import { TextField } from "@/features/form/components/controllers/text-field";
import { Form } from "@/features/form/components/form";
import { d } from "@/utils/dictionary";
import Grid from "@mui/material/Grid2";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const Page = () => {
 const { setValue } = useFormContext<Schema>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue("locationCode", "https://example.com");
    }, 1500); // delay in ms

    return () => clearTimeout(timeout);
  }, [setValue]);

  return (
    <Grid size={{ xs: 6 }}>
      <TextField<Schema> name="locationCode" label={d.locationCode} />
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
    navigate("/employee/review");
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
      title={d.additionalInfo}
    >
      <Page />
    </Form>
  );
};

export { Provider as EmployeeAdditionalInfo };
