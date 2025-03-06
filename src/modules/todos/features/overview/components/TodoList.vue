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
  <h1 class="text-xl font-bold mb-3xl">
    {{ i18n.t('module.todos.page.title') }}
  </h1>
  <p
    v-if="hasTodos === false"
    class="text-gray-500"
  >
    {{ i18n.t('module.todos.not_found') }}
  </p>

  <ul
    v-else
    class="w-full flex flex-col space-y-2"
  >
    <TodoListItem
      v-for="todo in todoList"
      :key="todo.uuid"
      :todo-index="todo"
      :todo="todo"
    />
  </ul>
</template>
