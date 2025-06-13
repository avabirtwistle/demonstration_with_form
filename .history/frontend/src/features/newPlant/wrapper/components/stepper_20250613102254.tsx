import { useEmployeeAdditionalInfoStore } from "@/features/newPlant/additional-info/hooks/useStore";
import { employeeAdditionalInfoSchema } from "@/features/newPlant/additional-info/types/schema";
import { useEmployeeHistoryStore } from "@/features/newPlant/history/hooks/useStore";
import { employeeHistorySchema } from "@/features/newPlant/history/types/schema";
import { usePlantInfoStore } from "@/features/newPlant/personal-info/hooks/useStore";
import { plantInfoSchema } from "@/features/newPlant/personal-info/types/schema";
import { useEmployeeReviewStore } from "@/features/newPlant/review/hooks/useStore";
import { employeeReviewSchema } from "@/features/newPlant/review/types/schema";
import { useEmployeeSkillsStore } from "@/features/newPlant/skills/hooks/useStore";
import { employeeSkillsSchema } from "@/features/newPlant/skills/types/schema";
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
    employeeAdditionalInfoSchema.safeParse(employeeAdditionalInfoFormData);

  const { success: employeeReviewSuccess } = employeeReviewSchema.safeParse(
    employeeReviewFormData
  );

  const steps = [
    {
      href: "/newPlant/personal-info",
      label: d.plantInfo,
      success: plantInfoSuccess,
    },
    {
      href: "/newPlant/history",
      label: d.scanQR,
      success: employeeHistorySuccess,
    },
    {
      href: "/newPlant/skills",
      label: d.generateLocation,
      success: employeeSkillsSuccess,
    },
    {
      href: "/newPlant/additional-info",
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
    <MuiStepper nonLinear activeStep={activeStep}>
      {steps.map((step) => (
        <Step key={step.href}>
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
