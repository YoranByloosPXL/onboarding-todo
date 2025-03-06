<script setup lang="ts">
import { VcIconButton } from '@wisemen/vue-core'

import AppContainer from '@/components/layout/AppContainer.vue'
import { usePreferences } from '@/composables/preference/preferences.composable.ts'
import { useAuthStore } from '@/stores/auth.store'

usePreferences()

const authStore = useAuthStore()

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}
</script>

<template>
  <main class="w-full">
    <header class="bg-brand-primary z-10 sticky top-0">
      <AppContainer class="w-full">
        <VcIconButton
          class="bg-transparent border-transparent ml-auto"
          icon="logout"
          label="Logout"
          @click="onSignOut()"
        />
      </AppContainer>
    </header>

    <AppContainer>
      <div class="w-120 mx-auto">
        <slot />
      </div>
    </AppContainer>
  </main>
</template>
