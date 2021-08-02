<template>
  <div class=" sticky top-0 z-10">
    <div
      class="md:mx-4 md:shadow flex h-14 bg-white border-b border-gray-200 lg:border-none"
    >
      <button
        class="px-4 border-r border-gray-200 text-gray-400 lg:hidden"
        @click="$emit('openSidebar')"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Search bar -->
      <div
        class="
          flex-1
          px-4
          flex
          justify-between
          sm:px-6
          lg:max-w-6xl
          lg:mx-auto
          lg:px-8
        "
      >
        <div class="flex-1 flex">
          <form class="w-full flex md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pointer-events-none
                "
                aria-hidden="true"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                class="
                  block
                  w-full
                  h-full
                  pl-8
                  pr-3
                  py-2
                  border-transparent
                  text-gray-900
                  placeholder-gray-500
                  focus:outline-none
                  focus:ring-0
                  focus:border-transparent
                  sm:text-sm
                "
                :placeholder="'Search ' + currentRouteName"
                type="search"
              />
            </div>
          </form>
        </div>
      </div>
    </div>

    <HeaderStats/>
  
  </div>
</template>

<script>
import {

  MenuAlt1Icon,
 
} from "@heroicons/vue/outline";
import {
 
  SearchIcon
} from "@heroicons/vue/solid";
import HeaderStats from './HeaderStats.vue';
export default {
  components: { HeaderStats,SearchIcon,MenuAlt1Icon, },
    props:{
        currentRouteName: String

    },
  setup() {

      
  },
};
</script>
<style>
</style>