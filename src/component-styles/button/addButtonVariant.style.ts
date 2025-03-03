import { defineStyleConfig } from '@wisemen/vue-core'

defineStyleConfig({
  colorScheme: '*',
  config: {
    '--icon-button-bg-color-active': '#475161',
    '--icon-button-bg-color-default': '#475161',
    '--icon-button-bg-color-hover': '#596373',
    '--icon-button-border-color-active': '#475161',
    '--icon-button-border-color-default': '#475161',
    '--icon-button-border-color-hover': '#596373',
  },
  theme: '*',
  variant: 'add',
  component: 'button',
})
