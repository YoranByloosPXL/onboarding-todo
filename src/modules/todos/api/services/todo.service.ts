import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  createTodoControllerCreateTodoV1,
  getTodosControllerGetTodosV1,
} from '@/client'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import {
  TodoCreateTransformer,
  TodoIndexFiltersTransformer,
  TodoTransformer,
} from '@/models/todo/todo.transformer'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class TodoService {
  static async create(todoForm: TodoCreateForm): Promise<void> {
    await createTodoControllerCreateTodoV1({
      body: TodoCreateTransformer.toDto(todoForm),
    })
  }

  static async getAll(paginationOptions: PaginationOptions<TodoIndexFilters>): Promise<PaginatedData<TodoIndex>> {
    const response = await getTodosControllerGetTodosV1({
      query: new PaginationDtoBuilder(paginationOptions).build(TodoIndexFiltersTransformer.toDto),
    })

    return {
      data: response.data.items.map(TodoTransformer.fromDto),
      meta: response.data.meta,
    }
  }
}
