// src/features/employee/history/utils/useOnDemandScan.ts
import { useRef } from 'react';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import type { Schema } from '@/features/employee/history/types/schema';

/**
 * QR scan hook specialized for Employee History step,
 * auto-filling trayRegistry[index].qrCode
 */
export function useOnDemandScan() {
  const { setValue } = useFormContext<Schema>();
  const last = useRef<string | null>(null);

  return async function startScan(index: number) {
    // reset QR scanner
    await fetch('http://localhost:5000/reset_qr', { method: 'POST' });

    const es = new EventSource('http://localhost:5000/stream');
    es.onmessage = (e) => {
      const code = e.data;
      if (code && code !== last.current) {
        last.current = code;
        // set the QR code into the specified trayRegistry entry
        setValue(`trayRegistry.${index}.qrCode`, code);
      }
      es.close();
    };

    es.onerror = () => {
      console.error('SSE error');
      es.close();
    };
  };
}
