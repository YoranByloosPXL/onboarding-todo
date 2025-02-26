<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { computed } from 'vue'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'
import TodoList from '@/modules/todos/features/overview/components/TodoList.vue'

const pagination = usePagination({
  isRouteQueryEnabled: true,
  key: 'todos',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<unknown>(() => todoIndexQuery.error.value)
</script>

<template>
  <div
    v-if="error !== null"
    class="flex size-full flex-1 items-center justify-center"
  >
    <AppErrorState :error="error" />
  </div>

  <div
    v-else
    class="flex flex-col gap-lg flex-1"
  >
    <TodoList
      :todo-list="todoIndexQuery.data.value ?? []"
      :is-loading="isLoading"
      :error="error"
    />
  </div>
</template>
