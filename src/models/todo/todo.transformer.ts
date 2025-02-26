import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexDto } from '@/models/todo/index/todoIndexDto.model'

import type { TodoCreateDto } from './create/todoCreateDto.model'
import type { TodoCreateForm } from './create/todoCreateForm.model'
import type { TodoIndexFilters } from './index/todoIndexFilters.model'
import type { TodoIndexFiltersDto } from './index/todoIndexFiltersDto'

export class TodoTransformer {
  static fromDto(dto: TodoIndexDto): TodoIndex {
    return {
      uuid: dto.uuid,
      title: dto.title,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      completed: dto.completed,
      deadline: dto.deadline ? new Date(dto.deadline) : null,
      description: dto.description ?? '',
    }
  }
}

export class TodoIndexFiltersTransformer {
  static toDto(filters: TodoIndexFilters): TodoIndexFiltersDto {
    return filters
  }
}

export class TodoCreateTransformer {
  static toDto(form: TodoCreateForm): TodoCreateDto {
    return {
      title: form.title,
      deadline: form.deadline,
      description: form.description,
    }
  }
}
