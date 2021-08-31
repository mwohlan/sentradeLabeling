<template>
  <div class="hidden lg:flex lg:flex-shrink-0 drop-shadow-xl shadow-lg">
    <div class="flex flex-col w-72">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center gap-x-2 flex-shrink-0 px-4 drop-shadow-xl">
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
              :class="[, item.current ? 'bg-gray-100 border-indigo-400 text-gray-800' : 'border-transparent  text-gray-700 hover:bg-gray-100 hover:text-gray-900', 'group rounded flex items-center px-3 py-2 text-sm font-medium border-l-4']"
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
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useMainStore } from "../store";
import {

  MailIcon,
  FireIcon

} from "@heroicons/vue/solid";
export default {

  components: {
    MailIcon,
    FireIcon
  },

  props: {
    navigation: Array
  },
  setup() {
    const store = useMainStore();


    return {
      unreadPostsAvailable: computed(() => store.unreadPostsCount > 0),
      unreadPostsCount: computed(() => store.unreadPostsCount),
    }
  },
};
</script>

<style>
</style>