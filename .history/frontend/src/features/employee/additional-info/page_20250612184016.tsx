import { useEffect } from "react";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { TextField } from "@/features/form/components/controllers/text-field";
import Grid from "@mui/material/Grid2";
import { d } from "@/utils/dictionary";
import type { Schema } from "@/features/employee/location-qrScan/types/schema";

const Page = () => {
  const { setValue } = useFormContext<Schema>();

  useEffect(() => {
    // Autofill the field with a hardcoded value
    setValue("portfolioLink", "https://fake.qr.link/example", {
      shouldValidate: true,
    });
  }, [setValue]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <TextField<Schema>
          name="portfolioLink"
          label={d.portfolioLink}
          InputProps={{ readOnly: true }}
          helperText="Auto-filled automatically"
        />
      </Grid>
    </Grid>
  );
};
