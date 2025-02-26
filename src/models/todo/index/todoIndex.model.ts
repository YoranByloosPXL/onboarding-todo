import { z } from 'zod'

export const todoIndexSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completed: z.boolean(),
  deadline: z.date().nullable(),
  description: z.string(),
})

export type TodoIndex = z.infer<typeof todoIndexSchema>
