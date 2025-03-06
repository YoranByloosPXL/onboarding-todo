<script setup lang="ts">
import {
  VcDialogTitle,
} from '@wisemen/vue-core'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <VcDialogTitle>
      <h1 class="text-lg font-semibold text-primary">
        {{ props.title }}
      </h1>
    </VcDialogTitle>
  </div>
</template>
