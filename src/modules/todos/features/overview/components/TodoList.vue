<script setup lang="ts">
import {
  useDialog,
  VcButton,
  VcCheckbox,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import TodoListItem from '@/modules/todos/features/overview/components/TodoListItem.vue'

const props = defineProps<{
  isLoading: boolean
  todoList: TodoIndex[] | null
}>()

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoDialog.vue'),
})

function onEditTodo(todo: TodoIndex): void {
  const formattedTodo = {
    ...todo,
    deadline: formatDate(todo.deadline),
  }

  void dialog.open({ uuid: todo.uuid, todo: formattedTodo })
}

const hasTodos = computed<boolean>(() => props.todoList !== null && props.todoList.length > 0)
const i18n = useI18n()

function formatDate(date: Date | null): string {
  if (!date) {
    return ''
  }

  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <p
    v-if="hasTodos === false"
    class="m-lg text-center text-gray-500"
  >
    {{ i18n.t('module.todos.not_found') }}
  </p>

  <ul
    v-else
    class="space-y-4"
  >
    <TodoListItem
      v-for="todo in todoList"
      :key="todo.uuid"
      :todo="todo"
    />
  </ul>
</template>
