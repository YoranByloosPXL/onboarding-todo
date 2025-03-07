import { defineStyleConfig } from '@wisemen/vue-core'

defineStyleConfig({
  colorScheme: '*',
  config: {
    '--button-bg-color-active': 'var(--bg-primary)',
    '--button-bg-color-default': 'var(--bg-primary)',
    '--button-bg-color-hover': 'var(--bg-primary)',
    '--button-border-color-active': 'var(--text-error-primary)',
    '--button-border-color-default': 'var(--bg-brand-primary)',
    '--button-border-color-hover': 'var(--border-error)',
    '--button-text-color-default': 'var(--text-error-primary)',
    '--button-text-color-hover': 'var(--text-error-primary)',

  },
  theme: '*',
  variant: 'delete',
  component: 'button',
})
