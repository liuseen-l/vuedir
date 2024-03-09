export function NOOP() {}

export const isArray = Array.isArray
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export const objectToString = Object.prototype.toString
export function toTypeString(value: unknown): string {
  return objectToString.call(value)
}
