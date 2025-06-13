// src/features/employee/history/utils/useOnDemandScan.ts
import { useRef } from 'react';
import { useFormContext } from '@/features/form/hooks/useFormContext';
import type { FieldPath } from 'react-hook-form';

/**
 * Custom hook to enable QR code scanning and automatically fill a form field.
 * 
 * - It works with any form field that is managed by react-hook-form.
 * - To use:
 *     const startScan = useOnDemandScan<YourSchema>();
 *     startScan("trayRegistry.0.qrCode"); // or any valid field path
 */
export function useOnDemandScan<FormValues extends Record<string, unknown>>() {
  // hook from react-hook-form giving access to form methods from the parent form
  // allows us to set fields, watch for changes etc
  const { setValue } = useFormContext<FormValues>(); //short way of saying
                                                    // const formContext = useFormContext<FormValues>();
                                                    // const setValue = formContext.setValue;

  //keep track of the last scanner QR code to prevent duplicate updates
  const last = useRef<string | null>(null);

  //return an asynchronous function that starts the scan for the given field
  return async function startScan(fieldPath: FieldPath<FormValues>) {
    //reset the QR code on the backend before starting a new scan
    //ensures we dont get stale data from the last scan
    await fetch('http://localhost:5000/reset_qr', { method: 'POST' });

    //open a server-sent events stream to receive QR code updates
    const es = new EventSource('http://localhost:5000/stream');

    //listen for messages from the server
    es.onmessage = (e) => {
      const code = e.data;

      //only update the form field if scanned data is new
      if (code && code !== last.current) {
        last.current = code;

        //update the form field with the new QR code and trigger validation
        setValue(fieldPath, code as any, { shouldValidate: true });
      }

      //once a code is received and processed, close the stream
      es.close();
    };

    // handle errors in the SSE connection
    es.onerror = () => {
      console.error('SSE error');
      es.close(); //clean up the stream connection on error
    };
  };
}
