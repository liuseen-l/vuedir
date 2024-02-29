import { defineDirective } from '@vuedir/shared'

export const vDebounce = defineDirective({
  beforeMount(el, binding) {
    let timer: NodeJS.Timeout
    const { time = 1000, callback, customCallback } = binding.value
    el.addEventListener('keyup', () => {
      if (timer)
        clearTimeout(timer)

      timer = setTimeout(async () => {
        if (customCallback) {
          const res = await customCallback()
          callback && callback(res)
        }
      }, time)
    })
  },
  beforeUnmount(_el) {
    _el = null
  },
})
