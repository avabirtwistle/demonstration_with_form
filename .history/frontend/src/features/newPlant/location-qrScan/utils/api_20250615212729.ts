import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { locationQR, Schema } from '@/features/newPlant/location-qrScan/types/schema';


// It returns an async function that can be called to start a QR code scanning session.
function getQR() {
  // Get the setValue function from the form context to allow programmatic updates to form fields.
  const { setValue } = useFormContext<Schema>();

  // Create a ref to store the last scanned QR code so we don't update the form more than once
  // with the same value.
  const last = useRef<string | null>(null);

  // Return an async function that starts the scan process for a specific form entry index.
  return async function startScan(index: number) {
    // First, send a POST request to the backend to reset any previous QR scan session.
    await fetch("http://localhost:5000/location_qr", { method: "POST" });

    // Open a connection to the server using Server-Sent Events (SSE).
    // This keeps the connection open so the frontend can listen for streamed QR scan events.
    const es = new EventSource("http://localhost:5000/stream");

    // When the server sends a new message (a scanned QR code), handle it here:
    es.onmessage = (e) => {
      const code = e.data; // Extract the scanned code from the message.

      // If we receive a new, valid code that hasn’t already been processed:
      if (code && code !== last.current) {
        last.current = code; // Update the last seen code.

        // Update the corresponding field in the form (e.g., trayRegistry[3].qrCode).
        setValue(`locationCode`, code);
      }

      // Close the connection after handling one message to prevent memory leaks.
      es.close();
    };

    // Handle errors with the SSE connection (e.g., server not available).
    es.onerror = () => {
      console.error("SSE error"); // Print the error to the console for debugging.
      es.close(); // Always close the connection when done or on failure.
    };
  };
}

export { getQR }