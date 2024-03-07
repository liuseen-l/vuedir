import { defineDirective, setAttribute } from '@vuedir/shared'

export const vValidate = defineDirective({
  beforeMount(el, binding) {
    const { modifiers: { number } } = binding
    if (number)
      setAttribute(el, 'type', 'number')
  },
})
