import { AutocompleteOption } from "@/features/form/components/controllers/autocomplete"
import { wait } from "@/utils/wait"

// Mock data for skill categories hierarchy (abbreviated)
const mockSkillCategories = [/* ... */]

/**
 * Returns available core competency options
 */
export async function getCoreCompetencies(): Promise<AutocompleteOption[]> {
  await wait()
  return [
    { label: "Project Management", value: "1" },
    { label: "Communication", value: "2" },
    { label: "Technical Skills", value: "3" },
    { label: "Leadership", value: "4" },
    { label: "Problem-Solving", value: "5" },
    { label: "Other", value: "6" },
  ]
}

/**
 * Returns dropdown options for proficiency levels
 */
export async function getProficiencyLevels(): Promise<AutocompleteOption[]> {
  await wait()
  return [
    { label: "Beginner", value: "1" },
    { label: "Intermediate", value: "2" },
    { label: "Advanced", value: "3" },
  ]
}

/**
 * Fetches the user’s saved proficiency-level values from backend
 */
export async function getProficiencyLevelValues(): Promise<{ projectManagement: string; communication: string; technicalSkills: string; leadership: string; problemSolving: string }> {
  const res = await fetch("/api/proficiency-value")
  if (!res.ok) throw new Error(`Failed to load proficiency values: ${res.status} ${res.statusText}`)
  return res.json()
}

/**
 * Returns top-level skill categories (flattened for dropdown)
 */
export async function getSkillCategories(): Promise<AutocompleteOption[]> {
  await wait()
  return mockSkillCategories.map(cat => ({ label: cat.label, value: cat.value }))
}

/**
 * Returns subcategories for a given category
 */
export async function getSkillSubcategories(categoryId: string): Promise<AutocompleteOption[]> {
  await wait()
  const category = mockSkillCategories.find(cat => cat.value === categoryId)
  if (!category) return []
  return category.children.map(sub => ({ label: sub.label, value: sub.value }))
}

/**
 * Returns skills for a given subcategory
 */
export async function getSkills(subcategoryId: string): Promise<AutocompleteOption[]> {
  await wait()
  for (const cat of mockSkillCategories) {
    const sub = cat.children.find(s => s.value === subcategoryId)
    if (sub) return sub.children.map(skill => ({ label: skill.label, value: skill.value }))
  }
  return []
}

/**
 * Returns available languages
 */
export async function getLanguages(): Promise<AutocompleteOption[]> {
  await wait()
  return [
    { value: "1", label: "English" },
    { value: "2", label: "Spanish" },
    // ... other languages
  ]
}
