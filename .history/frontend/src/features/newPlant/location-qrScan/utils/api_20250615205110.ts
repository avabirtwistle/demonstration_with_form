import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Schema } from '@/features/newPlant/location-qrScan/types/schema';

const getQR = async (): Promise<AutocompleteOption[]> => {
  await wait();
  return [
    { label: "Former Manager", value: "1" },
    { label: "Current Manager", value: "2" },
    { label: "Direct Supervisor", value: "3" },
    { label: "Team Lead", value: "4" },
    { label: "Project Manager", value: "5" },
    { label: "Colleague", value: "6" },
    { label: "Senior Colleague", value: "7" },
    { label: "Department Head", value: "8" },
    { label: "Professional Mentor", value: "9" },
    { label: "Client", value: "10" },
  ];
};

export { getQR };



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
