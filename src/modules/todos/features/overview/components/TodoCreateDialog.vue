<script lang="ts" setup>
import {
  useToast,
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
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import { useTodoCreateMutation } from '@/modules/todos/api/mutations/todoCreate.mutation'

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()
const todoCreateMutation = useTodoCreateMutation()

const form = useForm({
  schema: todoCreateFormSchema,
  onSubmit: async (values) => {
    try {
      await todoCreateMutation.execute({
        body: values,
      })
      toast.success({
        durationInMs: 2500,
        message: i18n.t('module.todos.create.success'),
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
</script>

<template>
  <VcDialog @close="onClose">
    <AppDialogContent class="w-dialog-sm">
      <h2 class="text-xl font-bold">
        {{ i18n.t('module.todos.create.new.dialog.title') }}
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
          <AppDialogActions>
            <FormSubmitButton
              :form="form"
              :label="i18n.t('shared.save')"
              class="w-full"
            />
          </AppDialogActions>
        </AppForm>
      </div>
    </AppDialogContent>
  </VcDialog>
</template>
