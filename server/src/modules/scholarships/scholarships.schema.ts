// --- schema ---
// server/src/modules/scholarships/scholarships.schema.ts
import { z } from "zod";

export const scholarshipSchema = z.object({
    title: z.string(),
    description: z.string(),
    deadline: z.string(),
    amount: z.number(),
});

export type Scholarship = z.infer<typeof scholarshipSchema>;