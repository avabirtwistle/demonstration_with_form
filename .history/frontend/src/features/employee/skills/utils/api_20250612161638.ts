import { wait } from "@/utils/wait";

export interface ProficiencyData {
  projectManagement: string;
  communication: string;
  technicalSkills: string;
  leadership: string;
  problemSolving: string;
}

/**
 * Simulates an API call to fetch proficiency levels for each competency.
 * Replace with a real endpoint when ready.
 */
export async function getProficiencyLevels(): Promise<ProficiencyData> {
  await wait(); // simulate latency

  return {
    projectManagement: "Beginner",
    communication: "Intermediate",
    technicalSkills: "Advanced",
    leadership: "Intermediate",
    problemSolving: "Advanced",
  };
}
