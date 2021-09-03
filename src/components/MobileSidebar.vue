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
        <div class="relative  flex flex-col w-9/12 pt-5 pb-4 bg-white">


          <div class="flex gap-x-2 px-4 filter drop-shadow-xl">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-400.svg"
              alt="Easywire logo"
            />
            <div class="text-2xl text-gray-500 font-bold">Sentrade</div>
          </div>
          <nav class="mt-5 flex flex-col gap-y-6 flex-shrink-0 h-full overflow-y-auto" aria-label="Sidebar">
            <div class="px-2 space-y-1">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                :class="['outline-none', isMobile ? 'cursor-default' : '', item.current ? 'bg-gray-100 border-indigo-400 text-gray-700' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900', 'group rounded flex items-center px-3 py-2 text-sm font-medium border-l-4']"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[item.current ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-700', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true"
                />
                <div class="flex flex-1 justify-between">
                  <div>{{ item.name }}</div>
                  <div
                    v-if="item.name === 'Discussions' && unreadPostsAvailable"
                    class="text-[0.725rem] flex items-center justify-center"
                  >
                    <div
                      class="flex items-center animate-ping-slow bg-indigo-200 rounded-full gap-x-2 px-1.5"
                    >
                      <FireIcon class="h-4 w-4 text-indigo-500" />
                      <div class="text-indigo-500 font-bold">{{ unreadPostsCount }}</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="mx-4 rounded-full bg-indigo-400 h-[0.1rem] shadow drop-shadow"></div>
          <div class="flex  px-6 text-sm  text-gray-600 font-medium sm:mr-6">
                <router-link class="flex gap-x-2 items-center capitalize" :to="{ name: 'Login' } " >
                  <LoginIcon class="h-[1.625rem] w-[1.625rem] " aria-hidden="true" />
                  {{username}}
                </router-link>
              </div>
          </nav>
        </div>
      </TransitionChild>
    
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useMainStore } from "../store";
import {
  FireIcon

} from "@heroicons/vue/solid";
import {
  LoginIcon,
 

} from "@heroicons/vue/outline";
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
    FireIcon,
    LoginIcon
  },
  props: { sidebarOpen: Boolean, navigation: Array, isMobile: Boolean },
  emits: ["closeSidebar"],
  setup() {
    const store = useMainStore();


    return {
      unreadPostsAvailable: computed(() => store.unreadPostsCount > 0),
      unreadPostsCount: computed(() => store.unreadPostsCount),
      username: computed(() => store.current_user.name),
    }
  },
};
</script>

<style>
</style>