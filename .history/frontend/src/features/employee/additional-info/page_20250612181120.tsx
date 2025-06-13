import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useStore } from "@/features/employee/location-qrScan/hooks/useStore";
import { defaultValues, schema, type Schema } from "@/features/employee/location-qrScan/types/schema";
import { Form } from "@/features/form/components/form";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { TextField } from "@/features/form/components/controllers/text-field";
import { useOnDemandScan } from "@/features/form/hooks/useOnDemandScan";
import { d } from "@/utils/dictionary";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

// Simplified Additional Info page with QR scan into portfolioLink
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
          helperText={readOnly ? undefined : "Scan QR to fill in link"}
        />
      </Grid>
      <Grid xs={2}>
        <IconButton
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
const EmployeeAdditionalInfo = ({ readOnly }: ProviderProps) => {
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

export { EmployeeAdditionalInfo as Provider };
