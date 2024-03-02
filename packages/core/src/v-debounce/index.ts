import { defineDirective } from '@vuedir/shared'

const deps = new WeakMap()

function genEventCallBack(el: any, binding: any) {
  let timer: NodeJS.Timeout | undefined
  const { time = 1000, callback, customCallback } = binding.value

  const fn = () => {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(async () => {
      if (customCallback) {
        const res = await customCallback()
        callback && callback(el, res)
        clearTimeout(timer)
      }
    }, time)
  }

  return {
    fn,
    timer,
  }
}

function shouldUpdate(value: any, oldValue: any) {
  return value === oldValue
}

function addEventListener(el: any, binding: any, type: string) {
  const obj = genEventCallBack(el, binding)
  el.addEventListener(type, obj.fn)
  deps.set(el, obj)
}

function removeEventListener(el: any, type: string) {
  const { fn, timer } = deps.get(el)
  el.removeEventListener(type, fn)
  timer && clearTimeout(timer)
}

export const vDebounce = defineDirective({
  beforeMount(el, binding) {
    addEventListener(el, binding, 'keyup')
  },
  beforeUpdate(el, binding) {
    const { oldValue, value } = binding
    if (shouldUpdate(value, oldValue)) {
      removeEventListener(el, 'keyup')
      addEventListener(el, binding, 'keyup')
    }
  },
  beforeUnmount(el) {
    removeEventListener(el, 'keyup')
  },
})
