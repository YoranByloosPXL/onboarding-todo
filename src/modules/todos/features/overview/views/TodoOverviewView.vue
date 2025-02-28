<script setup lang="ts">
import {
  useDialog,
  usePagination,
  VcButton,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'
import TodoList from '@/modules/todos/features/overview/components/TodoList.vue'

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoCreateDialog.vue'),
})

function onButtonClick(): void {
  void dialog.open({})
}

const pagination = usePagination({
  isRouteQueryEnabled: true,
  key: 'todos',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<unknown>(() => todoIndexQuery.error.value)

const i18n = useI18n()
</script>

<template>
  <div class="relative flex flex-col gap-lg flex-1">
    <div
      v-if="error !== null"
      class="flex size-full flex-1 items-center justify-center"
    >
      <AppErrorState :error="error" />
    </div>

    <div
      v-else
      class="flex flex-col gap-lg flex-1">
      <TodoList
        v-if="!isLoading"
        :todo-list="todoIndexQuery.data.value?.data ?? []"
        :is-loading="isLoading"
        :error="error"
      />
    </div>

    <!-- Nieuwe Todo Knop (Rechts onder) -->
    <div class="fixed bottom-6 right-6">
      <VcButton
        class="shadow-lg border-r-2"
        @click="onButtonClick()"
      >
        {{ i18n.t("todo.new_todo") }}
      </VcButton>
    </div>
  </div>
</template>
