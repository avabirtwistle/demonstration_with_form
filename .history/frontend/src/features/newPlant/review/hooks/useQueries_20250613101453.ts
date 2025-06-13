import { getTermsAndConditions } from "@/features/newPlant/review/utils/api";
import { useQuery } from "@tanstack/react-query";

const useTermsAndConditions = () => {
  return useQuery({
    queryKey: ["termsAndConditions"],
    queryFn: getTermsAndConditions,
  });
};

export { useTermsAndConditions };
