<script setup lang="ts">
import {
  VcIcon,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcToggle,
  VcTooltip,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const isCollapsed = defineModel<boolean>({
  required: true,
})

const i18n = useI18n()

const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()

const toggleBtnLabel = computed<string>(() => {
  if (isCollapsed.value) {
    return i18n.t('component.sidebar.open_sidebar')
  }

  return i18n.t('component.sidebar.close_sidebar')
})
</script>

<template>
  <div class="absolute right-0 top-4">
    <VcKeyboardShortcutProvider
      v-slot="{ keys }"
      :config="{
        keys: ['c'],
      }"
    >
      <VcTooltip
        :is-arrow-hidden="true"
        :delay-duration="500"
        side="right"
      >
        <template #trigger>
          <VcToggle v-model="isCollapsed">
            <button
              :aria-label="toggleBtnLabel"
              class="flex h-10 w-5 translate-x-1/2 items-center justify-center rounded-2xl border border-solid border-secondary bg-secondary text-fg-disabled opacity-0 outline-none ring-fg-tertiary ring-offset-1 duration-300 focus-visible:opacity-100 focus-visible:ring-2 group-hover/sidebar:opacity-100"
            >
              <VcIcon
                :class="{
                  'rotate-180': isCollapsed,
                }"
                class="duration-300"
                icon="chevronLeft"
              />
            </button>
          </VcToggle>
        </template>

        <template #content>
          <div class="flex items-center gap-x-md px-md py-sm">
            <span class="text-xs text-white">
              {{ toggleBtnLabel }}
            </span>

            <VcKeyboardShortcut
              v-if="isKeyboardShortcutHintVisible"
              :keyboard-keys="keys"
              keyboard-classes="bg-white/10 text-white"
            />
          </div>
        </template>
      </VcTooltip>
    </VcKeyboardShortcutProvider>
  </div>
</template>
