<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'

const props = defineProps<{
  isLoading: boolean
  todoList: TodoIndex[] | null
}>()

const hasTodos = computed<boolean>(() => props.todoList !== null && props.todoList.length > 0)

const i18n = useI18n()
</script>

<template>
  <p
    v-if="!hasTodos"
    class="m-lg text-center text-gray-500"
  >
    {{ i18n.t('todo.no_todo') }}
  </p>

  <ul
    v-else
    class="space-y-2"
  >
    <li
      v-for="todo in todoList"
      :key="todo.uuid"
      class="p-lg m-xl bg-white shadow rounded-lg border border-gray-200"
    >
      <h1 class="font-semibold text-lg">
        {{ todo.title }}
      </h1>
    </li>
  </ul>
</template>
