<template>
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto"
      >
        <div class="flex items-center gap-x-2 flex-shrink-0 px-4">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg"
            alt="Sentrade Logo"
          />
          <div class="text-2xl text-cyan-200 font-bold">Sentrade</div>
        </div>

        <nav
          class="
            mt-5
            flex-1 flex flex-col
            divide-y divide-cyan-800
            overflow-y-auto
          "
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              :class="[
                item.current
                  ? 'bg-cyan-800 text-white'
                  : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
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
  setup() {},
};
</script>

<style>
</style>