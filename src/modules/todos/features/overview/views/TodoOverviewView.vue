<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'
import TodoList from '@/modules/todos/features/overview/components/TodoList.vue'

interface ApiError {
  message: string
  status: number
}

const pagination = usePagination({
  isRouteQueryEnabled: true,
  key: 'todos',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<ApiError | null>(() => {
  const err = todoIndexQuery.error.value

  if (err !== null && err instanceof Error && 'message' in err && 'status' in err) {
    return {
      message: err.message as string,
      status: (err as any).status as number,
    }
  }

  return null
})

const i18n = useI18n()
</script>

<template>
  <AppPage :title="i18n.t('todo.page.title')">
    <p v-if="isLoading">
      {{ i18n.t('todo.list.loading') }}
    </p>
    <AppErrorState
      v-else-if="error !== null"
      :error="error"
    />
    <div
      v-else
      class="flex flex-col gap-lg flex-1"
    >
      <TodoList
        :todo-list="todoIndexQuery.data.value?.data ?? []"
        :is-loading="isLoading"
        :error="error"
      />
    </div>
  </AppPage>
</template>
