<script setup lang="ts">
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
      class="space-y-2"
    >
      <li
        v-for="todo in todoList"
        :key="todo.uuid"
        class="p-3 bg-white shadow rounded-lg border border-gray-200"
      >
        <h3 class="font-semibold text-lg">
          {{ todo.title }}
        </h3>
      </li>
    </ul>
  </div>
</template>
