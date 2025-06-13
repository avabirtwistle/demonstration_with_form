import { z } from "zod";

/**
 * Schema for only the proficiencyLevels section.
 */
const schema = z.object({
  proficiencyLevels: z.object({
    projectManagement: z.string().min(1),
    communication:     z.string().min(1),
    technicalSkills:   z.string().min(1),
  }),
});

/**
 * Type inferred from the Zod schema.
 */
export type Schema = z.infer<typeof schema>;

/**
 * Default values for the form, matching the schema structure.
 */
export const defaultValues: Schema = {
  proficiencyLevels: {
    projectManagement: "",
    communication:     "",
    technicalSkills:   "",
  },
};

export { schema };
