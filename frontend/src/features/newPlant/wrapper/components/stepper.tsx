import { useEmployeeAdditionalInfoStore } from "@/features/newPlant/location-qrScan/hooks/useStore";
import { locationQR } from "@/features/newPlant/location-qrScan/types/schema";
import { useEmployeeHistoryStore } from "@/features/newPlant/trayQrScan/hooks/useStore";
import { employeeHistorySchema } from "@/features/newPlant/trayQrScan/types/schema";
import { usePlantInfoStore } from "@/features/newPlant/trayPlantSelection/hooks/useStore";
import { plantInfoSchema } from "@/features/newPlant/trayPlantSelection/types/schema";
import { useEmployeeReviewStore } from "@/features/newPlant/review/hooks/useStore";
import { employeeReviewSchema } from "@/features/newPlant/review/types/schema";
import { useEmployeeSkillsStore } from "@/features/newPlant/locationFind/hooks/useStore";
import { employeeSkillsSchema } from "@/features/newPlant/locationFind/types/schema";
import { d } from "@/utils/dictionary";
import {
  Stepper as MuiStepper,
  Step,
  StepButton,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router";

const Stepper = () => {
  const { pathname } = useLocation();

  const { formData: PlantInfoFormData } =
    usePlantInfoStore();
  const { formData: employeeHistoryFormData } = useEmployeeHistoryStore();
  const { formData: employeeSkillsFormData } = useEmployeeSkillsStore();
  const { formData: employeeAdditionalInfoFormData } =
    useEmployeeAdditionalInfoStore();
  const {
    formData: employeeReviewFormData,
    isSubmitted: isEmployeeReviewSubmitted,
  } = useEmployeeReviewStore();

  const { success: plantInfoSuccess } =
    plantInfoSchema.safeParse(PlantInfoFormData);

  const { success: employeeHistorySuccess } = employeeHistorySchema.safeParse(
    employeeHistoryFormData
  );

  const { success: employeeSkillsSuccess } = employeeSkillsSchema.safeParse(
    employeeSkillsFormData
  );

  const { success: employeeAdditionalInfoSuccess } =
    locationQR.safeParse(employeeAdditionalInfoFormData);

  const { success: employeeReviewSuccess } = employeeReviewSchema.safeParse(
    employeeReviewFormData
  );


  const steps = [
    {
      href: "/newPlant/trayPlantSelection",
      label: d.plantInfo,
      success: plantInfoSuccess,
    },
    {
      href: "/newPlant/trayQrScan",
      label: d.scanQR,
      success: employeeHistorySuccess,
    },
    {
      href: "/newPlant/locationFind",
      label: d.generateLocation,
      success: employeeSkillsSuccess,
    },
    {
      href: "/newPlant/location-qrScan",
      label: d.additionalInfo,
      success: employeeAdditionalInfoSuccess,
    },
    {
      href: "/newPlant/review",
      label: d.review,
      success: employeeReviewSuccess,
    },
  ];

  const activeStep = steps.findIndex((item) => item.href === pathname);

  return (
    //return a multistepper that is linear so we cant skip steps
    <MuiStepper activeStep={activeStep}>  
     {/* Loop through all steps to render one <Step> per route */}
      {steps.map((step) => (
        <Step key={step.href}>
          {/* Each Step contains a clickable StepButton */}
          <StepButton
            color="inherit"
            href={step.href}
            optional={
              !step.success &&
              isEmployeeReviewSubmitted && (
                <Typography variant="caption" color="error">
                  {d.invalidFormData}
                </Typography>
              )
            }
          >
            {step.label}
          </StepButton>
        </Step>
      ))}
    </MuiStepper>
  );
};

export { Stepper };
