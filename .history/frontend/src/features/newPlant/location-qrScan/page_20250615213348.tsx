// src/features/newPlant/location-qrScan/components/Page.tsx
import { useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { TextField } from '@/features/form/components/controllers/text-field'
import { startScan } from '@/features/newPlant/location-qrScan/utils/api'
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

export const Page = () => {
  const { startScan } = useLocationQRScan()

  useEffect(() => {
    startScan()   // kick off a scan as soon as the page mounts
  }, [startScan])

  return (
    <Grid item xs={6}>
      <TextField<Schema>
        name="locationCode"
        label="Location Code"
      />
    </Grid>
  )
}
