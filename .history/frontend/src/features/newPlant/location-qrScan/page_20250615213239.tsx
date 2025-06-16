import { useEffect } from "react";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import Grid from "@mui/material/Grid2";
import { TextField } from "@/features/form/components/controllers/text-field";
import { useQRScanner } from "@/features/newPlant/location-qrScan/hooks/useQRScanner";
import type { Schema } from "@/features/newPlant/location-qrScan/types/schema";

const Page = () => {
  // pulls in setValue under the hood, but you don't need it directly here
  const { startScan } = useQRScanner();

  // trigger a scan when the component mounts
  useEffect(() => {
    startScan();
  }, [startScan]);

  return (
    <Grid xs={6}>
      <TextField<Schema> name="locationCode" label="Location Code" />
    </Grid>
  );
};

export default Page;
