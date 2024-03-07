import { defineDirective } from '@vuedir/shared'

function setAttribute(el: HTMLElement, atr: string, value: any) {
  if (atr === 'type')
    setAttribute(el, 'type', value)
}

export const vValidate = defineDirective({
  beforeMount(el, binding) {
    const { modifiers: { number } } = binding
    if (number)
      setAttribute(el, 'type', 'number')
  },
})
