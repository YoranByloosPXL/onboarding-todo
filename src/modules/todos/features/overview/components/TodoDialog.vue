<script lang="ts" setup>
import {
  VcButton,
  VcDateField,
  VcDialog,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import AppDialogActionCancel from '@/components/app/dialog/AppDialogActionCancel.vue'
import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { toFormField } from '@/helpers/formango.helper'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useTodoCreateMutation } from '@/modules/todos/api/mutations/todoCreate.mutation'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import { useTodoUpdateMutation } from '@/modules/todos/api/mutations/todoUpdate.mutation'

const props = defineProps<{
  uuid?: TodoUuid
  todo?: {
    title: string
    deadline: string
    description: string
  }
}>()

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
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
      }
      else {
        await todoCreateMutation.execute({
          body: values,
        })
      }

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
      <AppDialogHeader
        :title="i18n.t(props.uuid ? 'module.todos.edit.dialog.title' : 'module.todos.create.new.dialog.title')"
        :description="i18n.t(props.uuid ? 'module.todos.edit.dialog.description' : 'module.todos.create.new.dialog.description')"
      />
      <div class="py-4">
        <AppForm :form="form">
          <VcTextField
            :label="i18n.t('module.todos.title')"
            v-bind="toFormField(title)"
          />
          <VcDateField
            :label="i18n.t('module.todos.deadline')"
            v-bind="toFormField(deadline)"
          />
          <VcTextField
            :label="i18n.t('module.todos.description')"
            v-bind="toFormField(description)"
          />
          <AppDialogActions>
            <AppDialogActionCancel
              :label="i18n.t('shared.cancel')"
              @click="onClose"
            />
            <VcButton
              v-if="props.uuid"
              variant="destructive-secondary"
              @click="onDelete"
            >
              {{ i18n.t('shared.delete') }}
            </VcButton>
            <FormSubmitButton
              :form="form"
              :label="i18n.t('shared.save')"
            />
          </AppDialogActions>
        </AppForm>
      </div>
    </AppDialogContent>
  </VcDialog>
</template>
