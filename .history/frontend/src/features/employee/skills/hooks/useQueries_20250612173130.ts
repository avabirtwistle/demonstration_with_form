import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import type { Schema } from "@/features/employee/skills/types/schema";
import type { ProficiencyData } from "@/features/employee/skills/utils/api";
import { getProficiencyLevels } from "@/features/employee/skills/utils/api";

/**
 * Hook for fetching and auto-populating proficiency levels into the form.
 */
function useProficiencyLevels() {
  const { setValue } = useFormContext<Schema>();

  return useQuery<ProficiencyData>({
    queryKey: ["proficiencyLevels"],
    queryFn: getProficiencyLevels,
    onSuccess(data) {
      setValue("proficiencyLevels", data);
    },
  });
}

export default useProficiencyLevels;
