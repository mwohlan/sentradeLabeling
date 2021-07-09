<template>
  <Disclosure as="li">
    <div>
      <h2 class="text-xs font-semibold text-gray-800">
        {{ comment.submissionTitle }}
      </h2>
    </div>
    <div class="mt-3 text-sm text-gray-800 space-y-4">{{ comment.body }}</div>
    <div class="mt-3 gap-y-4 flex flex-wrap gap-x-2 justify-between">
      <div class="flex flex-wrap gap-x-2">
        <div
          class="
            items-center
            px-2.5
            py-0.5
            rounded-full
            text-xs
            font-medium
            bg-gray-100
            text-gray-800
          "
        >
          {{ comment.subredditName }}
        </div>
        <div
          class="items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="{
            'bg-red-100': comment.score < -1,
            'bg-green-100': comment.score > 1,
            'bg-yellow-100': comment.score >= -1 && comment.score <= 1,
            'text-red-800': comment.score < -1,
            'text-green-800': comment.score > 1,
            'text-yellow-800': comment.score >= -1 && comment.score <= 1,
          }"
        >
          {{ comment.score }}
        </div>
      </div>

      <div class="flex flex-wrap gap-x-2">
        <template v-for="(value, key) in comment" :key="key">
          <div
            v-if="userSet.has(key)"
            class="items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="{
              'bg-red-100': value == -1,
              'bg-green-100': value == 1,
              'bg-gray-100': value == -2,
              'bg-yellow-100': value == 0,
              'text-red-800': value == -1,
              'text-green-800': value == 1,
              'text-yellow-800': value == 0,
              'text-gray-800': value == -2,
            }"
          >
            {{ key }}
          </div>
        </template>
      </div>
    </div>
    <div class="mt-6 flex justify-between md:justify-start sm:space-x-20">
      <div class="flex sm:space-x-10 space-x-7 items-center">
        <button
          @click="addSentiment(comment, 1)"
          class="text-green-500 hover:text-green-600"
        >
          <ThumbUpIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          @click="addSentiment(comment, 0)"
          class="text-yellow-500 hover:text-yellow-600"
        >
          <SwitchVerticalIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button class="text-red-500 pt-1 hover:text-red-600">
          <ThumbDownIcon
            @click="addSentiment(comment, -1)"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="text-sm flex space-x-7">
        <DisclosureButton
          :class="[
            comment.discussions &&comment.discussions.length > 0
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-400 hover:text-gray-500',
          ]"
        >
          <ChatIcon class="h-6 w-6" aria-hidden="true" />
        </DisclosureButton>

        <a
          class="text-gray-400 pt-1 hover:text-gray-500"
          :href="comment.permalink"
          target="_blank"
        >
          <LinkIcon class="h-6 w-6" aria-hidden="true" />
        </a>
        <button class="text-gray-400 hover:text-gray-500">
          <TrashIcon
            @click="removeComment(comment.id)"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-90 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-90 opacity-0"
    >
      <DisclosurePanel>
        <div class="bg-gray-50 mt-3 shadow rounded-lg sm:overflow-hidden">
          <div class="divide-y divide-green-600">
            <div class="px-4 py-6 sm:px-6">
              <ul class="space-y-8">
                <li
                  v-for="discussion in comment.discussions"
                  :key="discussion.created"
                  class="flex"
                >
                  <div class="flex-1 space-x-3">
                    <div>
                      <div class="text-sm">
                        <a
                          href="#"
                          class="font-medium text-gray-900 capitalize"
                          >{{ discussion.user }}</a
                        >
                      </div>
                      <div class="mt-1 text-sm text-gray-700">
                        <p style="white-space: pre">{{ discussion.body }}</p>
                      </div>
                      <div class="flex justify-between">
                        <div class="mt-2 text-sm space-x-2">
                          <span class="text-gray-500 font-medium"
                            ><UseTimeAgo
                              v-slot="{ timeAgo }"
                              :time="new Date(discussion.created)"
                            >
                              {{ timeAgo }}
                            </UseTimeAgo></span
                          >
                        </div>

                        <div class="flex gap-x-10 text-sm font-medium">
                          <button class="text-gray-400 hover:text-gray-500">
                            <TrashIcon
                              @click="
                                removeUserDiscussion(
                                  comment,
                                  discussion.created
                                )
                              "
                              class="h-5 w-5"
                              :class="{
                                hidden: discussion.user !== current_user,
                              }"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-6 sm:px-6">
            <div class="flex space-x-3">
              <div class="min-w-0 flex-1">
                <form @submit.prevent="addUserDiscussion()">
                  <div>
                    <textarea
                      id="comment"
                      v-model="userDiscussion"
                      name="comment"
                      rows="3"
                      class="
                        shadow-sm
                        block
                        w-full
                        focus:ring-cyan-500
                        focus:border-cyan-500
                        sm:text-sm
                        border border-gray-300
                        rounded-md
                      "
                      placeholder="Add to discussion"
                    />
                  </div>
                  <div class="mt-3 flex items-center justify-end">
                    <button
                      type="submit"
                      class="
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-2
                        border border-transparent
                        text-sm
                        font-medium
                        rounded-md
                        shadow-sm
                        text-white
                        bg-cyan-600
                        hover:bg-cyan-700
                        focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                      "
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script>
import { useMainStore } from "../store";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { UseTimeAgo } from "@vueuse/components";
import {
  ThumbUpIcon,
  TrashIcon,
  ThumbDownIcon,
  LinkIcon,
  ReplyIcon,
} from "@heroicons/vue/solid";
import { SwitchVerticalIcon } from "@heroicons/vue/outline";
import { ChatIcon } from "@heroicons/vue/outline";
import { ref, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    ThumbUpIcon,
    ThumbDownIcon,
    TrashIcon,
    LinkIcon,
    ChatIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ReplyIcon,
    SwitchVerticalIcon,
    UseTimeAgo,
  },
  props: {
    comment: Object,
  },
  setup(props) {
    const getDate = (time) => {
      let date = new Date(time);
      let timeAgo = useTimeAgo(time);
      return timeAgo.value;
    };
    const store = useMainStore();

    const userSet = computed(
      () => new Set(store.users.map((user) => user.name))
    );

    const isLoading = ref(false);

    const userDiscussion = ref("");

    const addSentiment = (comment, sentiment) => {
      isLoading.value = true;
      store.addSentiment(comment, sentiment);
      isLoading.value = false;
    };
    const removeComment = (commentId) => {
      store.removeComment(commentId);
    };

    const addUserDiscussion = () => {
      store.addUserDiscussion(props.comment, userDiscussion.value);
      userDiscussion.value = "";
    };

    const removeUserDiscussion = (comment, timestamp) => {
      store.removeUserDiscussion(comment, timestamp);
    };

    return {
      addSentiment,
      removeComment,
      isLoading,
      userSet,
      addUserDiscussion,
      userDiscussion,
      getDate,
      current_user: computed(() => store.current_user.name),
      removeUserDiscussion,
    };
  },
};
</script>

<style>
</style>