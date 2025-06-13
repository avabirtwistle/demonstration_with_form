// src/features/employee/history/utils/useOnDemandScan.ts
import { useRef } from 'react';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import type { FieldPath } from 'react-hook-form';

/**
 * Generic QR scan hook: automatically stream and fill any form field.
 * Use like: const startScan = useOnDemandScan<YourSchema>();
 * then call: startScan("trayRegistry.0.qrCode") or startScan("portfolioLink");
 */
export function useOnDemandScan<FormValues>() {
  const { setValue } = useFormContext<FormValues>();
  const last = useRef<string | null>(null);

  return async function startScan(fieldPath: FieldPath<FormValues>) {
    // Reset QR scanner backend
    await fetch('http://localhost:5000/reset_qr', { method: 'POST' });

    const es = new EventSource('http://localhost:5000/stream');
    es.onmessage = (e) => {
      const code = e.data;
      if (code && code !== last.current) {
        last.current = code;
        // Write scanned code into the specified field
        setValue(fieldPath, code as any, { shouldValidate: true });
      }
      es.close();
    };

    es.onerror = () => {
      console.error('SSE error');
      es.close();
    };
  };
}
