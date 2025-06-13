import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useStore } from "@/features/employee/additional-info/hooks/useStore";
import { defaultValues, schema, type Schema } from "@/features/employee/additional-info/types/schema";
import { Form } from "@/features/form/components/form";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { TextField } from "@/features/form/components/controllers/text-field";
import { useOnDemandScan } from "@/features/employee/additional-info/hooks/useOnDemandScan";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { d } from "@/utils/dictionary";

const Page = () => {
  const { setValue, watch, readOnly } = useFormContext<Schema>();
  const startScan = useOnDemandScan<Schema>();
  const value = watch("portfolioLink");

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid xs={10}>
        <TextField<Schema>
          name="portfolioLink"
          label={d.portfolioLink}
          InputProps={{ readOnly: true }}
          helperText={readOnly ? undefined : "Auto-filled by QR scan"}
        />
      </Grid>
      <Grid xs={2}>
        <IconButton
          aria-label="scan qr"
          disabled={readOnly}
          onClick={() => startScan("portfolioLink")}
          size="large"
        >
          <QrCodeScannerIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

type ProviderProps = { readOnly?: boolean };
export const EmployeeAdditionalInfo = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useStore();

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate("/employee/review");
  };

  return (
    <Form<Schema>
      title={d.additionalInfo}
      schema={schema}
      defaultValues={defaultValues}
      values={formData}
      onSubmit={handleSubmit}
      submitButtonText={d.saveAndContinue}
      slotProps={{ submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> } }}
      readOnly={readOnly}
    >
      <Page />
    </Form>
  );
};
