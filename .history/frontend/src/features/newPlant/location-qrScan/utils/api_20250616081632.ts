// src/features/newPlant/location-qrScan/hooks/useLocationQRScan.ts
import { useRef, useCallback } from 'react'
import { useFormContext } from '@/features/form/hooks/useFormContext'
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

export function useLocationQRScan() {
  const { setValue } = useFormContext<Schema>()
  const last = useRef<string | null>(null)

  const startScan = useCallback(async () => {
    try {
      // 1) Reset any old location QR
      await fetch('http://localhost:5000/reset_location', {
        method: 'POST',
      })

      // 2) Open the SSE stream on the correct URL
      const es = new EventSource('http://localhost:5000/stream/location')
      es.onmessage = (e) => {
        const code = e.data as string
        if (code && code !== last.current) {
          last.current = code
          setValue('locationCode', code)
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
