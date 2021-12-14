<template>
      <div class="relative mt-0.5 bg-white">
      <transition name="fade">
        <div
          v-if="isLoading"
          class="absolute w-full z-40 bottom-0 h-[0.2rem] bg-emerald-200 rounded-lg"
        >
          <div class="animation-loading h-full w-1/3 bg-emerald-400"></div>
        </div>
      </transition>
    </div>
</template>

<script setup>
import { useMainStore } from '../store'
import { computed } from 'vue'
const store = useMainStore();


const isLoading = computed(() => store.loading)
</script>


<style scoped>
@keyframes moveBar {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(300%);
  }
}


.animation-loading {
  animation: moveBar 0.8s linear 0s infinite;
}
</style>