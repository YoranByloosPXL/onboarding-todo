import { z } from 'zod'

export const todoCreateDtoSchema = z.object({
  title: z.string().min(1),
  deadline: z.date().nullable(),
  description: z.string().min(1),
})

export type TodoCreateDto = z.infer<typeof todoCreateDtoSchema>
