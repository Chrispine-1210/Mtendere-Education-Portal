// --- schema ---
// server/src/modules/jobs/jobs.schema.ts
import { z } from "zod";

export const jobSchema = z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    type: z.enum(["full-time", "part-time", "internship"]),
    description: z.string(),
});

export type Job = z.infer<typeof jobSchema>;


