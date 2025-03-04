<script setup lang="ts">
import {
  useDialog,
  VcCheckbox,
  VcDropdownMenu,
  VcIcon,
  VcIconButton,
} from '@wisemen/vue-core'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import { DateFormatUtil } from '@/utils/date.util'

const props = defineProps<{
  todo: {
    uuid: string
    title: string
    completed: boolean
    deadline: Date | null
    description: string
  }
  todoIndex: TodoIndex
}>()

const apiErrorToast = useApiErrorToast()
const todoDeleteMutation = useTodoDeleteMutation()

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoDialog.vue'),
})

function onEditTodo(): void {
  void dialog.open({ uuid: props.todoIndex.uuid, todoIndex: props.todoIndex })
}

async function onDelete(): Promise<void> {
  try {
    await todoDeleteMutation.execute({
      body: props.todoIndex.uuid,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}
</script>

<template>
  <li class="p-lg bg-brand-primary-25 rounded-lg border border-brand-primary-25 flex justify-between w-full">
    <div class="flex items-start gap-lg">
      <VcCheckbox
        :checked="props.todo.completed"
        class="checkbox-todo"
      />
      <div>
        <h1 class="font-semibold text-lg">
          {{ props.todo.title }}
        </h1>
        <p class="text-sm text-gray-500">
          {{ props.todo.description }}
        </p>
        <div class="flex items-center text-sm text-gray-400">
          <VcIcon
            v-if="props.todo.deadline !== null"
            icon="dateFieldIconRight"
            class="w-2xl pr-sm"
            size="lg"
            label="Add todo button"
          />
          <span :class="{ 'text-red-500': !props.todo.deadline }">
            {{ props.todo.deadline ? DateFormatUtil.toLongDate(props.todo.deadline) : '' }}
          </span>
        </div>
      </div>
    </div>
    <VcDropdownMenu
      :popover-offset-in-px="0"
      :is-arrow-hidden="true"
      :items="[
        {
          icon: 'edit',
          label: 'Bewerk to do',
          type: 'option',
          onSelect: () => onEditTodo(),
        },
        {
          type: 'separator',
        },
        {
          icon: 'trash',
          label: 'Verwijder to do',
          type: 'option',
          onSelect: () => onDelete(),
          isDestructive: true,
        },
      ]"
      popover-align="end"
    >
      <template #trigger>
        <VcIconButton
          icon="threeDots"
          class="bg-transparent border-transparent"
          label="three dots"
        />
      </template>
    </VcDropdownMenu>
  </li>
</template>
