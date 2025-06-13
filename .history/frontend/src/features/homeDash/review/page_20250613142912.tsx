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
  return (
    <>
    <Grid size={{ xs: 12 }}>
        
    </Grid>
    </>
  );
};

export { Page as HomeDash };
