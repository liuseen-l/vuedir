import { defineDirective } from '@vuedir/shared'
import type { DebounceCUserConfig } from './type'

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

export function useVDebounce(config: DebounceCUserConfig = {}) {
  const { time = 1000 } = config
  let timer: any
  const fn = (binding: any) => {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      binding.value()
    }, time)
  }
  return defineDirective({
    mounted(el) {
      el.addEventListener('keyup', fn)
    },
    unmounted(el) {
      el.removeEventListener('keyup', fn)
    },
  })
}
