import { Form } from "@/features/form/components/form"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
import { useNavigate } from "react-router"
import { useStore } from "@/features/employee/skills/hooks/useStore"
import { defaultValues, schema, Schema } from "@/features/employee/skills/types/schema"
import { FreeLocationForm } from "@/features/employee/skills/components/FreeLocationForm"
import { d } from "@/utils/dictionary"
import Grid from "@mui/material/Grid2"

// Render only the FreeLocationForm in this step
const Page = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FreeLocationForm />
    </Grid>
  </Grid>
)

type ProviderProps = {
  readOnly?: boolean
}

const Provider = ({ readOnly }: ProviderProps) => {
  const navigate = useNavigate()
  const { formData, updateFormData } = useStore()

  const handleSubmit = (data: Schema) => {
    updateFormData(data)
    navigate("/employee/additional-info")
  }

  return (
    <Form
      submitButtonText={d.saveAndContinue}
      slotProps={{ submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> } }}
      schema={schema}
      values={formData}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      readOnly={readOnly}
      title={d.skills}
    >
      <Page />
    </Form>
  )
}

export { Provider as EmployeeSkills }
