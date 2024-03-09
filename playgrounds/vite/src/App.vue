<script setup lang="ts">
import { defineVLazyLoadValue, vLazyLoad } from '@vuedir/core'

const dwa = 'https://pica.zhimg.com/v2-947e8ea2f8bd1261a2c33e91049d53c9_l.jpg?source=1def8aca'
</script>

<template>
  <div v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 7, , 2, 3, 3, 4, 8, 9]" :key="item" class="da">
    {{ item }}
  </div>
  <img v-lazyLoad="defineVLazyLoadValue(dwa)" class="">
</template>

<style scoped>
.da {
  height: 100px;
}

.hh {
  width: 100px;
  height: 100px;
}
</style>
