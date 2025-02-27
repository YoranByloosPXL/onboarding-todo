<script setup lang="ts">
import {
  useDialog,
  VcButton,
  VcCheckbox,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'

const props = defineProps<{
  isLoading: boolean
  error: unknown | null
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
  <div>
    <div
      v-if="error !== null"
      class="flex size-full flex-1 items-center justify-center"
    >
      <AppErrorState :error="error" />
    </div>

    <p
      v-else-if="!hasTodos"
      class="text-center text-gray-500"
    >
      {{ i18n.t('todo.notodo') }}
    </p>
    <ul
      v-else
      class="space-y-4"
    >
      <h1 class="text-xl font-bold text-gray-900 mb-6 ml-100 mt-10">
        {{ i18n.t('todo.list.title') }}
      </h1>
      <li
        v-for="todo in todoList"
        :key="todo.uuid"
        class="bg-blue p-4 shadow rounded-lg border border-gray-200 flex items-center justify-between ml-100 mr-100 mb-5"
      >
        <div class="flex items-start gap-3">
          <VcCheckbox :checked="todo.completed" />

          <div>
            <h3 class="font-semibold text-lg">
              {{ todo.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ todo.description }}
            </p>

            <div class="flex items-center text-sm text-gray-400 mt-2">
              <span :class="{ 'text-red-500': !todo.deadline }">
                {{ formatDate(todo.deadline) }}
              </span>
            </div>
          </div>
        </div>
        <VcButton
          variant="secondary"
          icon="edit"
          @click="onEditTodo(todo)"
        >
          {{ i18n.t('todo.edit') }}
        </VcButton>
      </li>
    </ul>
  </div>
</template>
