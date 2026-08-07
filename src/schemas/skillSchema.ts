import { z } from "zod";

export const skillSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    level: z.enum(["beginner", "intermediate", "advanced", "expert"]).default("beginner"),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
