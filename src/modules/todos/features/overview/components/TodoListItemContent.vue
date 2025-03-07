<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { DateFormatUtil } from '@/utils/date.util'

const props = defineProps<{
  todo: {
    deadline: Date | null
    description: string
  }
}>()

const i18n = useI18n()
</script>

<template>
  <div class="ml-4xl">
    <p class="text-sm text-gray-500">
      {{ props.todo.description }}
    </p>
    <div class="flex items-center text-sm text-gray-400">
      <VcIcon
        v-if="props.todo.deadline !== null"
        :label="i18n.t('module.todos.label.calender')"
        icon="dateFieldIconRight"
        class="w-2xl pr-sm"
        size="lg"
      />
      <span :class="{ 'text-red-500': !props.todo.deadline }">
        {{ props.todo.deadline ? DateFormatUtil.toLongDate(props.todo.deadline) : '' }}
      </span>
    </div>
  </div>
</template>
