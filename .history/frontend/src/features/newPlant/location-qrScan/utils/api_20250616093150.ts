import { useRef, useCallback } from 'react'
import { useFormContext } from '@/features/form/hooks/useFormContext'   // ← your custom one
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

const SERVER_URL = 'http://localhost:5000'
const LIGHT_LOC = 'A3'

export function useLocationQRScan() {
  const { setValue } = useFormContext<Schema>()      // ← pulls from your <Form> provider
  const last = useRef<string | null>(null)
  let es: EventSource | null = null

  const startScan = useCallback(async () => {
    try {
      // Reset internal ref to avoid stale data
      last.current = null

      // Turn on the A3 indicator light
      await fetch(`${SERVER_URL}/light/${LIGHT_LOC}/on`)

      // Reset the scanner on the backend
      await fetch(`${SERVER_URL}/reset_location`, { method: 'POST' })

      // Open SSE stream with cache-buster to avoid stale events
      const streamUrl = `${SERVER_URL}/stream/location?ts=${Date.now()}`
      es = new EventSource(streamUrl)

      const cleanup = () => {
        // Turn off the A3 indicator light first
        fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off`)
          .catch(err => console.error('Error turning light off:', err))
        // Close the SSE connection
        es?.close()
        es = null
      }

      es.onmessage = (e) => {
        const code = e.data as string
        if (code && code !== last.current) {
          last.current = code
          setValue('locationCode', code)
          console.log('Scanned locationCode:', code)
          cleanup()
        }
      }

      es.onerror = (err) => {
        console.error('SSE error', err)
        cleanup()
      }
    } catch (err) {
      console.error('Fetch/reset error', err)
      // Ensure the light is off in case of any error before scanning
      fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off`)
        .catch(err => console.error('Error turning light off:', err))
    }
  }, [setValue])

  return { startScan }
}
