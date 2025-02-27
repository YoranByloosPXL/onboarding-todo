import { z } from 'zod'

export const todoUpdateDtoSchema = z.object({
  title: z.string().min(1),
  deadline: z.string().nullable(),
  description: z.string().nullable(),
})

export type TodoUpdateDto = z.infer<typeof todoUpdateDtoSchema>
