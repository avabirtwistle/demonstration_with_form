import { Schema } from "@/features/newPlant/trayPlantSelection/types/schema";
import {
  getVariety,
  getPlants,
} from "@/features/newPlant/trayPlantSelection/utils/api";
import { useFormContext } from "@/features/form/hooks/useFormContext";
import { useQuery } from "@tanstack/react-query";
import { useWatch } from "react-hook-form";

const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getPlants,
  });
};

const useVariety = () => {
  const { control } = useFormContext<Schema>();
  const categoryId = useWatch({ control, name: "categoryId" });

  return useQuery({
    queryKey: ["sub_cat", { categoryId }],
    queryFn: () => getVariety(categoryId),
  });
};

export { useCategory, useVariety };
