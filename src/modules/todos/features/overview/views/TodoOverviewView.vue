<script lang="ts">
</script>

<template>
  <div />
</template>

<!-- <script lang="ts" setup>
import type { PaginationOptions } from '@wisemen/vue-core'
import { computed } from 'vue'

import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'
import TodoList from '@/modules/todos/features/overview/components/TodoList.vue'

const paginationOptions = computed<PaginationOptions<TodoIndexFilters>>(() => ({
  filters: {},
  page: 1,
  perPage: 10,
}))

const { isLoading, data } = useTodoIndexQuery(paginationOptions)
</script>

<template>
  <div>
    <TodoList
      :todo-list="data?.items ?? null"
      :is-loading="isLoading"
    />
  </div>
</template> -->
