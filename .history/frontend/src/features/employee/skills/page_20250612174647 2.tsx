// src/features/employee/skills/pages/SkillsPage.tsx
import { Form } from "@/features/form/components/form";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ProficiencyLevels } from "@/features/employee/skills/components/location-fields";
import { schema, defaultValues, type Schema } from "@/features/employee/skills/types/schema";
import { d } from "@/utils/dictionary";
import { useNavigate } from "react-router";
import { SubmitHandler } from "react-hook-form";
import { useStore } from "@/features/employee/skills/hooks/useStore";
import { postEmployeeSkills } from "@/features/employee/skills/utils/sendUpdate";


const Page = () => (
  <ProficiencyLevels />
);

type ProviderProps = {
  readOnly?: boolean;
};

const EmployeeSkills = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useStore();

const handleSubmit: SubmitHandler<Schema> = async (data) => {
  try {
    await postEmployeeSkills(data); // send to backend
    updateFormData(data); // store locally if needed
    navigate("/employee/additional-info");
  } catch (error) {
    console.error("Failed to save employee skills", error);
    // Optionally show a toast or error UI here
  }
};

  return (
    <Form<Schema>
      title={d.location}
      schema={schema}
      defaultValues={defaultValues}
      values={formData}
      onSubmit={handleSubmit}
      submitButtonText={d.saveAndContinue}
      slotProps={{
        submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> },
      }}
      readOnly={readOnly}
    >
      <Page />
    </Form>
  );
};

export { EmployeeSkills };
