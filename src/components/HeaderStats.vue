<template>
  <div class=" bg-white  rounded-b">
    <div class="lg:max-w-7xl lg:mx-auto">
      <div class>
        <div class="flex-1 min-w-0">
          <!-- Profile -->
          <div class="flex items-center pb-1 px-4 sm:px-0">
            <div class="mt-2  sm:mt-4 flex flex-wrap justify-between md:justify-around flex-1">
              <div class=" flex items-center text-sm text-gray-500 font-medium">
                <UserIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-green-400" aria-hidden="true" />
                {{ stats['sentimentCount'] }}
              </div>
              <div class=" flex items-center text-sm text-gray-500 font-medium">
                <UserGroupIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-green-400" aria-hidden="true" />
                {{ stats['labeledSentences'] }}
              </div>
              <div class="flex items-center text-sm text-gray-500 font-medium">
                <DocumentDuplicateIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-red-400" aria-hidden="true" />
                {{ stats['unlabeledSentences'] }}
              </div>

              <div class="flex items-center text-sm text-gray-500 font-semibold sm:mr-6">
                <router-link class="flex capitalize" :to="{ name: 'Login' } " >
                  <LoginIcon class="sm:mr-2 mr-0.5 h-5 w-5 " aria-hidden="true" />
                  {{ current_user.name }}
                </router-link>
              </div>

              <div
                v-if="testMode"
                class="flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0"
              >
                <button
                  type="button"
                  @click="addRandomComment"
                  class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
                >
                  <PlusIcon class="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />Comment
                </button>
              </div>
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
import { PlusIcon,  } from "@heroicons/vue/solid";
import { UserIcon,LoginIcon,UserGroupIcon} from "@heroicons/vue/outline";
import { ref, computed } from '@vue/reactivity';
import { useMainStore } from "../store";
export default {
  components: {
    ClipboardCheckIcon,
    DocumentDuplicateIcon,
    PlusIcon,
    LoginIcon,
    UserIcon,
    UserGroupIcon

  },
  setup() {
    const store = useMainStore();
    const testMode = ref(false)


    const addRandomComment = () => {
      store.addRandomComment();
    };

    return {
      current_user: computed(() => store.current_user),
      stats: computed(() => store.stats),
      addRandomComment,
      testMode
    };
  },
};
</script>

<style>
</style>