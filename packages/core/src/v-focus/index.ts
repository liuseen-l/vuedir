import { defineDirective } from '@vuedir/shared'

export const vFocus = defineDirective({
  mounted(el, binding) {
    const { time, callback } = binding.value
    if (time) {
      const timer = setTimeout(() => {
        el.focus()
        callback(el)
        clearTimeout(timer)
      }, time)
      return
    }
    el.focus()
    callback(el)
  },
})
