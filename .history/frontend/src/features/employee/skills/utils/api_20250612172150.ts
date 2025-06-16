// at the top, ensure this type matches exactly:
export type ProficiencyData = {
  projectManagement: string;
  communication:     string;
  technicalSkills:   string;
};

// …

export const getProficiencyLevels = async (): Promise<ProficiencyData> => {
  await wait(1000); // simulate 1 s loading

  return {
    projectManagement: "Rack",
    communication:     "Level",
    technicalSkills:   "Slot Index",
  };
};
