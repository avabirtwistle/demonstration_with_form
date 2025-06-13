import { Form } from "@/features/form/components/form";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ProficiencyLevels } from "@/features/newPlant/locationFind/components/location-fields";
import { schema, defaultValues, type Schema } from "@/features/newPlant/locationFind/types/schema";
import { d } from "@/utils/dictionary";
import { useNavigate } from "react-router";
import { SubmitHandler } from "react-hook-form";
import { useStore } from "@/features/newPlant/locationFind/hooks/useStore";

const Page = () => (
  <ProficiencyLevels />
);

type ProviderProps = {
  readOnly?: boolean;
};

const EmployeeSkills = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useStore();

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate("/newPlant/location-qrScan");
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
