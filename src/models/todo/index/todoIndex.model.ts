import type { TodoUuid } from '@/models/todo/todoUuid.model'

export interface TodoIndex {
  uuid: TodoUuid
  title: string
  createdAt: Date
  updatedAt: Date
  completed: boolean
  deadline: Date | null
  description: string
}
