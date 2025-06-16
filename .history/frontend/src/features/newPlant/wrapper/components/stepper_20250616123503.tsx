//import the qr location scan use store and schema
import { useEmployeeAdditionalInfoStore } from "@/features/newPlant/location-qrScan/hooks/useStore";
//schema used to validate the data from the location scan step
import { locationQR } from "@/features/newPlant/location-qrScan/types/schema";


import { useEmployeeHistoryStore } from "@/features/newPlant/trayContents/hooks/useStore";
import { employeeHistorySchema } from "@/features/newPlant/trayContents/types/schema";

import { usePlantInfoStore } from "@/features/newPlant/personal-info/hooks/useStore";
import { plantInfoSchema } from "@/features/newPlant/personal-info/types/schema";

import { useEmployeeReviewStore } from "@/features/newPlant/review/hooks/useStore";
import { employeeReviewSchema } from "@/features/newPlant/review/types/schema";

import { useEmployeeSkillsStore } from "@/features/newPlant/locationFind/hooks/useStore";
import { employeeSkillsSchema } from "@/features/newPlant/locationFind/types/schema";

//import the dictionary to get labeling
import { d } from "@/utils/dictionary";

//MUI components for the stepper navigation
import {
  Stepper as MuiStepper,
  Step,
  StepButton,
  Typography,
} from "@mui/material";

//react router hook to get the current URL path
import { useLocation } from "react-router";

//stepper ui component reflecting the form steps for the tray
//registry and their progress and validation

const Stepper = () => {
  //get the path of our current step
  const { pathname } = useLocation();


  //start reading shared data from centralized zustland stores
  //step 1
  const { formData: PlantInfoFormData } =
    usePlantInfoStore();
  
  //step 2
  const { formData: employeeHistoryFormData } = useEmployeeHistoryStore();
  
  //step 3
  const { formData: employeeSkillsFormData } = useEmployeeSkillsStore();
  
  //step 4
  const { formData: employeeAdditionalInfoFormData } =
    useEmployeeAdditionalInfoStore();
 
    // Access review form data (step 5), also get `isSubmitted` status to control error display
    const {
    formData: employeeReviewFormData,
    isSubmitted: isEmployeeReviewSubmitted,
  } = useEmployeeReviewStore();



  /***********Validate Each Step Form Data Using Zod Schema************* */
  //plantInfoSuccess is the renamed local variable for success which can either be
  //true or false
  const { success: plantInfoSuccess } =
    plantInfoSchema.safeParse(PlantInfoFormData); //validate PlantInfoFormData against
                                                  // against the plantInfoSchema

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


  //declare a steps array which is a list of objects
  //each step describes one step in the multi-step form wizard
  //drives the UI for the stepper component
  const steps = [
    {
      href: "/newPlant/personal-info", //router to navigate to that step
      label: d.plantInfo, //lable retrieved from the dictionary
      success: plantInfoSuccess,  // result of Zod validation for that step's form
    },
    {
      href: "/newPlant/trayContents",
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

  //declare a constant named active step 
  //call findIndex on our step array
  //(item) => item.href === pathname function returns true only if the href field in item is equal to the current pathname
  const activeStep = steps.findIndex((item) => item.href === pathname);

  //render the stepper component
  return (
    <MuiStepper nonLinear activeStep={activeStep}>   
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
