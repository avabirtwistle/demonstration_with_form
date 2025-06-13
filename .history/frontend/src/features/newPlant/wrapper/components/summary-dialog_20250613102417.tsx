import { useEmployeeAdditionalInfoStore } from "@/features/newPlant/location-qrScan/hooks/useStore";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { EmployeeAdditionalInfo } from "@/features/newPlant/location-qrScan/page";
import { useEmployeeHistoryStore } from "@/features/newPlant/history/hooks/useStore";
import { TrayQR } from "@/features/newPlant/history/page";
import { usePlantInfoStore } from "@/features/newPlant/personal-info/hooks/useStore";
import { PlantInfo } from "@/features/newPlant/personal-info/page";
import { useEmployeeReviewStore } from "@/features/newPlant/review/hooks/useStore";
import { EmployeeReview } from "@/features/newPlant/review/page";
import { useEmployeeSkillsStore } from "@/features/newPlant/locationFind/hooks/useStore";
import { EmployeeSkills } from "@/features/newPlant/locationFind/page";
import { useCreate } from "@/features/newPlant/wrapper/hooks/useMutations";
import { useStore } from "@/features/newPlant/wrapper/hooks/useStore";
import { schema } from "@/features/newPlant/wrapper/types/schema";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { showSnack } from "@/utils/showSnack";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { FormEvent } from "react";
import { d } from "@/utils/dictionary";

const SummaryDialog = () => {
  const { summaryDialogOpen, updateSummaryDialogOpen } = useStore();
  const createMutation = useCreate();

  const { formData: employeePersonalInfoFormData } =
    usePlantInfoStore();
  const { formData: employeeHistoryFormData } = useEmployeeHistoryStore();
  const { formData: employeeSkillsFormData } = useEmployeeSkillsStore();
  const { formData: employeeAdditionalInfoFormData } =
    useEmployeeAdditionalInfoStore();
  const { formData: employeeReviewFormData } = useEmployeeReviewStore();

  const allFormData = {
    ...employeePersonalInfoFormData,
    ...employeeHistoryFormData,
    ...employeeSkillsFormData,
    ...employeeAdditionalInfoFormData,
    ...employeeReviewFormData,
  };

  const handleClose = () => {
    if (!createMutation.isPending) {
      updateSummaryDialogOpen(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(allFormData);
      createMutation.mutate(undefined, { onSuccess: handleClose });
    } catch (error) {
      showSnack(getErrorMessage(error), { variant: "error" });
    }
  };

  return (
    <Dialog
      open={summaryDialogOpen}
      component="form"
      onSubmit={onSubmit}
      fullWidth
      maxWidth="md"
      onClose={handleClose}
    >
      <DialogTitle variant="h5">{d.confirmInformation}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <PlantInfo readOnly />
        <Divider />
        <TrayQR readOnly />
        <Divider />
        <EmployeeSkills readOnly />
        <Divider />
        <EmployeeAdditionalInfo readOnly />
        <Divider />
        <EmployeeReview readOnly />
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {d.close}
        </Button>
        <LoadingButton
          type="submit"
          loading={createMutation.isPending}
          variant="contained"
          startIcon={<SendOutlinedIcon />}
        >
          {d.submit}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export { SummaryDialog };
