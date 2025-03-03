<script setup lang="ts">
import { computed } from 'vue'

import AppDashboardLayoutClassic from '@/components/layout/dashboard/AppDashboardLayoutClassic.vue'
import { usePreferences } from '@/composables/preference/preferences.composable.ts'
import type { UserDetail } from '@/models/user/detail/user.model.ts'
import { useAuthStore } from '@/stores/auth.store'

usePreferences()

const authStore = useAuthStore()

const authUser = computed<UserDetail | null>(() => authStore.authUser)
</script>

<template>
  <AppDashboardLayoutClassic v-if="authUser !== null" />
</template>
