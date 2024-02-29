import { defineDirective } from '@vuedir/shared'

export const vDebounce = defineDirective({
  mounted(el, binding) {
    let timer: any
    const { time = 1000, callback, customCallback } = binding.value
    el.addEventListener('keyup', () => {
      if (timer)
        clearTimeout(timer)

      timer = setTimeout(() => {
        if (customCallback) {
          const res = customCallback()
          callback && callback(res)
        }
      }, time)
    })
  },
  // unmounted(el) {
  //   el = null
  // },
})
