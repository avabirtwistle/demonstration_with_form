import { wait } from "@/utils/wait";

export type ProficiencyData = {
  projectManagement: string;
  communication:     string;
  technicalSkills:   string;
};

export async function getProficiencyLevels(): Promise<ProficiencyData> {
  await wait(1000);
  return {
    projectManagement: "02",
    communication:     "02",
    technicalSkills:   "03",
  };
}
