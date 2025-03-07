import { defineStyleConfig } from '@wisemen/vue-core'

defineStyleConfig({
  colorScheme: '*',
  config: {
    '--checkbox-bg-color-checked': 'var(--bg-brand-solid)',
    '--checkbox-bg-color-default': 'var(--bg-brand-primary)',
    '--checkbox-bg-color-focus': 'var(--bg-brand-primary)',
    '--checkbox-bg-color-hover': 'var(--bg-brand-primary)',
    '--checkbox-border-color-checked': 'var(--bg-brand-solid)',
    '--checkbox-border-color-default': 'var(--bg-brand-secondary)',
  },
  theme: '*',
  variant: 'todo',
  component: 'checkbox',
})
