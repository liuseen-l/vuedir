<script setup lang="ts">
import { ref } from 'vue'
import Demo from './Demo.vue'

const r = ref(1)

function add() {
  r.value = r.value + 1
}
const z = ref(1)

function add2() {
  z.value = z.value + 1
}

const show = ref(true)

let obj = {
  time: 1000,
  callback: (_el, res) => {
    console.log(res)
  },
  customCallback: () => {
    return 1
  },
}

function test() {
  obj = {
    ...obj,
    time: 2000,
  }
}
</script>

<template>
  <Demo v-if="show" :d="obj" :r="r" />
  <button @click="add">
    {{ r }}
  </button>
  <button @click="add2">
    2{{ z }}
  </button>
  <button @click="show = !show">
    {{ show }}
  </button>
  <button @click="test">
    change obj
  </button>
</template>
