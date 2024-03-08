import { defineDirective } from '@vuedir/shared'
import type { DirectiveBinding } from 'vue'

const deps = new WeakMap()

function observe(el: HTMLImageElement, binding: DirectiveBinding) {
  const targetUrl = binding.value
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (targetUrl)
        el.src = targetUrl
    }
  })
  io.observe(el)
  deps.set(el, io)
}

function observeScroll(el: HTMLImageElement, binding: DirectiveBinding) {
  const listenScroll = () => {
    const windowHeight = document.documentElement.clientHeight
    const top = el.getBoundingClientRect().top
    const bottom = el.getBoundingClientRect().bottom
    const targetUrl = binding.value
    if (top - windowHeight < 0 && bottom > 0) {
      if (targetUrl)
        el.src = targetUrl
    }
  }

  window.addEventListener('scroll', () => {
    listenScroll()
  })
}

function unobserve(el: HTMLElement) {
  const io = deps.get(el)
  io.unobserve(el)
  deps.delete(el)
}

export const vLazyLoad = defineDirective({
  created(el, binding) {
    if (IntersectionObserver)
      observe(el, binding)
    observeScroll(el, binding)
  },
  beforeUnmount(el) {
    unobserve(el)
  },
})
