import { z } from "zod";
import { ApiCoreCompetencyEnum } from "@/features/employee/skills/types/apiTypes";
import { wait } from "@/utils/wait";
/**
 * Native Zod enum for core competencies (unused here but exported for consistency)
 */
const CoreCompetencyEnum = z.nativeEnum(ApiCoreCompetencyEnum);

/**
 * Zod schema for the proficiencyLevels section only.
 */
const schema = z.object({
  proficiencyLevels: z.object({
    projectManagement: z.string().min(1),
    communication:     z.string().min(1),
    technicalSkills:   z.string().min(1),
  }),
});

/**
 * Inferred TypeScript type for the schema.
 */
type Schema = z.infer<typeof schema>;

/**
 * Default values matching the schema structure.
 */
const defaultValues: Schema = {
  proficiencyLevels: {
    projectManagement: "me",
    communication:     "",
    technicalSkills:   "",
  },
};

export {
  defaultValues,
  schema,
  schema as employeeSkillsSchema,
  type Schema,
  CoreCompetencyEnum,
};
