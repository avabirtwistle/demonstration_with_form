import {
  getProficiencyLevels,
} from "@/features/employee/skills/utils/api";
import { useQuery } from "@tanstack/react-query";

const useProficiencyLevels = () => {
  return useQuery({
    queryKey: ["proficiencyLevels"],
    queryFn: getProficiencyLevels,
  });
};

export {
  //useCoreCompetencies,
  useProficiencyLevels,
  //useSkillCategories,
  //useSkills,
  //useSkillSubcategories,
  //useLanguages,
};
