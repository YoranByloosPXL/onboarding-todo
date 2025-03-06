<script setup lang="ts">
import {
  useDialog,
  useToast,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import TodoListItemContent from '@/modules/todos/features/overview/components/TodoListItemContent.vue'
import TodoListItemHeader from '@/modules/todos/features/overview/components/TodoListItemHeader.vue'

const props = defineProps<{
  todo: TodoIndex
}>()

const apiErrorToast = useApiErrorToast()
const todoDeleteMutation = useTodoDeleteMutation()
const toast = useToast()
const i18n = useI18n()

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoUpdateDialog.vue'),
})

function onEditTodo(): void {
  void dialog.open({ uuid: props.todo.uuid, todoIndex: props.todo })
}

async function onDelete(): Promise<void> {
  try {
    await todoDeleteMutation.execute({
      body: props.todo.uuid,
    })
    toast.success({
      durationInMs: 2500,
      message: i18n.t('module.todos.delete.toast'),
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}
</script>

<template>
  <li class="p-lg bg-brand-primary-25 rounded-lg flex flex-col w-full">
    <TodoListItemHeader
      :todo="{
        uuid: props.todo.uuid,
        completed: props.todo.completed,
        title: props.todo.title,
      }"
      @edit="onEditTodo"
      @delete="onDelete"
    />
    <TodoListItemContent
      :todo="{
        description: props.todo.description,
        deadline: props.todo.deadline,
      }"
    />
  </li>
</template>
