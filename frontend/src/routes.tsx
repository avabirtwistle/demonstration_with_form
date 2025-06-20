import { EmployeeAdditionalInfo } from "@/features/newPlant/location-qrScan/page";
import { TrayQR } from "@/features/newPlant/trayQrScan/page";
import { PlantInfo } from "@/features/newPlant/trayPlantSelection/page";
import { EmployeeReview } from "@/features/newPlant/review/page";
import { EmployeeSkills } from "@/features/newPlant/locationFind/page";
import { EmployeeWrapper } from "@/features/newPlant/wrapper/page";
import { DashboardLayout } from "@/features/layout/components/dashboard-layout";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeDash } from "@/features/homeDash/page";

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="homeDash" element={<HomeDash />} />
          <Route path="/newPlant" element={<EmployeeWrapper />}>
            <Route
              path="/newPlant/trayPlantSelection"
              element={<PlantInfo />}
            />
            <Route path="/newPlant/trayQrScan" element={<TrayQR />} />
            <Route path="/newPlant/locationFind" element={<EmployeeSkills />} />
            <Route
              path="/newPlant/location-qrScan"
              element={<EmployeeAdditionalInfo />}
            />
            <Route path="/newPlant/review" element={<EmployeeReview />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesWrapper };
