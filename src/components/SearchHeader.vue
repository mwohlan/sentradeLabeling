<template>
  <div
    class="duration-300 sticky overflow-hidden drop-shadow top-0 lg:mx-4 shadow-md z-10 bg-white flex-1 sm:rounded-lg"
  >
    <div class="flex">
      <div class="flex items-center text-slate-500 lg:hidden" @click="toggleMobileMenu()">
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
                :class="[filterTerm !== '' ? 'focus:!border-red-400 border-red-400 border-2' : 'border-transparent', { 'cursor-not-allowed': route.name === 'link' }]"
                class="block w-full h-full pl-9 pr-2 text-slate-900 bg-slate-200/60 shadow md:shadow-md placeholder-slate-500 rounded-xl focus:outline-none focus:ring-0 focus:border-transparent"
                :placeholder="'Search ' + route.name"
                type="text"
                :disabled="route.name === 'link'"
                :value="filterTerm"
                @input="e => filterTerm = e.target.value"
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
    <HeaderLoadingBar />
  </div>
</template>

<script setup>
import { MenuIcon, RefreshIcon } from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";
import HeaderStats from './HeaderStats.vue';
import HeaderLoadingBar from "./HeaderLoadingBar.vue";
import { useMainStore } from '../store'
import { ref, watch } from "vue";
import { useRoute } from "vue-router";



const store = useMainStore();

const route = useRoute();

const filterTerm = ref("")









const toggleMobileMenu = () => {
  store.openMobileMenu = !store.openMobileMenu;

}
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

const handleInput = debounce(() => {
  store.filterTerm = filterTerm.value


}, 600)


watch(filterTerm,() => {
  handleInput()
})


</script>
