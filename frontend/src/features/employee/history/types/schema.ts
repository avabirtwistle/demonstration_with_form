import { ApiReasonForLeavingEnum } from "@/features/employee/history/types/apiTypes";
import { calculatePastDate } from "@/utils/calculatePastDate";
import { z } from "zod";

const ReasonForLeavingEnum = z.nativeEnum(ApiReasonForLeavingEnum);

const trayRegistrySchema = z.object({
  qrCode: z.string().min(1),
});

const educationalInstitutionsSchema = z.object({
  institutionName: z.string().min(1),
  degree: z.string().min(1),
  fieldOfStudy: z.string().min(1),
  graduationYear: z.coerce.date().max(new Date()).min(calculatePastDate(100)),
});

const schema = z
  .object({
    currentEmploymentStatus: z.string().min(1),
    reasonsForLeavingPreviousJobs: z.array(ReasonForLeavingEnum).min(1),
    otherReasonsForLeaving: z.string().optional(),
    highestDegreeObtained: z.string().min(1),
    trayRegistry: z.array(trayRegistrySchema).min(1),
    educationalInstitutions: z.array(educationalInstitutionsSchema).min(1),
  })
  .superRefine((data, ctx) => {
    const hasOtherReasonsForLeavingPreviousJobs =
      data.reasonsForLeavingPreviousJobs.includes(
        ReasonForLeavingEnum.enum.OTHER
      );

    if (hasOtherReasonsForLeavingPreviousJobs && !data.otherReasonsForLeaving) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["otherReasonsForLeaving"],
      });
    }
  });

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  currentEmploymentStatus: "",
  educationalInstitutions: [],
  highestDegreeObtained: "",
  trayRegistry: [],
  reasonsForLeavingPreviousJobs: [],
  otherReasonsForLeaving: "",
};

export {
  defaultValues,
  ReasonForLeavingEnum,
  schema,
  schema as employeeHistorySchema,
  type Schema,
};
