import { Form } from "@/features/form/components/form";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { DatePicker } from "@/features/form/components/controllers/date-picker";
import { Autocomplete, AutocompleteOption } from "@/features/form/components/controllers/autocomplete";
import { useCategory, useVariety } from "@/features/newPlant/personal-info/hooks/useQueries";
import { useStore } from "@/features/newPlant/personal-info/hooks/useStore";
import { defaultValues, schema, Schema } from "@/features/newPlant/personal-info/types/schema";
import { d } from "@/utils/dictionary";
import Grid from "@mui/material/Grid2";
import { SubmitHandler, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { useFormContext } from "@/features/form/hooks/useFormContext";

const Page = () => {
  const categoryIdQuery = useCategory();
  const varietyQuery = useVariety();
  const { control, setValue } = useFormContext<Schema>();
  const categoryId = useWatch({ control, name: "categoryId" });

  const handleOptionSelect = (option: AutocompleteOption | null) => {
    if (!option) {
      setValue("variety", "");
    }
  };

  return (
    <>
      <Grid size={{ xs: 4 }}>
        <DatePicker<Schema>
          name="datePlanted"
          label={d.datePlanted}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <Autocomplete<Schema>
          name="categoryId"
          options={categoryIdQuery.data}
          loading={categoryIdQuery.isLoading}
          textFieldProps={{ label: d.categoryId }}
          onOptionSelect={handleOptionSelect}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        {!!categoryId && (
          <Autocomplete<Schema>
            name="variety"
            options={varietyQuery.data}
            loading={varietyQuery.isLoading}
            textFieldProps={{ label: d.variety }}
          />
        )}
      </Grid>
    </>
  );
};

type ProviderProps = { readOnly?: boolean };

const Provider = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useStore();

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data);
    navigate("/newPlant/history");
  };

  return (
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
      title={d.plantInfo}
    >
      <Page />
    </Form>
  );
};

export { Provider as PlantInfo };
