
# Tray Registry Interface
## Introduction
The TrayRegistry interface defines the structure of each tray object registered during the plant setup process. It includes fields such as qrCode, slotLocation, and rackId, representing the tray’s identity and physical placement within the system. The tray registry is maintained using centralized Zustand state, and all entries are validated using Zod before submission to ensure structural correctness and data integrity.

## QR Code
QR codes are scanned using a mobile device and sent to a Flask backend, where the code type is resolved. The system evaluates available slots against tray contents and requirements. Once an appropriate location is determined, the result is streamed to the frontend via Server-Sent Events (SSE).
When the system expects the tray to be placed, the ESP32 triggers a visual indicator by illuminating the LED at the target slot index located on the front of the reservoir. The indicator turns off automatically when the user scans the correct location. This mechanism improves compliance during planting and transferring by providing real-time visual confirmation and reducing user error.

# Tanstack Query
To communicate with the backend server, APIs are used. In addition to this, schemas are used to ensure response validation. The structure of the schemas and the metadata returned by the backend server is structured to allow for safe parsing. Validating the data ensures that we do not accidentally save information to the database that is incorrect, irrelevant or innaccurate. 

# TypeScript
To help improve code predictability, TypeScript was used.

# Zod
Zod was used to validate input. This was particularly useful for the tray registry interface. Data integrity for the tray registry interface is very important as our tray metadata controls physical environment variables, is used for task generation, inventory information, data tracking and overall has a large impact on system flow. Without validating the information, invalid QR codes could be logged which would negatively impact the system's data integrity.



## Stepper
### Purpose
The stepper is used in the TrayRegistry interface to allow the user to see their progression as well as the remaining steps for registering their tray. It is linear which enforces the user to complete the steps in order and avoid skipping. 
