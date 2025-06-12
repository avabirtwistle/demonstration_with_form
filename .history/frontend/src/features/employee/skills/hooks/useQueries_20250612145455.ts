import {
  getCoreCompetencies,
  getLanguages,
  getProficiencyLevels,
  getProficiencyLevelValues,
  getSkillCategories,
  getSkillSubcategories,
  getSkills,
  getFreeLocations,
} from "@/features/employee/skills/utils/api"
import { useQuery } from "@tanstack/react-query"

// Fetch core competency options
export const useCoreCompetencies = () =>
  useQuery({
    queryKey: ["coreCompetencies"],
    queryFn: getCoreCompetencies,
  })

// Fetch dropdown options for proficiency levels
export const useProficiencyLevels = () =>
  useQuery({
    queryKey: ["proficiencyLevels"],
    queryFn: getProficiencyLevels,
  })

// Autofill hook for user’s saved proficiency values
export const useProficiencyLevelValues = () =>
  useQuery({
    queryKey: ["proficiencyLevelValues"],
    queryFn: getProficiencyLevelValues,
  })

// Fetch top-level skill categories
export const useSkillCategories = () =>
  useQuery({
    queryKey: ["skillCategories"],
    queryFn: getSkillCategories,
  })

// Fetch subcategories for a given category
export const useSkillSubcategories = (category: string) =>
  useQuery({
    queryKey: ["skillSubcategories", { category }],
    queryFn: () => getSkillSubcategories(category),
    enabled: !!category,
  })

// Fetch skills for a given subcategory
export const useSkills = (subcategory: string) =>
  useQuery({
    queryKey: ["skills", { subcategory }],
    queryFn: () => getSkills(subcategory),
    enabled: !!subcategory,
  })

// Fetch available languages
export const useLanguages = () =>
  useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  })

// Fetch the next free location for tray placement
export const useFreeLocations = () =>
  useQuery({
    queryKey: ["freeLocations"],
    queryFn: getFreeLocations,
  })
