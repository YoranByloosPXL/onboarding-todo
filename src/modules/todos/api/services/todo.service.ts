import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  createTodoControllerCreateTodoV1,
  deleteTodoControllerDeleteTodoV1,
  getTodosControllerGetTodosV1,
  updateTodoControllerUpdateTodoV1,
} from '@/client'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import {
  TodoCreateTransformer,
  TodoIndexFiltersTransformer,
  TodoTransformer,
} from '@/models/todo/todo.transformer'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class TodoService {
  static async create(todoForm: TodoCreateForm): Promise<void> {
    await createTodoControllerCreateTodoV1({
      body: TodoCreateTransformer.toDto(todoForm),
    })
  }

  static async delete(todoId: TodoUuid): Promise<void> {
    await deleteTodoControllerDeleteTodoV1({
      path: {
        todoUuid: todoId,
      },
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

  static async update(todoUuid: TodoUuid, todo: TodoUpdateForm): Promise<void> {
    await updateTodoControllerUpdateTodoV1({
      body: TodoTransformer.toDto(todo),
      path: {
        todoUuid,
      },
    })
  }
}
