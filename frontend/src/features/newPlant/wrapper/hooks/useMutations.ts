import { useEmployeeAdditionalInfoStore } from "@/features/newPlant/location-qrScan/hooks/useStore";
import { useEmployeeHistoryStore } from "@/features/newPlant/trayQrScan/hooks/useStore";
import { usePlantInfoStore } from "@/features/newPlant/trayPlantSelection/hooks/useStore";
import { useEmployeeReviewStore } from "@/features/newPlant/review/hooks/useStore";
import { useEmployeeSkillsStore } from "@/features/newPlant/locationFind/hooks/useStore";
import { create } from "@/features/newPlant/wrapper/utils/api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { showSnack } from "@/utils/showSnack";
import { useMutation } from "@tanstack/react-query";

const useCreate = () => {
  const { formData: plantInfoFormData } =
    usePlantInfoStore();
  const { formData: employeeHistoryFormData } = useEmployeeHistoryStore();
  const { formData: employeeSkillsFormData } = useEmployeeSkillsStore();
  const { formData: employeeAdditionalInfoFormData } =
    useEmployeeAdditionalInfoStore();
  const { formData: employeeReviewFormData } = useEmployeeReviewStore();

  return useMutation({
    mutationFn: () =>
      create({
        ...plantInfoFormData,
        ...employeeHistoryFormData,
        ...employeeSkillsFormData,
        ...employeeAdditionalInfoFormData,
        ...employeeReviewFormData,
      }),

    onSuccess: async () => {
      showSnack("Successful");
      useEmployeeAdditionalInfoStore.getState().reset();
     useEmployeeHistoryStore.getState().reset();
    },
    onError: (error) => {
      showSnack(getErrorMessage(error), { variant: "error" });
    },
  });
};

export { useCreate };
