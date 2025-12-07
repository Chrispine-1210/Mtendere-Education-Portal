// --- schema ---
// server/src/modules/users/users.schema.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "student", "partner"]),
});

export type User = z.infer<typeof userSchema>;