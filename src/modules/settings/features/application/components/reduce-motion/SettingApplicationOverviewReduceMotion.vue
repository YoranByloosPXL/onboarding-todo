<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { usePreferences } from '@/composables/preference/preferences.composable.ts'
import { useReduceMotionValue } from '@/composables/reduce-motion/reduceMotion.composable'

const i18n = useI18n()
const reduceMotionValue = useReduceMotionValue()
const preferences = usePreferences()
const label = computed<string>(() => {
  if (reduceMotionValue.value) {
    return i18n.t('module.setting.reduce_motion.enabled.label')
  }

  return i18n.t('module.setting.reduce_motion.disabled.label')
})

const description = computed<string>(() => {
  if (reduceMotionValue.value) {
    return i18n.t('module.setting.reduce_motion.enabled.description')
  }

  return i18n.t('module.setting.reduce_motion.disabled.description')
})

function onUpdateModelValue(newValue: boolean): void {
  preferences.update({
    reduceMotion: newValue,
  })
}
</script>

<template>
  <FormFieldset
    :title="i18n.t('module.setting.reduce_motion.title')"
    :description="i18n.t('module.setting.reduce_motion.description')"
  >
    <VcSwitch
      id="reduce-motion"
      v-model="reduceMotionValue"
      :label="label"
      :hint="description"
      @update:model-value="onUpdateModelValue"
    />
  </FormFieldset>
</template>
