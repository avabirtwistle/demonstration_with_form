// src/features/newPlant/location-qrScan/hooks/useLocationQRScan.ts
import { useRef, useCallback } from 'react'
import { useFormContext } from '@/features/form/hooks/useFormContext'   // ← your custom one
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

export function useLocationQRScan() {
  const { setValue } = useFormContext<Schema>()      // ← pulls from your <Form> provider
  const last = useRef<string | null>(null)

  const startScan = useCallback(async () => {
    try {
      // reset the scanner on the backend
      await fetch('http://localhost:5000/location_qr', { method: 'POST' })

      // open the SSE stream
      const es = new EventSource('http://localhost:5000/stream')
      es.onmessage = (e) => {
        const code = e.data as string

        if (code && code !== last.current) {
          last.current = code
          setValue('locationCode', code)    // ← put it into your form
          console.log('Scanned locationCode:', code)
        }

        es.close()
      }
      es.onerror = (err) => {
        console.error('SSE error', err)
        es.close()
      }
    } catch (err) {
      console.error('Fetch/reset error', err)
    }
  }, [setValue])

  return { startScan }
}
