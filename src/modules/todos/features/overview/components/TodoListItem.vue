<script setup lang="ts">
import {
  useDialog,
  useToast,
  VcCheckbox,
  VcDropdownMenu,
  VcIconButton,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import TodoListItemContent from '@/modules/todos/features/overview/components/TodoListItemContent.vue'

const props = defineProps<{
  todo: TodoIndex
}>()

const toast = useToast()
const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const todoDeleteMutation = useTodoDeleteMutation()

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoUpdateDialog.vue'),
})

function onEditTodo(): void {
  void dialog.open({ uuid: props.todo.uuid, todoIndex: props.todo })
}

async function onDelete(): Promise<void> {
  try {
    await todoDeleteMutation.execute({
      body: props.todo.uuid,
    })
    toast.success({
      durationInMs: 2500,
      message: i18n.t('module.todos.delete.toast'),
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}
</script>

<template>
  <li class="p-lg bg-brand-primary-25 rounded-lg border border-brand-primary-25 flex items-start gap-lg w-full">
    <VcCheckbox
      :checked="props.todo.completed"
      class="checkbox-todo pt-xs"
    />
    <TodoListItemContent
      :todo="{
        title: props.todo.title,
        description: props.todo.description,
        deadline: props.todo.deadline,
      }"
    />
    <VcDropdownMenu
      :popover-offset-in-px="0"
      :is-arrow-hidden="true"
      :items="[
        {
          icon: 'edit',
          label: i18n.t('module.todos.label.edit'),
          type: 'option',
          onSelect: onEditTodo,
        },
        {
          type: 'separator',
        },
        {
          icon: 'trash',
          label: i18n.t('module.todos.label.delete'),
          type: 'option',
          onSelect: onDelete,
          isDestructive: true,
        },
      ]"
      popover-align="end"
    >
      <template #trigger>
        <VcIconButton
          :label="i18n.t('module.todos.label.dots')"
          icon="threeDots"
          class="bg-transparent border-transparent"
        />
      </template>
    </VcDropdownMenu>
  </li>
</template>
