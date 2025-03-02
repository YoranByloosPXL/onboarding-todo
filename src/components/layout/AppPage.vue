<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { VcBreadcrumbs } from '@wisemen/vue-core'
import { computed, useSlots } from 'vue'

import AppContainer from '@/components/layout/AppContainer.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[]
  }>(),
  {
    breadcrumbs: () => [],
  },
)

const slots = useSlots()

const hasTabsSlot = computed<boolean>(() => slots.tabs !== undefined)
</script>

<template>
  <main class="flex w-full flex-1 flex-col">
    <header class="bg-primary z-10 sticky top-0">
      <AppContainer
        :class="[
          hasTabsSlot ? 'pt-xl pb-0' : 'py-xl',
        ]"
      >
        <VcBreadcrumbs
          v-if="props.breadcrumbs.length > 0"
          :items="props.breadcrumbs"
          class="-ml-xxs"
        />
        <div class="flex min-h-10 items-center justify-between">
          <h1
            :data-test-id="TEST_ID.APP_PAGE.TITLE"
            class="text-display-xs font-semibold text-primary"
          >
            {{ props.title }}
          </h1>

          <div
            id="header-actions"
            class="flex items-center justify-end gap-xl"
          >
            <slot name="header-actions" />
          </div>
        </div>

        <div
          v-if="hasTabsSlot"
          class="mt-xl"
        >
          <slot name="tabs" />
        </div>
      </AppContainer>
    </header>

    <AppContainer class="flex flex-1 flex-col overflow-hidden pb-4xl pt-4xl">
      <slot />
    </AppContainer>
  </main>
</template>
