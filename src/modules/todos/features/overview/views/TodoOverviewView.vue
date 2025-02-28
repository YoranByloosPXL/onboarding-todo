<script setup lang="ts">
import {
  useDialog,
  usePagination,
  VcIconButton,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'
import TodoList from '@/modules/todos/features/overview/components/TodoList.vue'

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoCreateDialog.vue'),
})

function onAddButtonClick(): void {
  void dialog.open({})
}

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
  <AppPage :title="i18n.t('module.todos.page.title')">
    <p v-if="isLoading">
      {{ i18n.t('module.todos.list.loading') }}
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
    <div class="fixed bottom-6 right-6">
      <VcIconButton
        class="bg-gray-600 border-gray-600"
        icon="plus"
        label="Add todo button"
        @click="onAddButtonClick()"
      />
    </div>
  </AppPage>
</template>
