import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.array(z.string()).min(1, "Category is required"),
    technologies: z.array(z.string()).min(1, "Technologies is required"),
    url: z.string().url().optional().or(z.literal("")),
    repository: z.string().url().optional().or(z.literal("")),
    image: z
        .any()
        .optional()
        .refine((file) => !file || file instanceof File, "Invalid image file"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
