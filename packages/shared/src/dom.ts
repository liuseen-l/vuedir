export function setAttribute(el: HTMLElement, atr: string, value: any) {
  el.setAttribute(atr, value)
}

export function setAttributes(el: HTMLElement, atr: string[], value: any[]) {
  for (let i = 0; i < atr.length; i++)
    setAttribute(el, atr[i], value[i])
}
