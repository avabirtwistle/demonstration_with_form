import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Schema } from '@/features/employee/trayContents/types/schema';

export function useOnDemandScan() {
  const { setValue } = useFormContext<Schema>();
  const last = useRef<string | null>(null);

  return async function startScan(index: number) {
    await fetch("http://localhost:5000/reset_qr", { method: "POST" });

    const es = new EventSource("http://localhost:5000/stream");
    es.onmessage = (e) => {
      const code = e.data;
      if (code && code !== last.current) {
        last.current = code;
        setValue(`trayRegistry.${index}.qrCode`, code);
      }
      es.close();
    };
    es.onerror = () => {
      console.error("SSE error");
      es.close();
    };
  };
}
