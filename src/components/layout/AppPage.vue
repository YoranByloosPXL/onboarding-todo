<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { VcBreadcrumbs, VcIconButton } from '@wisemen/vue-core'
import { computed, useSlots } from 'vue'

import AppContainer from '@/components/layout/AppContainer.vue'
import { usePreferences } from '@/composables/preference/preferences.composable.ts'
import { useAuthStore } from '@/stores/auth.store'

const props = withDefaults(
  defineProps<{
    title?: string
    breadcrumbs?: BreadcrumbItem[]
  }>(),
  {
    breadcrumbs: () => [],
  },
)

usePreferences()

const authStore = useAuthStore()
const slots = useSlots()
const hasTabsSlot = computed<boolean>(() => slots.tabs !== undefined)

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}
</script>

<template>
  <main class="flex w-full flex-1 flex-col">
    <header class="bg-brand-primary z-10 sticky top-0">
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
        <div class="flex min-h-6 items-center justify-between">
          <span />
          <VcIconButton
            class="bg-transparent border-transparent"
            icon="logout"
            label="Logout"
            @click="onSignOut()"
          />
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
