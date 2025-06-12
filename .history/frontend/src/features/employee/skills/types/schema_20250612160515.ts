import { z } from "zod"

// Simplified schema: only proficiency levels
const schema = z.object({
  proficiencyLevels: z.object({
    projectManagement: z.string().min(1),
    communication:     z.string().min(1),
    technicalSkills:   z.string().min(1),
    leadership:        z.string().min(1),
    problemSolving:    z.string().min(1),
  }),
})

export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
  proficiencyLevels: {
    projectManagement: "",
    communication:     "",
    technicalSkills:   "",
    leadership:        "",
    problemSolving:    "",
  },
}

export { schema }
