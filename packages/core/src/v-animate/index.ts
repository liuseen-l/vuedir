import { defineDirective } from '@vuedir/shared'

function resolveClass(modifiers: string[]) {
  return modifiers.reduce((pre, cur) => `${pre} ` + `animate__${cur}`, 'animate__animated')
}

export const vAnimate = defineDirective({
  beforeMount(el, binding) {
    const { modifiers, value } = binding
    if (value)
      return el.className += ` ${value}`

    const keys = Object.keys(modifiers)

    if (keys.length === 0)
      return

    const classStr = resolveClass(keys)
    el.className += ` ${classStr}`
  },
})
