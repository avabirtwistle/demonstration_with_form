// src/features/employee/skills/hooks/useQueries.ts
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { getProficiencyLevels, ProficiencyData } from "@/features/employee/skills/utils/api";
import type { Schema } from "@/features/employee/skills/types/schema";

export function useProficiencyLevels() {
  // grab setValue from RHF
  const { setValue } = useFormContext<Schema>();

  return useQuery<ProficiencyData>({
    queryKey: ["proficiencyLevels"],
    queryFn: getProficiencyLevels,
    onSuccess(data) {
      // write each returned field into the form
      Object.entries(data).forEach(([key, val]) => {
        setValue(`proficiencyLevels.${key}` as any, val);
      });
    },
  });
}
