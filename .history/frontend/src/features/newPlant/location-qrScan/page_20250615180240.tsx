import { References } from "@/features/newPlant/location-qrScan/components/references";
import { useEffect } from "react";
import { useFormContext } from "@/features/form/hooks/useFormContext";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useStore } from "@/features/newPlant/location-qrScan/hooks/useStore";
import {
  defaultValues,
  schema,
  Schema,
} from "@/features/newPlant/location-qrScan/types/schema";
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
      setValue("portfolioLink", "LOC-02-02-03-1479B1DF");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [setValue]);

  return (
    <>
      <Grid size={{ xs: 6 }}>
        <TextField<Schema> name="portfolioLink" label={d.portfolioLink} />
      </Grid>
    </>
  );
};

type ProviderProps = {
  readOnly?: boolean;
};

const Provider = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useStore();

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate("/newPlant/review");
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
