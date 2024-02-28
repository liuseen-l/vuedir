import { a } from './const'

export const vFocus = {
  mounted: (el: any) => el.focus(),
}

export function useVFocus() {
  return {
    mounted: (el: any) => el.focus(),
  }
}

export {
  a,
}
