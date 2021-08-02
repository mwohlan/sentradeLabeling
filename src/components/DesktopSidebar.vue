<template>
  <div class="hidden  lg:flex lg:flex-shrink-0 border-r-2 border-gray-200">
    <div class="flex  flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center gap-x-2 flex-shrink-0 px-4">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
            alt="Sentrade Logo"
          />
          <div class="text-2xl text-gray-500 font-bold">Sentrade</div>
        </div>

        <nav
          class="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              :class="[item.current ? 'bg-gray-100 border-gray-500 text-gray-700' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900', 'group flex items-center px-3 py-2 text-sm font-medium border-l-4']"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[item.current ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700', 'mr-3 flex-shrink-0 h-6 w-6']"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navigation: Array
  },
  setup() { },
};
</script>

<style>
</style>