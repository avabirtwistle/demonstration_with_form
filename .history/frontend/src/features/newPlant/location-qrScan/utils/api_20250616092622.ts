import { useRef, useCallback } from 'react'
import { useFormContext } from '@/features/form/hooks/useFormContext'   // ← your custom one
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

const SERVER_URL = 'http://localhost:5000'
const LIGHT_LOC = 'A3'

export function useLocationQRScan() {
  const { setValue } = useFormContext<Schema>()      // ← pulls from your <Form> provider
  const last = useRef<string | null>(null)

  const startScan = useCallback(async () => {
    let es: EventSource | null = null
    try {
      // Turn on the A3 indicator light
      await fetch(`${SERVER_URL}/light/${LIGHT_LOC}/on`, { method: 'POST' })

      // reset the scanner on the backend
      await fetch(`${SERVER_URL}/reset_location`, { method: 'POST' })

      // open the SSE stream
      es = new EventSource(`${SERVER_URL}/stream/location`)
      es.onmessage = (e) => {
        const code = e.data as string

        if (code && code !== last.current) {
          last.current = code
          setValue('locationCode', code)    // ← put it into your form
          console.log('Scanned locationCode:', code)
        }

        // Turn off the A3 indicator
        fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off`, { method: 'POST' })
          .catch(err => console.error('Error turning light off:', err))

        es?.close()
      }
      es.onerror = (err) => {
        console.error('SSE error', err)
        // Ensure we turn off the light on error
        fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off`, { method: 'POST' })
          .catch(err => console.error('Error turning light off:', err))
        es?.close()
      }
    } catch (err) {
      console.error('Fetch/reset error', err)
      // On any failure before scan, ensure light is off
      fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off`, { method: 'POST' })
        .catch(err => console.error('Error turning light off:', err))
    }
  }, [setValue])

  return { startScan }
}
