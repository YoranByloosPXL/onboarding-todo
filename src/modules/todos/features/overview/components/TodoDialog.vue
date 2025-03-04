<script lang="ts" setup>
import {
  useToast,
  VcButton,
  VcDateField,
  VcDialog,
  VcTextarea,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { toFormField } from '@/helpers/formango.helper'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useTodoCreateMutation } from '@/modules/todos/api/mutations/todoCreate.mutation'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import { useTodoUpdateMutation } from '@/modules/todos/api/mutations/todoUpdate.mutation'

const props = defineProps<{
  uuid?: TodoUuid
  todoIndex?: TodoIndex
}>()

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()
const todoCreateMutation = useTodoCreateMutation()
const todoUpdateMutation = useTodoUpdateMutation()
const todoDeleteMutation = useTodoDeleteMutation()

const form = useForm({
  schema: todoCreateFormSchema,
  onSubmit: async (values) => {
    try {
      if (props.uuid) {
        await todoUpdateMutation.execute({
          body: values,
          params: { todoUuid: props.uuid },
        })
        toast.success({
          message: i18n.t('module.todos.create.success'),
        })
        onClose()
      }
      else {
        await todoCreateMutation.execute({
          body: values,
        })
        toast.success({
          message: i18n.t('module.todos.create.success'),
        })
        onClose()
      }
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  },
})

const dialogTitle = computed<string>(() => {
  return props.uuid
    ? i18n.t('module.todo.edit.dialog.title')
    : i18n.t('module.todos.create.new.dialog.title')
})
const title = form.register('title')
const deadline = form.register('deadline')
const description = form.register('description')

function onClose(): void {
  emit('close')
}

async function onDelete(): Promise<void> {
  if (props.uuid) {
    try {
      await todoDeleteMutation.execute({
        body: props.uuid,
      })
      onClose()
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  }
}
</script>

<template>
  <VcDialog @close="onClose">
    <AppDialogContent class="w-dialog-sm">
      <h1 class="text-xl font-bold">
        {{ dialogTitle }}
      </h1>
      <div class="py-4">
        <AppForm :form="form">
          <VcTextField
            :label="i18n.t('module.todos.title')"
            class="text-field-dialog pb-2xl"
            v-bind="toFormField(title)"
          />
          <VcTextarea
            :label="i18n.t('module.todos.description')"
            v-bind="toFormField(description)"
            class="textarea-dialog pb-2xl"
          />
          <VcDateField
            :label="i18n.t('module.todos.deadline')"
            class="text-field-dialog"
            v-bind="toFormField(deadline)"
          />
          <AppDialogActions class="flex justify-between">
            <VcButton
              v-if="props.uuid"
              class="button-delete flex-1 border-2 font-bold"
              @click="onDelete"
            >
              {{ i18n.t('shared.delete') }}
            </VcButton>
            <FormSubmitButton
              :form="form"
              :label="i18n.t('shared.save')"
              class="flex-1"
            />
          </AppDialogActions>
        </AppForm>
      </div>
    </AppDialogContent>
  </VcDialog>
</template>
