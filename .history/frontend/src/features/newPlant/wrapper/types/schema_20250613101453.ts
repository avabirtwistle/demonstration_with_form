import { employeeAdditionalInfoSchema } from "@/features/newPlant/location-qrScan/types/schema";
import { employeeHistorySchema } from "@/features/newPlant/history/types/schema";
import { plantInfoSchema } from "@/features/newPlant/personal-info/types/schema";
import { employeeReviewSchema } from "@/features/newPlant/review/types/schema";
import { employeeSkillsSchema } from "@/features/newPlant/skills/types/schema";
import { z } from "zod";

const schema = plantInfoSchema
  .and(employeeSkillsSchema)
  .and(employeeHistorySchema)
  .and(employeeReviewSchema)
  .and(employeeAdditionalInfoSchema);

type Schema = z.infer<typeof schema>;

export { schema, type Schema };
