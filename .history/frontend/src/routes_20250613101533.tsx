import { EmployeeAdditionalInfo } from "@/features/newPlant/additional-info/page";
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
          <Route path="/newPlant" element={<EmployeeWrapper />}>
            <Route
              path="/newPlant/personal-info"
              element={<PlantInfo />}
            />
            <Route path="/newPlant/history" element={<TrayQR />} />
            <Route path="/newPlant/skills" element={<EmployeeSkills />} />
            <Route
              path="/newPlant/additional-info"
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
