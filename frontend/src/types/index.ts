import { z } from "zod";

export const taskStatusSchema = z.enum(["pending", "inProgress", "completed"]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
  title: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  userId: z.string(),
  createdAt: z.date()
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "title" | "description" | "status" >;
