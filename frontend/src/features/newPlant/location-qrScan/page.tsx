// src/features/newPlant/location-qrScan/components/EmployeeAdditionalInfo.tsx

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { SubmitHandler } from 'react-hook-form'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Grid from '@mui/material/Grid2'

import { useFormContext } from '@/features/form/hooks/useFormContext'
import { Form } from '@/features/form/components/form'
import { TextField } from '@/features/form/components/controllers/text-field'
import { d } from '@/utils/dictionary'

import { useStore } from '@/features/newPlant/location-qrScan/hooks/useStore'
import { useLocationQRScan } from '@/features/newPlant/location-qrScan/utils/api'  // ← your hook
import { defaultValues, schema, Schema } from '@/features/newPlant/location-qrScan/types/schema'

// ── Page: just renders the TextField and fires your hook’s scan on mount ──
const Page: React.FC = () => {
  const { startScan } = useLocationQRScan()   // ← use your hook here

  useEffect(() => {
    startScan()                                // ← kick it off on mount
  }, [startScan])

  return (
    <Grid item xs={6}>
      <TextField<Schema> name="locationCode" label={d.locationCode} />
    </Grid>
  )
}

// ── Provider: your Form wrapper with submit/navigation logic ──
type ProviderProps = { readOnly?: boolean }

const EmployeeAdditionalInfo: React.FC<ProviderProps> = ({ readOnly }) => {
  const navigate = useNavigate()
  const { formData, updateFormData } = useStore()

  const handleSubmit: SubmitHandler<Schema> = (data) => {
    updateFormData(data)
    navigate('/newPlant/review')
  }

  return (
    <Form
      title={d.additionalInfo}
      schema={schema}
      values={formData}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      readOnly={readOnly}
      submitButtonText={d.saveAndContinue}
      slotProps={{
        submitButtonProps: { startIcon: <ArrowForwardIosRoundedIcon /> },
      }}
    >
      <Page />
    </Form>
  )
}

export { EmployeeAdditionalInfo }
