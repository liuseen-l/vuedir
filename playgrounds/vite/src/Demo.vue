<script setup lang="ts">
import { vDebounce } from '@vuedir/core'
import { defineProps, reactive } from 'vue'

const _props = defineProps<{
  r: number
  d: any
}>()

const obj = reactive({
  time: 1000,
  callback: (res) => {
    console.log(res)
  },
  customCallback: () => {
    return 1
  },
})

function change() {
  obj.time = 2000
}
</script>

<template>
  <input v-debounce="d">
  <div>{{ r }}</div>
  <div>{{ d.time }}</div>
  <button @click="change">
    change
  </button>
</template>
