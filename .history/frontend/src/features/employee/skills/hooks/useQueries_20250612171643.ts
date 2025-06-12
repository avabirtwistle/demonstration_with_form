import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import {
  getCoreCompetencies,
  getLanguages,
  getProficiencyLevels,
  getSkillCategories,
  getSkills,
  getSkillSubcategories,
  getFreeLocation,
} from "@/features/employee/skills/utils/api";
import type { Schema } from "@/features/employee/skills/types/schema";
import type { AutocompleteOption } from "@/features/form/components/controllers/autocomplete";
import type { ProficiencyData, LocationData } from "@/features/employee/skills/utils/api";

/**
 * Hook for fetching and caching core competencies.
 */
export function useCoreCompetencies() {
  return useQuery<AutocompleteOption[]>({
    queryKey: ["coreCompetencies"],
    queryFn: getCoreCompetencies,
  });
}

/**
 * Hook for fetching and auto-populating proficiency levels into the form.
 */
export function useProficiencyLevels() {
  const { setValue } = useFormContext<Schema>();

  return useQuery<ProficiencyData>({
    queryKey: ["proficiencyLevels"],
    queryFn: getProficiencyLevels,
    onSuccess(data) {
      Object.entries(data).forEach(([key, val]) => {
        setValue(`proficiencyLevels.${key}` as any, val);
      });
    },
  });
}

/**
 * Hook for fetching and auto-populating location (rack/level/slotIndex).
 */
export function useFreeLocation() {
  const { setValue } = useFormContext<Schema>();

  return useQuery<LocationData>({
    queryKey: ["freeLocation"],
    queryFn: getFreeLocation,
    onSuccess(data) {
      setValue("rack", data.rack);
      setValue("level", data.level);
      setValue("slotIndex", data.slotIndex);
    },
  });
}

/**
 * Hook for fetching skill categories.
 */
export function useSkillCategories() {
  return useQuery<AutocompleteOption[]>({
    queryKey: ["skillCategories"],
    queryFn: getSkillCategories,
  });
}

/**
 * Hook for fetching skill subcategories.
 */
export function useSkillSubcategories(category: string) {
  return useQuery<AutocompleteOption[]>({
    queryKey: ["skillSubcategories", category],
    queryFn: () => getSkillSubcategories(category),
    enabled: !!category,
  });
}

/**
 * Hook for fetching skills.
 */
export function useSkills(subcategory: string) {
  return useQuery<AutocompleteOption[]>({
    queryKey: ["skills", subcategory],
    queryFn: () => getSkills(subcategory),
    enabled: !!subcategory,
  });
}

/**
 * Hook for fetching languages spoken.
 */
export function useLanguages() {
  return useQuery<AutocompleteOption[]>({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
}
