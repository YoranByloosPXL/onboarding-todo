<script setup lang="ts">
import { VcCheckbox } from '@wisemen/vue-core'

import { DateFormatUtil } from '@/utils/date.util'

defineProps<{
  todo: {
    uuid: string
    title: string
    completed: boolean
    deadline: Date | null
    description: string
  }
}>()
</script>

<template>
  <li class="p-lg m-md bg-white shadow rounded-lg border border-gray-200 flex items-center justify-between mt-5">
    <div class="flex items-start gap-3">
      <VcCheckbox :checked="todo.completed" />
      <div>
        <h1 class="font-semibold text-lg">
          {{ todo.title }}
        </h1>
        <p class="text-sm text-gray-500">
          {{ todo.description }}
        </p>

        <div class="flex items-center text-sm text-gray-400 mt-2">
          <span :class="{ 'text-red-500': !todo.deadline }">
            {{ todo.deadline ? DateFormatUtil.toLongDate(todo.deadline) : '' }}
          </span>
        </div>
      </div>
    </div>
  </li>
</template>
