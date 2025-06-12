import { AutocompleteOption } from "@/features/form/components/controllers/autocomplete";
import { wait } from "@/utils/wait";

/**
 * Shape of the fake proficiency data to match our form schema.
 */
export type ProficiencyData = {
  projectManagement: string;
  communication: string;
  technicalSkills: string;
};

const mockSkillCategories = [
  // ... existing mockSkillCategories unchanged ...
];

const getCoreCompetencies = async (): Promise<AutocompleteOption[]> => {
  await wait();

  return [
    { label: "Project Management", value: "1" },
    { label: "Communication", value: "2" },
    { label: "Technical Skills", value: "3" },
    { label: "Leadership", value: "4" },
    { label: "Problem-Solving", value: "5" },
    { label: "Other", value: "6" },
  ];
};

/**
 * Returns fake labels for rack-level location fields under the guise of proficiency levels.
 */
export const getProficiencyLevels = async (): Promise<ProficiencyData> => {
  await wait(1000); // simulate 1 second delay

  return {
    projectManagement: "Rack",
    communication: "Level",
    technicalSkills: "Slot Index",
  };
};

const getSkillCategories = async (): Promise<AutocompleteOption[]> => {
  await wait();
  return mockSkillCategories.map((category) => ({
    label: category.label,
    value: category.value,
  }));
};

const getSkillSubcategories = async (
  categoryId: string
): Promise<AutocompleteOption[]> => {
  await wait();
  const category = mockSkillCategories.find((cat) => cat.value === categoryId);
  if (!category) return [];

  return category.children.map((subcategory) => ({
    label: subcategory.label,
    value: subcategory.value,
  }));
};

const getSkills = async (
  subcategoryId: string
): Promise<AutocompleteOption[]> => {
  await wait();
  for (const category of mockSkillCategories) {
    const subcategory = category.children.find(
      (sub) => sub.value === subcategoryId
    );
    if (subcategory) {
      return subcategory.children.map((skill) => ({
        label: skill.label,
        value: skill.value,
      }));
    }
  }
  return [];
};

const getLanguages = async (): Promise<AutocompleteOption[]> => {
  await wait();
  return [
    { value: "1", label: "English" },
    { value: "2", label: "Spanish" },
    { value: "3", label: "French" },
    { value: "4", label: "German" },
    { value: "5", label: "Chinese" },
    { value: "6", label: "Japanese" },
    { value: "7", label: "Korean" },
    { value: "8", label: "Arabic" },
    { value: "9", label: "Hindi" },
    { value: "10", label: "Portuguese" },
    { value: "11", label: "Russian" },
    { value: "12", label: "Italian" },
  ];
};

export {
  getCoreCompetencies,
  getProficiencyLevels,
  getSkillCategories,
  getSkillSubcategories,
  getSkills,
  getLanguages,
};
