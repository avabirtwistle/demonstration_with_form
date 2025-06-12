// src/features/employee/skills/utils/api.ts
import { wait } from "@/utils/wait";

export interface ProficiencyData {
  projectManagement: string;
  communication:    string;
  technicalSkills:  string;
  leadership:       string;
  problemSolving:   string;
}

/**
 * Simulates fetching the actual stored proficiency levels for each competency.
 * NOTE: returns a single object, not an array of dropdown options.
 */
export async function getProficiencyLevels(): Promise<ProficiencyData> {
  await wait(); // simulate network delay

  return {
    projectManagement: "Beginner",
    communication:    "Intermediate",
    technicalSkills:  "Advanced",
    leadership:       "Intermediate",
    problemSolving:   "Advanced",
  };
}

// — you can leave the rest of your api.ts (getCoreCompetencies, getLanguages, etc.) untouched
