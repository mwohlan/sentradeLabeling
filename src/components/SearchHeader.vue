<template>
  <div
    class="sticky overflow-hidden  drop-shadow top-0 lg:mx-4 shadow-md z-10 bg-white flex-1 sm:rounded-lg"
  >
    <div class="flex">
      <div class="flex items-center text-slate-500 lg:hidden" @click="$emit('openSidebar')">
        <MenuIcon class="h-[3.25rem] w-[3.25rem]" aria-hidden="true" />
      </div>

      <!-- Search bar -->
      <div class="flex-1 px-2 py-1 flex justify-between lg:max-w-5xl lg:mx-auto">
        <div class="flex-1 flex">
          <form @submit.prevent class="w-full flex md:ml-0" autocomplete="off">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative mt-1 w-full text-slate-400 focus-within:text-slate-600">
              <input
                id="search-field"
                name="search-field"
                :class="[filterTerm !== '' ? 'focus:!border-red-400 border-red-400 border-2' : 'border-transparent']"
                class="block w-full h-full pl-9 pr-2 text-slate-900 bg-slate-200/60 shadow md:shadow-md placeholder-slate-500 rounded-xl focus:outline-none focus:ring-0 focus:border-transparent"
                :placeholder="'Search ' + currentRouteName"
                type="text"
                :value="filterTerm"
                @input="handleInput($event.target.value)"
              />
              <div
                class="absolute inset-y-0 left-2 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-25"
                class="duration-300"
              >
                <div
                  v-if="searchLoading"
                  class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <RefreshIcon class="h-5 w-5 animate-spin" aria-hidden="true" />
                </div>
              </transition>
            </div>
          </form>
        </div>
      </div>
    </div>

    <HeaderStats />
    <div class="relative mt-0.5 bg-white">
      <transition name="fade">
        <div
          v-if="isLoading"
          class="absolute w-full z-40 bottom-0 h-[0.2rem] bg-emerald-200 rounded-lg"
        >
          <div class="animation h-full w-1/3 bg-emerald-400"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { MenuIcon, RefreshIcon } from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";
import HeaderStats from './HeaderStats.vue';

import { useMainStore } from '../store'
import { computed, ref } from 'vue'


defineProps({
  currentRouteName: String,
  filterTerm: String

});

const emit = defineEmits(['update:filterTerm', 'openSidebar'])

const searchLoading = ref(false)
const debounce = (fn, ms = 600) => {
  let timeout;
  return function (...args) {
    searchLoading.value = true
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args)
      searchLoading.value = false
    }, ms);
  };
};

const handleInput = debounce(inputValue => {

  emit('update:filterTerm', inputValue)

}, 600)


const isLoading = computed(() => store.loading)

const store = useMainStore();
</script>
<style scoped>
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