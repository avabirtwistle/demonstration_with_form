// src/features/newPlant/location-qrScan/components/EmployeeAdditionalInfo.tsx

import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { SubmitHandler } from 'react-hook-form'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Grid from '@mui/material/Grid2'

import { useFormContext } from '@/features/form/hooks/useFormContext'
import { Form } from '@/features/form/components/form'
import { TextField } from '@/features/form/components/controllers/text-field'
import { d } from '@/utils/dictionary'

import { useStore } from '@/features/newPlant/location-qrScan/hooks/useStore'
import { defaultValues, schema, Schema } from '@/features/newPlant/location-qrScan/types/schema'

// ── Page component: renders your TextField and fires the scan on mount ──
const Page: React.FC = () => {
  const { setValue } = useFormContext<Schema>()
  const last = useRef<string | null>(null)

  useEffect(() => {
    let es: EventSource

    const startScan = async () => {
      // 1. Reset backend scanner state
      await fetch('http://localhost:5000/location_qr', { method: 'POST' })

      // 2. Open SSE stream
      es = new EventSource('http://localhost:5000/stream')

      es.onmessage = (e) => {
        const code = e.data as string

        // 3. If it’s a new code, stash it and update the form
        if (code && code !== last.current) {
          last.current = code
          setValue('locationCode', code)
        }

        // 4. We only need one result, so close the stream
        es.close()
      }

      es.onerror = () => {
        console.error('SSE error')
        es.close()
      }
    }

    startScan()

    // Cleanup if the component unmounts before SSE fires
    return () => {
      if (es) es.close()
    }
  }, [setValue])

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
