import { useRef, useCallback } from 'react'
import { useFormContext } from '@/features/form/hooks/useFormContext'   // ← your custom one
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

const SERVER_URL = 'http://localhost:5000'
const LIGHT_LOC = 'A3'

export function useLocationQRScan() {
  const { setValue } = useFormContext<Schema>()
  const last = useRef<string | null>(null)
  let es: EventSource | null = null

  const startScan = useCallback(async () => {
    try {
      
      // Reset internal ref to avoid stale data
      last.current = null
      fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off?ts=${Date.now()}`)
            .catch(err => console.error('Error turning light off:', err))
      // Reset the scanner on the backend
      await fetch(`${SERVER_URL}/reset_location`, { method: 'POST' })
        .catch(err => console.error('Error resetting scanner:', err))

      // Open SSE stream with cache-buster to avoid stale events
      const streamUrl = `${SERVER_URL}/stream/location?ts=${Date.now()}`
      es = new EventSource(streamUrl)
      fetch(`${SERVER_URL}/light/${LIGHT_LOC}/on?ts=${Date.now()}`)
            .catch(err => console.error('Error turning light off:', err))
      es.onmessage = (e) => {
        const code = e.data as string
        if (code && code !== last.current) {
          last.current = code
          setValue('locationCode', code)
          console.log('Scanned locationCode:', code)

          // Turn off the A3 indicator immediately and close stream
          fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off?ts=${Date.now()}`)
            .catch(err => console.error('Error turning light off:', err))
          es?.close()
          es = null
        }
                  // Turn off the A3 indicator immediately and close stream
          fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off?ts=${Date.now()}`)
            .catch(err => console.error('Error turning light off:', err))
          es?.close()
      }

      es.onerror = (err) => {
        console.error('SSE error', err)
        // Ensure the light is off on error
        fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off?ts=${Date.now()}`)
          .catch(err => console.error('Error turning light off on error:', err))
        es?.close()
        es = null
      }
    } catch (err) {
      console.error('Fetch/reset error', err)
      // Ensure the light is off if any step fails
      fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off?ts=${Date.now()}`)
        .catch(err => console.error('Error turning light off on exception:', err))
    }
  }, [setValue])

  return { startScan }
}
