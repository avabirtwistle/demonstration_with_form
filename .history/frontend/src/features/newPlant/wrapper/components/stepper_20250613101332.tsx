import { useEmployeeAdditionalInfoStore } from "@/features/employee/location-qrScan/hooks/useStore";
import { employeeAdditionalInfoSchema } from "@/features/employee/location-qrScan/types/schema";
import { useEmployeeHistoryStore } from "@/features/employee/history/hooks/useStore";
import { employeeHistorySchema } from "@/features/employee/history/types/schema";
import { usePlantInfoStore } from "@/features/employee/personal-info/hooks/useStore";
import { plantInfoSchema } from "@/features/employee/personal-info/types/schema";
import { useEmployeeReviewStore } from "@/features/employee/review/hooks/useStore";
import { employeeReviewSchema } from "@/features/employee/review/types/schema";
import { useEmployeeSkillsStore } from "@/features/employee/skills/hooks/useStore";
import { employeeSkillsSchema } from "@/features/employee/skills/types/schema";
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
      href: "/employee/personal-info",
      label: d.plantInfo,
      success: plantInfoSuccess,
    },
    {
      href: "/employee/history",
      label: d.scanQR,
      success: employeeHistorySuccess,
    },
    {
      href: "/employee/skills",
      label: d.generateLocation,
      success: employeeSkillsSuccess,
    },
    {
      href: "/employee/location-qrScan",
      label: d.additionalInfo,
      success: employeeAdditionalInfoSuccess,
    },
    {
      href: "/employee/review",
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
