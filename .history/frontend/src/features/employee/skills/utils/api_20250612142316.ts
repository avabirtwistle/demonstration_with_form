import { AutocompleteOption } from "@/features/form/components/controllers/autocomplete"
import { wait } from "@/utils/wait"

// Define a type for hierarchical skill categories
type SkillCategory = {
  label: string
  value: string
  children?: SkillCategory[]
}

// Mock data for skill categories hierarchy
const mockSkillCategories: SkillCategory[] = [
  {
    label: "Technical Skills",
    value: "1",
    children: [
      {
        label: "Programming Languages",
        value: "1.1",
        children: [
          { label: "Python", value: "1.1.1" },
          { label: "Java", value: "1.1.2" },
          { label: "C++", value: "1.1.3" },
          { label: "JavaScript", value: "1.1.4" },
        ],
      },
      {
        label: "Software Proficiency",
        value: "1.2",
        children: [
          { label: "Microsoft Excel", value: "1.2.1" },
          { label: "Adobe Creative Suite", value: "1.2.2" },
          { label: "Salesforce", value: "1.2.3" },
        ],
      },
      {
        label: "Web Development",
        value: "1.4",
        children: [
          { label: "HTML", value: "1.4.1" },
          { label: "CSS", value: "1.4.2" },
          { label: "React", value: "1.4.3" },
          { label: "Node.js", value: "1.4.4" },
        ],
      },
      // Add more categories as needed
    ],
  },
  {
    label: "Soft Skills",
    value: "2",
    children: [
      {
        label: "Communication",
        value: "2.1",
        children: [
          { label: "Verbal communication", value: "2.1.1" },
          { label: "Written communication", value: "2.1.2" },
          { label: "Active listening", value: "2.1.3" },
        ],
      },
      // Add more soft skills as needed
    ],
  },
  // Additional top-level categories...
]

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
 * Returns dropdown options for proficiency levels (if needed)
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
export async function getProficiencyLevelValues(): Promise<{
  projectManagement: string
  communication:      string
  technicalSkills:    string
  leadership:         string
  problemSolving:     string
}> {
  const res = await fetch("/api/proficiency-value")
  if (!res.ok) throw new Error(`Failed to load proficiency values: ${res.status} ${res.statusText}`)
  return res.json()
}

/**
 * Fetches the next free location from backend
 */
export async function getFreeLocations(): Promise<{
  slot_id:      number
  slot_qr_code: string
  slot_number:  number
  occupied:     number
  level_id:     number
  level_qr_id:  string
  level_num:    number
  rack_id:      number
  rack_qr_id:   string
}> {
  const res = await fetch("/api/free-locations")
  if (!res.ok) throw new Error(`Failed to load free locations: ${res.status} ${res.statusText}`)
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
  if (!category || !category.children) return []
  return category.children.map(sub => ({ label: sub.label, value: sub.value }))
}

/**
 * Returns skills for a given subcategory
 */
export async function getSkills(subcategoryId: string): Promise<AutocompleteOption[]> {
  await wait()
  for (const cat of mockSkillCategories) {
    const sub = cat.children?.find(s => s.value === subcategoryId)
    if (sub && sub.children) {
      return sub.children.map(skill => ({ label: skill.label, value: skill.value }))
    }
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
    { value: "3", label: "French" },
    // ... other languages
  ]
}
