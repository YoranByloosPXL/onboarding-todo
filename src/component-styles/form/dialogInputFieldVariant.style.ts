import { defineStyleConfig } from '@wisemen/vue-core'

defineStyleConfig({
  colorScheme: '*',
  config: {
    '--text-field-bg-color-default': 'var(--bg-brand-primary)',
    '--text-field-bg-color-error': 'var(--bg-brand-primary)',
    '--text-field-bg-color-focus': 'var(--bg-brand-primary)',
    '--text-field-bg-color-hover': 'var(--bg-brand-primary)',
    '--text-field-border-bottom-color-default': 'var(--bg-brand-primary)',
    '--text-field-border-left-color-default': 'var(--bg-brand-primary)',
    '--text-field-border-right-color-default': 'var(--bg-brand-primary)',
    '--text-field-border-top-color-default': 'var(--bg-brand-primary)',

  },
  theme: '*',
  variant: 'dialog',
  component: 'textField',
})
