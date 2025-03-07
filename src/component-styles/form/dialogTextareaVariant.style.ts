import { defineStyleConfig } from '@wisemen/vue-core'

defineStyleConfig({
  colorScheme: '*',
  config: {
    '--textarea-bg-color-default': 'var(--bg-brand-primary)',
    '--textarea-bg-color-error': 'var(--bg-brand-primary)',
    '--textarea-bg-color-focus': 'var(--bg-brand-primary)',
    '--textarea-bg-color-hover': 'var(--bg-brand-primary)',
    '--textarea-border-bottom-color-default': 'var(--bg-brand-primary)',
    '--textarea-border-left-color-default': 'var(--bg-brand-primary)',
    '--textarea-border-right-color-default': 'var(--bg-brand-primary)',
    '--textarea-border-top-color-default': 'var(--bg-brand-primary)',

  },
  theme: '*',
  variant: 'dialog',
  component: 'textarea',
})
