import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  createTodoControllerCreateTodoV1,
  getTodosControllerGetTodosV1,
} from '@/client'
import type { TodoCreateDto } from '@/models/todo/create/todoCreateDto.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import {
  TodoIndexFiltersTransformer,
  TodoTransformer,
} from '@/models/todo/todo.transformer'
import { ObjectUtil } from '@/utils/object.util.ts'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class TodoService {
  static async create(todoDto: TodoCreateDto): Promise<void> {
    await createTodoControllerCreateTodoV1({
      body: todoDto,
    })
  }

  static async getAll(paginationOptions: PaginationOptions<TodoIndexFilters>): Promise<PaginatedData<TodoIndex>> {
    const response = await getTodosControllerGetTodosV1({
      query: new PaginationDtoBuilder(paginationOptions).build(TodoIndexFiltersTransformer.toDto),
      querySerializer: ObjectUtil.serialize,
    })

    return {
      data: response.data.items.map(TodoTransformer.fromDto),
      meta: response.data.meta,
    }
  }
}
