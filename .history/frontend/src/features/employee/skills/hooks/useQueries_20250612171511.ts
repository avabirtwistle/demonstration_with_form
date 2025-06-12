import { useQuery } from "@tanstack/react-query";
import { getFreeLocation } from "@/utils/api";

export const useFreeLocation = () => {
  return useQuery({
    queryKey: ["freeLocation"],
    queryFn: getFreeLocation,
  });
};
