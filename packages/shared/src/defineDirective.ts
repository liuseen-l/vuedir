import type { Directive } from 'vue'

export function defineDirective<T = any, V = any>(options: Directive<T, V>): Directive<T, V> {
  return options
}
