<script setup>
import { vDebounce } from '@vuedir/core'

const obj = {
  time: 1000,
  callback: (res) => {
    console.log(res)
  },
  customCallback: () => {
    return 1
  },
}
// 在模板中启用 v-focus
</script>

<template>
  <input v-focus v-debounce="obj">
</template>
