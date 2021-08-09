<template>
  <div class="sticky top-0  lg:mx-4 shadow-md z-10 flex-1">
    <div class=" flex bg-white ">
      <div class="flex items-center text-gray-500 lg:hidden" @click="$emit('openSidebar')">
        <MenuIcon class="h-[3.25rem] w-[3.25rem]" aria-hidden="true" />
      </div>

      <!-- Search bar -->
      <div class=" flex-1 px-2 py-1 flex justify-between  lg:max-w-5xl lg:mx-auto  ">
        <div class="flex-1 flex">
          <form class="w-full  flex md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative mt-1 w-full text-gray-400 focus-within:text-gray-600">
              <div
                class="absolute inset-y-0 left-2 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                class="block w-full h-full pl-9 pr-2 border-transparent text-gray-900 bg-gray-200/60 shadow md:shadow-md placeholder-gray-500 rounded-xl focus:outline-none focus:ring-0 focus:border-transparent"
                :placeholder="'Search ' + currentRouteName"
                type="search"
              />
            </div>
          </form>
        </div>
      </div>
    </div>

    <HeaderStats />
  </div>
</template>

<script>
import {

  MenuIcon,

} from "@heroicons/vue/outline";
import {

  SearchIcon
} from "@heroicons/vue/solid";
import HeaderStats from './HeaderStats.vue';
export default {
  components: { HeaderStats, SearchIcon, MenuIcon, },
  props: {
    currentRouteName: String

  },
  setup() {


  },
};
</script>
<style>
</style>