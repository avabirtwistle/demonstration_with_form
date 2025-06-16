// src/features/employee/trayContents/utils/useOnDemandScan.ts
import { useRef } from 'react';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import type { FieldPath } from 'react-hook-form';

/**
 * Generic QR scan hook: automatically stream and fill any form field.
 * Use like: const startScan = useOnDemandScan<YourSchema>();
 * then call: startScan("trayRegistry.0.qrCode") or startScan("locationCode");
 */
export function useOnDemandScan<FormValues extends Record<string, unknown>>() {
  const { setValue } = useFormContext<FormValues>();
  const last = useRef<string | null>(null);

  return async function startScan(fieldPath: FieldPath<FormValues>) {
    await fetch('http://localhost:5000/reset_qr', { method: 'POST' });

    const es = new EventSource('http://localhost:5000/stream');
    es.onmessage = (e) => {
      const code = e.data;
      if (code && code !== last.current) {
        last.current = code;
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
