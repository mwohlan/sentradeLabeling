<template>
  <div class="bg-white rounded-b">
    <div class="lg:max-w-7xl lg:mx-auto">
      <div class>
        <div class="flex-1 min-w-0">
          <!-- Profile -->
          <div class="flex items-center pb-1 px-4 sm:px-0">
            <div
              class="mt-2 relative sm:mt-4 flex flex-wrap justify-between md:justify-around flex-1"
            >
              <div class="capitalize flex group items-center text-sm text-slate-500 font-medium">
                <div
                  class="-top-6 px-2 flex flex-nowrap rounded shadow-md opacity-0 bg-indigo-200 text-indigo-500 absolute group-hover:opacity-100 invisible group-hover:visible"
                >{{ userStats?.sentimentCounts.total }} sentences labeled by {{ current_user?.name }}</div>
                <UserIcon class="mr-0.5 h-5 w-5 text-emerald-400" aria-hidden="true" />
                {{ userStats?.sentimentCounts.total }}
              </div>
              <div class="group flex items-center text-sm text-slate-500 font-medium">
                <div
                  class="-top-6 px-2 flex flex-nowrap rounded shadow opacity-0 duration-500 bg-indigo-200 text-indigo-500 absolute group-hover:opacity-100 invisible group-hover:visible"
                >{{ generalStats?.labeledSentences?.total }} sentences labeled overall</div>
                <UserGroupIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-emerald-400" aria-hidden="true" />
                {{ generalStats?.labeledSentences?.total }}
              </div>
              <div class="flex group items-center text-sm text-slate-500 font-medium">
                <div
                  class="-top-6 px-2 flex flex-nowrap rounded shadow opacity-0 duration-500 bg-indigo-200 text-indigo-500 absolute group-hover:opacity-100 invisible group-hover:visible"
                >{{ generalStats['unlabeledSentences'] }} unlabeled sentences remaining</div>
                <DocumentDuplicateIcon
                  class="sm:mr-2 mr-0.5 h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
                {{ generalStats['unlabeledSentences'] }}
              </div>
              <router-link
                to="discussions"
                class="flex group items-center text-sm text-slate-500 font-medium"
              >
                <FireIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-indigo-400" aria-hidden="true" />
                {{ unreadPostsCount }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ClipboardCheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/outline";
import { PlusIcon, FireIcon } from "@heroicons/vue/solid";
import { UserIcon, LoginIcon, UserGroupIcon } from "@heroicons/vue/outline";
import { computed } from 'vue';
import { useMainStore } from "../../store";
export default {
  components: {
    ClipboardCheckIcon,
    DocumentDuplicateIcon,
    PlusIcon,
    LoginIcon,
    UserIcon,
    UserGroupIcon,
    FireIcon

  },
  setup() {
    const store = useMainStore();


    return {
      current_user: computed(() =>  store.current_user),
      userStats: computed(() => store.userStats.get(store.current_user?.id)),
      generalStats: computed(() => store.generalStats),
      unreadPostsCount: computed(() => (store.unreadPostsCount)),
    

    };
  },
};
</script>

<style>
</style>