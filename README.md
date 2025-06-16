
# Tray Registry Interface
## Introduction
The TrayRegistry interface defines the structure of each tray object registered during the plant setup process. It includes fields such as qrCode, slotLocation, and rackId, representing the tray’s identity and physical placement within the system. The tray registry is maintained using centralized Zustand state, and all entries are validated using Zod before submission to ensure structural correctness and data integrity.

## QR Code
QR codes are scanned using a mobile device and sent to a Flask backend, where the code type is resolved. The system evaluates available slots against tray contents and requirements. Once an appropriate location is determined, the result is streamed to the frontend via Server-Sent Events (SSE).
When the system expects the tray to be placed, the ESP32 triggers a visual indicator by illuminating the LED at the target slot index located on the front of the reservoir. The indicator turns off automatically when the user scans the correct location. This mechanism improves compliance during planting and transferring by providing real-time visual confirmation and reducing user error.



## Stepper
### Purpose
The stepper is used in the TrayRegistry interface to allow the user to see their progression as well as the remaining steps for registering their tray. It is linear which enforces the user to complete the steps in order and avoid skipping. 

```tsx
return (
  <MuiStepper activeStep={activeStep}>
    {/* Loop through all steps to render one <Step> per route */}
    {steps.map((step) => (
      <Step key={step.href}>
        {/* Each Step contains a clickable StepButton */}
        <StepButton
          color="inherit"
          href={step.href} // clicking this navigates to the step's route
          optional={
            // Show error caption only if step is invalid and the form was submitted
            !step.success &&
            isEmployeeReviewSubmitted && (
              <Typography variant="caption" color="error">
                {d.invalidFormData}
              </Typography>
            )
          }
        >
          {/* Label text for the step (e.g. "Review", "Scan QR", etc.) */}
          {step.label}
        </StepButton>
      </Step>
    ))}
  </MuiStepper>
);
