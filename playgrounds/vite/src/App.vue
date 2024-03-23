<script setup lang="ts">
import { vAnimate } from '@vuedir/core'
import { ref } from 'vue'

// const dwa = 'https://pica.zhimg.com/v2-947e8ea2f8bd1261a2c33e91049d53c9_l.jpg?source=1def8aca'
const show = ref(null)
</script>

<template>
  <h1 ref="show" v-animate.bounce>
    1wdadad
  </h1>
  <button>
    click
  </button>
  <!-- <Transition name="custom-classes" enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight">
    <p v-if="show">hello</p>
  </Transition> -->
  <div v-for="(item, _index) in [1, 2, 3, 4, 5, 6, 7, 7, , 2, 3, 3, 4, 8, 9]" :key="item" class="da">
    {{ item }}
  </div>
  <!-- <img v-lazyLoad="defineVLazyLoadValue(dwa)" class=""> -->
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
