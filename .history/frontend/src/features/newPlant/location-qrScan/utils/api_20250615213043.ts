import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema';

// 1. Name it as a hook (must start with "use")
export function useQRScanner() {
  // 2. Hooks at top level of this custom hook
  const { setValue } = useFormContext<Schema>();
  const last = useRef<string | null>(null);

  // 3. Your scan function
  const startScan = async () => {
    // reset server side
    await fetch("http://localhost:5000/location_qr", { method: "POST" });

    // open SSE stream
    const es = new EventSource("http://localhost:5000/stream");

    es.onmessage = (e) => {
      const code = e.data;
      if (code && code !== last.current) {
        last.current = code;
        setValue("locationCode", code);
      }
      es.close();
    };

    es.onerror = () => {
      console.error("SSE error");
      es.close();
    };
  };

  // return the trigger just like a custom hook
  return { startScan };
}
