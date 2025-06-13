import { ErrorMessage } from "@/features/form/components/error-message";
import { TextField } from "@/features/form/components/controllers/text-field";
import { Schema } from "@/features/employee/history/types/schema";
import { d } from "@/utils/dictionary";
import { useOnDemandScan } from "@/features/employee/history/utils/useOnDemandScan";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { useEffect } from "react";

const EmployeeHistory = () => {
  const { setValue } = useFormContext<Schema>();
  const startScan = useOnDemandScan();

  useEffect(() => {
    // Start QR scan immediately and store in trayRegistry[0].qrCode
    startScan(0);
  }, [startScan]);

  return (
    <>
      <Grid sx={{ display: "flex", alignItems: "center" }} size={12}>
        <Typography variant="subtitle2">{d.trayRegistry}:</Typography>
      </Grid>

      <Grid size={12}>
        <TextField<Schema>
          name="trayRegistry.0.qrCode"
          label={d.qrCode}
          inputProps={{ readOnly: true }}
          helperText="Auto-filled by QR scan"
        />
      </Grid>

      <Grid size={12}>
        <ErrorMessage<Schema> name="trayRegistry.0.qrCode" />
      </Grid>
    </>
  );
};

export { EmployeeHistory };
