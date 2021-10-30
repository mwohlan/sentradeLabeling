<template>
  <div>
    <main class="fixed inset-0 h-full">
      <router-view v-slot="{ Component }">
       <component :is="Component" />
      
      </router-view>
      <div class="lg:flex relative">
        <div class="hidden lg:block lg:w-72 "></div>
        <div class="sticky flex justify-center flex-1  bottom-0 bg-white">
          <transition name="fade">
            <div
              v-if="isLoading"
              class=" w-full absolute bottom-0 overflow-x-hidden z-40 h-[0.40rem] bg-emerald-200 rounded-lg"
            >
              <div class="animation h-full w-1/3 bg-emerald-400"></div>
            </div>
          </transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useMainStore } from './store'
import { computed } from 'vue'
const store = useMainStore();


const isLoading = computed(() => store.loading)
</script>



<style  scoped>
/* .component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.2s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0.6;
} */
@keyframes changewidth {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(300%);
  }
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.2s linear;
}

.animation {
  animation: changewidth 0.8s linear 0s infinite;
}
</style>

