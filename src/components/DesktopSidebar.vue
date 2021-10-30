<template>
  <div class="hidden lg:flex lg:flex-shrink-0 drop-shadow-xl shadow-lg">
    <div class="flex flex-col w-72">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 bg-white pt-5">
        <div class="flex items-center gap-x-2 flex-shrink-0 px-4 drop-shadow-xl">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-400.svg"
            alt="Sentrade Logo"
          />
          <div class="text-2xl text-slate-500 font-bold">Sentrade</div>
        </div>

        <nav class="mt-5 flex-1 flex flex-col gap-y-6" aria-label="Sidebar">
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              :class="[, item.current ? 'bg-slate-100 border-indigo-400 text-slate-800' : 'border-transparent  text-slate-700 hover:bg-slate-100 hover:text-slate-900', 'group rounded flex items-center px-3 py-2 text-sm font-medium border-l-4']"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[item.current ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-700', 'mr-3 flex-shrink-0 h-6 w-6']"
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
          <div class="flex px-6 text-sm text-slate-600 font-medium sm:mr-6">
            <router-link class="flex gap-x-2 items-center capitalize" :to="{ name: 'Login' }">
              <LoginIcon class="h-[1.625rem] w-[1.625rem]" aria-hidden="true" />
              {{ username }}
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
  FireIcon

} from "@heroicons/vue/solid";
import {
  LoginIcon,


} from "@heroicons/vue/outline";
export default {

  components: {
    LoginIcon,
    FireIcon
  },

  props: {
    navigation: Array
  },
  setup() {
    const store = useMainStore();
  

    return {
      unreadPostsAvailable: computed(() => store.unreadPostsCount > 0),
      unreadPostsCount:  computed(()=>(store.unreadPostsCount)),
      username: store.current_user.name,
    
    }
  },
};
</script>

<style>
</style>