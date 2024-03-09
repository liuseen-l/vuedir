import type { DirectiveBinding } from 'vue'
import { defineDirective } from '@vuedir/shared'

const deps = new Map()

function observeByIntersection(el: HTMLImageElement, binding: DirectiveBinding) {
  const targetUrl = binding.value
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && targetUrl)
      el.src = targetUrl
  })
  io.observe(el)
  deps.set(el, io)
}

function observeByScroll(el: HTMLImageElement, binding: DirectiveBinding) {
  const targetUrl = binding.value
  const fn = () => {
    const root = document.documentElement
    const { top, bottom } = el.getBoundingClientRect()
    if (top - root.clientHeight < 0 && bottom > 0 && targetUrl)
      el.src = targetUrl
  }
  window.addEventListener('scroll', fn)
  deps.set(el, fn)
}

function observe(el: HTMLImageElement, binding: DirectiveBinding) {
  if (IntersectionObserver)
    observeByIntersection(el, binding)
  else
    observeByScroll(el, binding)
}

function unobserve(el: HTMLElement) {
  const io = deps.get(el)
  if (IntersectionObserver)
    io.unobserve(el)
  else
    window.removeEventListener('scroll', io)

  deps.delete(el)
}

export const vLazyLoad = defineDirective({
  created(el, binding) {
    observe(el, binding)
  },
  beforeUnmount(el) {
    unobserve(el)
  },
})

export type VLazyLoadValueOption = string

export function defineVLazyLoadValue(options: VLazyLoadValueOption) {
  return options
}
