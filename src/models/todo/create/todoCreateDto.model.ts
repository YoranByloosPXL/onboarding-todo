import { z } from 'zod'

export const todoCreateDtoSchema = z.object({
  title: z.string().min(1),
  deadline: z.string().nullable(),
  description: z.string().nullable(),
})

export type TodoCreateDto = z.infer<typeof todoCreateDtoSchema>
