import { z } from "zod";

export const certificationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    provider: z.string().min(1, "Provider is required"),
    dateObtained: z.string().min(1, "Date is required"),
    // belajar dari bug repository/url kemarin — izinkan string kosong, jangan cuma .optional()
    certificateUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    image: z.instanceof(File).optional(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
