import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoUuid } from '@/models/todo/todoUuid.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'
import { TodoService } from '@/modules/todos/api/services/todo.service'

interface Params {
  todoUuid: TodoUuid
}

export function useTodoUpdateMutation(): UseMutationReturnType<TodoUpdateForm, void, Params> {
  return useMutation<TodoUpdateForm, void, Params>({
    queryFn: async ({ body, params }) => {
      await TodoService.update(params.todoUuid, body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
