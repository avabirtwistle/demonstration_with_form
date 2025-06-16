// This is a customized autocomplete component that's tightly integrated with react-hook-form.
// It handles rendering a dropdown input with search/filtering support, and connects it to form state.
import { Autocomplete } from "@/features/form/components/controllers/autocomplete";

// This is just a Material UI icon that gets shown on the submit button, pointing the user forward.
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

// This is the main wrapper for the form.
// It sets up schema-based validation (likely using Zod or Yup), handles submission, and provides layout.
import { Form } from "@/features/form/components/form";

// This is a modular section for entering prior employment trayContents, likely a repeatable component.
import { EmployeeHistory } from "@/features/newPlant/trayContents/components/tray-contents";

// This hook accesses shared state that lives outside of just this form — probably a global state store.
// It lets you load the current form data and update it across steps.
import { useStore } from "@/features/newPlant/trayContents/hooks/useStore";

// These are all type-related and validation definitions:
// - `Schema`: TypeScript type for the whole form data structure
// - `schema`: The validation schema (probably a Zod or Yup object)
// - `defaultValues`: Default values used to pre-fill the form
// - `ReasonForLeavingEnum`: Enum for constants like "Other", "Fired", etc.
import {
  defaultValues,
  schema,
  Schema,
} from "@/features/newPlant/trayContents/types/schema";

// This is a dictionary object used to keep display strings (like labels) consistent and possibly support i18n.
import { d } from "@/utils/dictionary";

// Material UI's Grid2 is a layout tool that divides the screen into 12 columns.
// You wrap elements in <Grid> with a `size` prop to control how wide it should be.
import Grid from "@mui/material/Grid2";

// From react-hook-form:
// - `SubmitHandler` is a TypeScript utility for form submit functions
// - `useWatch` allows you to "watch" a specific field's value and react to it in real time
import { SubmitHandler, useWatch } from "react-hook-form";

// This hook from react-router lets you redirect the user to another page (e.g., after form submission)
import { useNavigate } from "react-router";

// This custom hook gives access to the form context set by <Form />, including `control` and errors.
import { useFormContext } from "@/features/form/hooks/useFormContext";


// This component defines the actual fields shown inside the form UI.
// It does NOT handle submission or validation — it simply renders form inputs in a layout.
const Page = () => {
  // Destructure the `control` object from the form context.
  // This is necessary to bind form inputs to react-hook-form.
  const { control } = useFormContext<Schema>();

  return (
    <>

      {/* 
        These are subcomponents that render sections for:
        - Previous employers (with fields like "Company", "Role", etc.)
        - Education trayContents (with fields like "School", "Degree", etc.)
        Each is self-contained and uses form state behind the scenes.
      */}
      <EmployeeHistory />
    </>
  );
};

// Type for optional props passed into the Provider.
// The only one here is `readOnly`, which disables all inputs if true.
type ProviderProps = {
  readOnly?: boolean;
};

// This is the main component that wraps the form.
// It handles:
// - Loading the form data
// - Setting up schema-based validation
// - Handling form submission
// - Rendering the <Page /> inside the <Form />
const Provider = ({ readOnly }: ProviderProps) => {
  // Router hook that lets us redirect the user after they submit the form
  const navigate = useNavigate();

  // Shared store hook: gives access to the current form data and lets us save updates
  const { formData, updateFormData } = useStore();

  // Submit handler for the form.
  // When the user submits, we:
  // 1. Update the shared form data
  // 2. Navigate to the next step/page in the flow
  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate("/newPlant/locationFind");
  };

  return (
    // This is the main form wrapper.
    // It receives the schema, default values, current form values, and submit logic.
    // It also renders a submit button, which uses an icon and custom text.
    <Form
      submitButtonText={d.saveAndContinue}
      slotProps={{
        submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> },
      }}
      schema={schema}
      values={formData}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      readOnly={readOnly}
      title={d.addTray}
    >
      {/* Render the actual form fields defined in the Page component above */}
      <Page />
    </Form>
  );
};

// This is the component being exported.
// It’s renamed to TrayQR, which is likely a naming convention based on routing or file structure.
export { Provider as TrayQR };
