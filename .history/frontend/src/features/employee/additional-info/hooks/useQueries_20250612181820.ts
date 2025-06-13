import { getRelationships } from "@/features/employee/location-qrScan/utils/api";
import { useQuery } from "@tanstack/react-query";

const useRelationships = () => {
  return useQuery({
    queryKey: ["relationships"],
    queryFn: getRelationships,
  });
};

export { useRelationships };
