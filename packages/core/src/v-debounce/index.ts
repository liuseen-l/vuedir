import { defineDirective } from '@vuedir/shared'
import type { DirectiveBinding } from 'vue'

const deps = new Map()

function genEventCallBack(_el: HTMLElement, binding: DirectiveBinding) {
  let timer: NodeJS.Timeout | undefined
  const { time = 1000, customCallback } = binding.value

  const fn = () => {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      customCallback && customCallback()
      clearTimeout(timer)
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

function addEventListener(el: HTMLElement, binding: DirectiveBinding, type: string) {
  const obj = genEventCallBack(el, binding)
  el.addEventListener(type, obj.fn)
  deps.set(el, obj)
}

function removeEventListener(el: HTMLElement, type: string) {
  const { fn, timer } = deps.get(el)
  el.removeEventListener(type, fn)
  timer && clearTimeout(timer)
  deps.delete(el)
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

export type VDebounceValueOption = {
  customCallback: () => unknown
  time?: number
} | (() => unknown)

export function defineVDebounceValue(options: VDebounceValueOption) {
  return options
}
