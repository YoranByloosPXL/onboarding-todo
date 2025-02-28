<script setup lang="ts">
import { VcCheckbox, VcIcon } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'

const props = defineProps<{
  isLoading: boolean
  error: unknown | null
  todoList: TodoIndex[] | null
}>()

const hasTodos = computed<boolean>(() => props.todoList && props.todoList.length > 0)
const i18n = useI18n()

function formatDate(date: string | null): string {
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
      {{ i18n.t('todo.no_todo') }}
    </p>

    <ul
      v-else
      class="space-y-4"
    >
      <li
        v-for="todo in todoList"
        :key="todo.uuid"
        class="p-4 bg-white shadow rounded-lg border border-gray-200 flex items-center justify-between ml-100 mr-100 mt-5"
      >
        <div class="flex items-start gap-3">
          <!-- Checkbox voor status -->
          <VcCheckbox :checked="todo.status === 'done'" />

          <div>
            <h3 class="font-semibold text-lg">
              {{ todo.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ todo.description }}
            </p>

            <div class="flex items-center text-sm text-gray-400 mt-2">
              <VcIcon
                icon="calendar"
                class="mr-1"
              />
              <span :class="{ 'text-red-500': !todo.deadline }">
                {{ formatDate(todo.deadline) }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
