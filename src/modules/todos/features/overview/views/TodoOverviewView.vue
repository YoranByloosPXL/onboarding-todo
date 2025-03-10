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

interface ApiError {
  message: string
  status: number
}

const i18n = useI18n()

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoCreateDialog.vue'),
})

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

function onAddButtonClick(): void {
  void dialog.open()
}
</script>

<template>
  <AppPage>
    <p v-if="isLoading">
      {{ i18n.t('module.todos.list.loading') }}
    </p>
    <AppErrorState
      v-else-if="error !== null"
      :error="error"
    />
    <TodoList
      v-if="!isLoading"
      :todo-list="todoIndexQuery.data.value?.data ?? []"
      :is-loading="isLoading"
      :error="error"
    />
    <div class="fixed bottom-5xl right-5xl">
      <VcIconButton
        icon="plus"
        label="Add todo button"
        @click="onAddButtonClick()"
      />
    </div>
  </AppPage>
</template>
