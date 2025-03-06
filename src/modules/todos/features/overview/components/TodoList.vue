<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import TodoListItem from '@/modules/todos/features/overview/components/TodoListItem.vue'

const props = defineProps<{
  isLoading: boolean
  todoList: TodoIndex[] | null
}>()

const i18n = useI18n()

const hasTodos = computed<boolean>(() => props.todoList !== null && props.todoList.length > 0)
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
