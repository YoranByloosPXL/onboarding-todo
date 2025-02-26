import { z } from 'zod'

export const todoCreateFormSchema = z.object({
  title: z.string().min(1),
  deadline: z.string().nullable(),
  description: z.string().min(1),
})

export type TodoCreateForm = z.infer<typeof todoCreateFormSchema>
