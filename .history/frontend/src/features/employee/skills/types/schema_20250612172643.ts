import { z } from "zod";

/**
 * Zod schema for the proficiencyLevels section only.
 */
export const schema = z.object({
  proficiencyLevels: z.object({
    projectManagement: z.string().min(1),
    communication:     z.string().min(1),
    technicalSkills:   z.string().min(1),
  }),
});

/**
 * Inferred TypeScript type for the schema.
 */
export type Schema = z.infer<typeof schema>;

/**
 * Default values matching the schema structure.
 */
export const defaultValues: Schema = {
  proficiencyLevels: {
    projectManagement: "",
    communication:     "",
    technicalSkills:   "",
  },
};
