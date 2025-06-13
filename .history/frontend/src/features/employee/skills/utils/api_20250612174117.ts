// src/features/employee/skills/utils/proficiencyApi.ts
import { wait } from "@/utils/wait";

export type ProficiencyData = {
  projectManagement: string;
  communication:     string;
  technicalSkills:   string;
};

export async function getProficiencyLevels(): Promise<ProficiencyData> {
  await wait(1000);
  return {
    projectManagement: "Rack",
    communication:     "Level",
    technicalSkills:   "Slot Index",
  };
}
