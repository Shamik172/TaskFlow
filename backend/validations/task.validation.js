import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required"),

  description: z
    .string()
    .optional(),

  status: z
    .enum(["pending", "completed"])
    .optional(),
});
