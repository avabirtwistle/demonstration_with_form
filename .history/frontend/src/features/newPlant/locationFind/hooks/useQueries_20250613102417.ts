import {
  getProficiencyLevels,
} from "@/features/newPlant/locationFind/utils/api";
import { useQuery } from "@tanstack/react-query";

const useProficiencyLevels = () => {
  return useQuery({
    queryKey: ["proficiencyLevels"],
    queryFn: getProficiencyLevels,
  });
};

export {
  useProficiencyLevels,
};
