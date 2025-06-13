import { EmployeeAdditionalInfo } from "@/features/newPlant/location-qrScan/page";
import { TrayQR } from "@/features/newPlant/history/page";
import { PlantInfo } from "@/features/newPlant/personal-info/page";
import { EmployeeReview } from "@/features/newPlant/review/page";
import { EmployeeSkills } from "@/features/newPlant/skills/page";
import { EmployeeWrapper } from "@/features/newPlant/wrapper/page";
import { DashboardLayout } from "@/features/layout/components/dashboard-layout";
import { BrowserRouter, Route, Routes } from "react-router";

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/employee" element={<EmployeeWrapper />}>
            <Route
              path="/employee/personal-info"
              element={<PlantInfo />}
            />
            <Route path="/employee/history" element={<TrayQR />} />
            <Route path="/employee/skills" element={<EmployeeSkills />} />
            <Route
              path="/employee/location-qrScan"
              element={<EmployeeAdditionalInfo />}
            />
            <Route path="/employee/review" element={<EmployeeReview />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesWrapper };
