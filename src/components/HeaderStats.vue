<template>
  <div class=" bg-white  rounded-b ">
    <div class="lg:max-w-7xl lg:mx-auto ">
      <div class>
        <div class="flex-1 min-w-0">
          <!-- Profile -->
          <div class="flex items-center pb-1 px-4 sm:px-0 ">
            <div class="mt-2 relative  sm:mt-4 flex flex-wrap justify-between md:justify-around flex-1 ">
              <div class=" capitalize flex group items-center text-sm text-gray-500 font-medium">
                <div class="-top-6 px-2 flex flex-nowrap rounded shadow-md opacity-0 bg-indigo-200 text-indigo-500 absolute group-hover:opacity-100 invisible group-hover:visible "> {{ stats['sentimentCount'] }} sentences labeled by  {{current_user.name}}</div>
                <UserIcon class=" mr-0.5 h-5 w-5 text-green-400" aria-hidden="true" />
                 {{ stats['sentimentCount'] }}
              </div>
              <div class=" group flex items-center text-sm text-gray-500 font-medium">
                <div class="-top-6 px-2 flex flex-nowrap rounded shadow opacity-0 duration-500  bg-indigo-200 text-indigo-500 absolute group-hover:opacity-100 invisible group-hover:visible "> {{ stats['labeledSentences'] }} sentences labeled overall</div>
                <UserGroupIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-green-400" aria-hidden="true" />
                {{ stats['labeledSentences'] }}
              </div>
              <div class="flex group items-center text-sm text-gray-500 font-medium">
                  <div class="-top-6 px-2 flex flex-nowrap rounded shadow opacity-0 duration-500  bg-indigo-200 text-indigo-500 absolute group-hover:opacity-100 invisible group-hover:visible "> {{ stats['unlabeledSentences'] }} unlabeled sentences remaining</div>
                <DocumentDuplicateIcon class="sm:mr-2 mr-0.5 h-5 w-5 text-red-400" aria-hidden="true" />
                {{ stats['unlabeledSentences'] }}
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