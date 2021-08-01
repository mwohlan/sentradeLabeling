<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      static
      class="fixed inset-0 flex z-40 lg:hidden"
      @close="$emit('closeSidebar')"
      :open="sidebarOpen"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div
          class="
            relative
            flex-1 flex flex-col
            max-w-xs
            w-full
            pt-5
            pb-4
            bg-cyan-700
          "
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2"></div>

          <div class="flex-shrink-0 flex items-center gap-x-2 px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg"
              alt="Easywire logo"
            />
            <div class="text-2xl text-cyan-200 font-bold">Sentrade</div>
          </div>
          <nav
            class="
              mt-5
              flex-shrink-0
              h-full
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
                  'group flex items-center px-2 py-2 text-base font-medium rounded-md',
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
      </TransitionChild>
      <div class="flex-shrink-0 w-32" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  props: { sidebarOpen: Boolean, navigation: Array },
  emits: ["closeSidebar"],
  setup() {},
};
</script>

<style>
</style>