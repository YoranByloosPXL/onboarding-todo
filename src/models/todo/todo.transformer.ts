import type { TodoCreateDto } from '@/models/todo/create/todoCreateDto.model'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexDto } from '@/models/todo/index/todoIndexDto.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import type { TodoIndexFiltersDto } from '@/models/todo/index/todoIndexFiltersDto'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'
import type { TodoUpdateDto } from '@/models/todo/update/todoUpdateModel.model'

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export class TodoTransformer {
  static fromDto(dto: TodoIndexDto): TodoIndex {
    return {
      uuid: dto.uuid as TodoUuid,
      title: dto.title,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      completed: dto.completed,
      deadline: dto.deadline ? new Date(dto.deadline) : null,
      description: dto.description ?? '',
    }
  }

  static toDto(todo: TodoUpdateForm): TodoUpdateDto {
    return {
      title: todo.title,
      deadline: todo.deadline ? formatDateToYYYYMMDD(todo.deadline) : null,
      description: todo.description,
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
      deadline: form.deadline ? formatDateToYYYYMMDD(form.deadline) : null,
      description: form.description,
    }
  }
}
