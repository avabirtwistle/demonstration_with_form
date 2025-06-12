import {
  getCoreCompetencies,
  getLanguages,
  getProficiencyLevels,
  getProficiencyLevelValues,
  getSkillCategories,
  getSkills,
  getSkillSubcategories,
  getFreeLocations,
} from "@/features/employee/skills/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useCoreCompetencies = () =>
  useQuery(["coreCompetencies"], getCoreCompetencies)

export const useProficiencyLevels = () =>
  useQuery(["proficiencyLevels"], getProficiencyLevels)

// Autofill hook for saved proficiency values
export const useProficiencyLevelValues = () =>
  useQuery(["proficiencyLevelValues"], getProficiencyLevelValues)

export const useSkillCategories = () =>
  useQuery(["skillCategories"], getSkillCategories)

export const useSkillSubcategories = (category: string) =>
  useQuery(
    ["skillSubcategories", { category }],
    () => getSkillSubcategories(category),
    { enabled: !!category }
  )

export const useSkills = (subcategory: string) =>
  useQuery(
    ["skills", { subcategory }],
    () => getSkills(subcategory),
    { enabled: !!subcategory }
  )

export const useLanguages = () =>
  useQuery(["languages"], getLanguages)

// Hook for fetching next free location
export const useFreeLocations = () =>
  useQuery(["freeLocations"], getFreeLocations)
