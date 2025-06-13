import { Stepper } from "@/features/newPlant/wrapper/components/stepper";
import { SummaryDialog } from "@/features/newPlant/wrapper/components/summary-dialog";
import { Divider } from "@mui/material";
import { Outlet } from "react-router";

const Page = () => {
  return (
    <>
      <SummaryDialog />
      <Stepper />
      <Divider sx={{ marginY: 2 }} />
      <Outlet />
    </>
  );
};

export { Page as EmployeeWrapper };
