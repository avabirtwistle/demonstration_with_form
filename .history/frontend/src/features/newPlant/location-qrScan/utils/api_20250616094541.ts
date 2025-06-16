import { useRef, useCallback } from 'react'
import { useFormContext } from '@/features/form/hooks/useFormContext'
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema'

const SERVER_URL = 'http://localhost:5000'
const LIGHT_LOC = 'A3'

export function useLocationQRScan() {
  const { setValue } = useFormContext<Schema>()
  const last = useRef<string | null>(null)
  const esRef = useRef<EventSource | null>(null)

  const stopScan = useCallback(() => {
    // Close any existing stream
    if (esRef.current) {
      esRef.current.close()
      esRef.current = null
    }
    // Ensure the light is turned off
    fetch(`${SERVER_URL}/light/${LIGHT_LOC}/off?ts=${Date.now()}`)
      .catch(err => console.error('Error turning light off:', err))
  }, [])

  const startScan = useCallback(async () => {
    // Ensure any previous scan is fully stopped
    stopScan()
    last.current = null

    // Turn on the A3 indicator light
    await fetch(`${SERVER_URL}/light/${LIGHT_LOC}/on`)
      .catch(err => console.error('Error turning light on:', err))

    // Reset the scanner on the backend
    await fetch(`${SERVER_URL}/reset_location`, { method: 'POST' })
      .catch(err => console.error('Error resetting scanner:', err))

    // Open SSE stream with cache-buster
    const url = `${SERVER_URL}/stream/location?ts=${Date.now()}`
    const es = new EventSource(url)
    esRef.current = es

    es.onmessage = (e) => {
      const code = e.data as string
      if (code && code !== last.current) {
        last.current = code
        setValue('locationCode', code)
        console.log('Scanned locationCode:', code)
        // Stop the scan (closes stream & turns off light)
        stopScan()
      }
    }

    es.onerror = (err) => {
      console.error('SSE error', err)
      // Ensure we cleanup on error
      stopScan()
    }
  }, [setValue, stopScan])

  return { startScan, stopScan }
}