import { locationQR } from "@/features/employee/location-qrScan/types/schema";
import { employeeHistorySchema } from "@/features/employee/trayContents/types/schema";
import { plantInfoSchema } from "@/features/employee/personal-info/types/schema";
import { employeeReviewSchema } from "@/features/employee/review/types/schema";
import { employeeSkillsSchema } from "@/features/employee/skills/types/schema";
import { z } from "zod";

const schema = plantInfoSchema
  .and(employeeSkillsSchema)
  .and(employeeHistorySchema)
  .and(employeeReviewSchema)
  .and(locationQR);

type Schema = z.infer<typeof schema>;

export { schema, type Schema };
