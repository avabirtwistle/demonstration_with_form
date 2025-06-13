import { EmployeeAdditionalInfo } from "@/features/employee/additional-info/page";
import { TrayQR } from "@/features/employee/history/page";
import { PlantInfo } from "@/features/employee/personal-info/page";
import { EmployeeReview } from "@/features/employee/review/page";
import { EmployeeSkills } from "@/features/employee/skills/page";
import { EmployeeWrapper } from "@/features/employee/wrapper/page";
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
              path="/employee/additional-info"
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
