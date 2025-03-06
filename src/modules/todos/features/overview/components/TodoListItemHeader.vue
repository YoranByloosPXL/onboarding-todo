<script setup lang="ts">
import {
  VcCheckbox,
  VcDropdownMenu,
  VcIconButton,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  todo: {
    uuid: string
    title: string
    completed: boolean
  }
}>()

const emit = defineEmits<{
  (event: 'delete'): void
  (event: 'edit'): void
}>()

const i18n = useI18n()

function onEdit(): void {
  emit('edit')
}

function onDelete(): void {
  emit('delete')
}
</script>

<template>
  <div class="flex items-start gap-lg w-full">
    <VcCheckbox
      :checked="props.todo.completed"
      class="checkbox-todo"
    />
    <h1 class="font-semibold text-lg flex-grow">
      {{ props.todo.title }}
    </h1>
    <VcDropdownMenu
      :popover-offset-in-px="0"
      :is-arrow-hidden="true"
      :items="[
        {
          icon: 'edit',
          label: i18n.t('module.todos.label.edit'),
          type: 'option',
          onSelect: onEdit,
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
  </div>
</template>
