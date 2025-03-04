import { defineStyleConfig } from '@wisemen/vue-core'

defineStyleConfig({
  colorScheme: '*',
  config: {
    '--icon-button-bg-color-active': 'var(--bg-brand-solid)',
    '--icon-button-bg-color-default': 'var(--bg-brand-solid)',
    '--icon-button-bg-color-hover': 'var(--bg-brand-solid-hover)',
    '--icon-button-border-color-active': 'var(--bg-brand-solid)1',
    '--icon-button-border-color-default': 'var(--bg-brand-solid)',
    '--icon-button-border-color-hover': 'var(--bg-brand-solid-hover)',
  },
  theme: '*',
  variant: 'add',
  component: 'button',
})
