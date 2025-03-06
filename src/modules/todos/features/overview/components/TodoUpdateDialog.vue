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
import { useI18n } from 'vue-i18n'

import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { toFormField } from '@/helpers/formango.helper'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import { useTodoUpdateMutation } from '@/modules/todos/api/mutations/todoUpdate.mutation'

import { todoUpdateFormSchema } from '../../../../../models/todo/update/todoUpdateForm.model'

const props = defineProps<{
  uuid: TodoUuid
  todoIndex: TodoIndex
}>()

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()
const todoUpdateMutation = useTodoUpdateMutation()
const todoDeleteMutation = useTodoDeleteMutation()

const form = useForm({
  initialState: {
    title: props.todoIndex.title,
    deadline: props.todoIndex.deadline,
    description: props.todoIndex.description,
  },
  schema: todoUpdateFormSchema,
  onSubmit: async (values) => {
    try {
      await todoUpdateMutation.execute({
        body: values,
        params: { todoUuid: props.uuid },
      })
      toast.success({
        durationInMs: 2500,
        message: i18n.t('module.todos.update.success'),
      })
      onClose()
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  },
})

const title = form.register('title')
const deadline = form.register('deadline')
const description = form.register('description')

function onClose(): void {
  emit('close')
}

async function onDelete(): Promise<void> {
  try {
    await todoDeleteMutation.execute({
      body: props.uuid,
    })
    toast.success({
      durationInMs: 2500,
      message: i18n.t('module.todos.delete.toast'),
    })
    onClose()
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}
</script>

<template>
  <VcDialog @close="onClose">
    <AppDialogContent class="w-dialog-sm">
      <h2 class="text-xl font-bold">
        {{ i18n.t('module.todo.edit.dialog.title') }}
      </h2>
      <div class="py-lg">
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
