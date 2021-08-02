<template>
  <Disclosure :defaultOpen="activeDiscussion" as="li">
    <div>
      <h2 class="text-xs font-semibold text-gray-800">{{ comment.submissionTitle }}</h2>
    </div>
    <div class="mt-3 text-sm text-gray-800">{{ comment.body }}</div>
    <div class="mt-3 gap-y-4 flex flex-wrap gap-x-2 justify-between">
      <div class="flex flex-wrap gap-x-2">
        <div
          class="items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
        >{{ comment.subredditName }}</div>
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
        >{{ comment.score }}</div>
      </div>

      <div class="flex flex-wrap gap-x-2">
        <template v-for="[key, value] of userMap" :key="key">
          <div
            class="items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="{
              'bg-red-100': comment[key] == -1,
              'bg-green-100': comment[key] == 1,
              'bg-gray-100': comment[key] == -2,
              'bg-yellow-100': comment[key] == 0,
              'text-red-800': comment[key] == -1,
              'text-green-800': comment[key] == 1,
              'text-yellow-800': comment[key] == 0,
              'text-gray-800': comment[key] == -2,
            }"
          >{{ key }}</div>
        </template>
      </div>
    </div>
    <div class="mt-6 flex justify-between md:justify-start sm:space-x-20">
      <div class="flex sm:space-x-10 space-x-7 items-center">
        <button @click="addSentiment(comment, 1)" class="text-green-500 hover:text-green-600">
          <ThumbUpIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button @click="addSentiment(comment, 0)" class="text-yellow-500 hover:text-yellow-600">
          <SwitchVerticalIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button class="text-red-500 pt-1 hover:text-red-600">
          <ThumbDownIcon @click="addSentiment(comment, -1)" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="text-sm flex space-x-7">
        <DisclosureButton
          :class="[
            comment.discussionResolved ? 'text-green-500 hover:text-green-600' :
              comment.discussions && comment.discussions.length > 0
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-gray-500',
          ]"
        >
          <ChatIcon class="h-6 w-6" aria-hidden="true" />
        </DisclosureButton>

        <button class="text-gray-400 hover:text-gray-500">
          <TrashIcon @click="removeComment(comment)" class="h-6 w-6" aria-hidden="true" />
        </button>
        <Menu as="div" class="relative">
          <MenuButton class="w-full h-full">
            <DotsVerticalIcon class="text-gray-400 hover:text-gray-500 h-6 w-6" aria-hidden="true" />
          </MenuButton>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute bottom-10 right-0 w-32 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    :class="[
                      active ? ' text-gray-800 bg-gray-100' : 'text-gray-600',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    :href="comment.permalink"
                    target="_blank"
                  >
                    <LinkIcon class="h-6 w-6 mr-2" aria-hidden="true" />Permalink
                  </a>
                </MenuItem>
                <MenuItem v-if="isMobile" v-slot="{ active }">
                  <button
                    :class="[
                      active ? ' text-gray-800 bg-gray-100' : 'text-gray-600',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    @click="openWhatsApp()"
                  >
                    <ShareIcon :active="active" class="w-6 h-6 mr-2" aria-hidden="true" />Whatsapp
                  </button>
                </MenuItem>
                <MenuItem v-else v-slot="{ active }">
                  <button
                    :class="[
                      active ? ' text-gray-800 bg-gray-100' : 'text-gray-600',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    @click="copy(copyLink)"
                  >
                    <ShareIcon :active="active" class="w-6 h-6 mr-2" aria-hidden="true" />Copy Link
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
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
      <DisclosurePanel #default="{ close }">
        <div class="bg-gray-100 flex flex-col mt-3 shadow rounded sm:rounded-lg overflow-hidden">
          <div
            @click="changeDiscussionStatus"
            v-if="resolvedDiscussion"
            class="cursor-pointer justify-self-start self-center flex items-center mt-1 px-2 rounded-full text-xs font-medium bg-green-200 text-green-800"
          >Resolved</div>
          <div
            class="cursor-pointer justify-self-start self-center flex items-center mt-1 px-2 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800"
            @click="changeDiscussionStatus(); close();"
            v-else-if="activeDiscussion"
          >Active</div>

          <ul
            v-if="comment.discussions && comment.discussions.length > 0"
            class="space-y-3 px-4 sm:px-6"
          >
            <li v-for="discussion in comment.discussions" :key="discussion.created" class="flex">
              <div class="flex-1 space-x-3">
                <div>
                  <div class="text-xs flex justify-between">
                    <div class="font-medium text-gray-900 capitalize">{{ discussion.user }}</div>

                    <div
                      v-if="
                        discussion.created > lastDiscussionView &&
                        discussion.user != current_user
                      "
                      class="bg-green-600 text-white px-2 py-0.5 rounded-2xl"
                    >New</div>
                  </div>
                  <div class="mt-1 text-sm text-gray-700 flex flex-wrap">
                    <p class="whitespace-pre-line">{{ discussion.body }} {{ discussion.newPost }}</p>
                  </div>
                  <div class="flex flex-wrap justify-between">
                    <div class="mt-2 text-xs space-x-2">
                      <span class="text-gray-500">
                        <UseTimeAgo
                          v-slot="{ timeAgo }"
                          :time="new Date(discussion.created)"
                        >{{ timeAgo }}</UseTimeAgo>
                      </span>
                    </div>

                    <div class="text-sm">
                      <button class="text-gray-400 hover:text-gray-500">
                        <TrashIcon
                          @click="
                          removeUserDiscussion(comment, discussion.created)
                          "
                          class="h-4 w-4"
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
          <div class="flex items-center justify-center">
            <button
              class="pb-1"
              v-if="comment.discussions && comment.discussions.length > 0"
              @click="openCommentSection = !openCommentSection"
            >
              <PlusCircleIcon
                v-if="!openCommentSection"
                class="h-5 w-5 text-green-500 hover:text-green-600"
                aria-hidden="true"
              />
              <MinusCircleIcon
                v-if="openCommentSection"
                class="h-5 w-5 text-red-500 hover:text-red-600"
                aria-hidden="true"
              />
            </button>
          </div>

          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-90 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-90 opacity-0"
          >
            <div
              v-if="
                openCommentSection ||
                !comment.discussions ||
                comment.discussions.length == 0
              "
              class="bg-gray-100 px-4 py-2 sm:px-6"
            >
              <div class="flex space-x-3">
                <div class="min-w-0 flex-1">
                  <form class="block sm:flex sm:gap-x-6" @submit.prevent="addUserDiscussion()">
                    <div class="sm:flex-1">
                      <textarea
                        id="comment"
                        v-model="userDiscussion"
                        ref="textInput"
                        name="comment"
                        rows="2"
                        class="shadow-sm block w-full focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add to discussion"
                      />
                    </div>
                    <div class="mt-3 flex items-center justify-end">
                      <button type="submit">
                        <ReplyIcon
                          class="h-6 w-6 text-cyan-500 hover:text-cyan-600"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup>
import { useMainStore } from "../store";

import { useClipboard } from "@vueuse/core";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
} from "@headlessui/vue";
import { UseTimeAgo } from "@vueuse/components";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/vue/solid";
import {
  SwitchVerticalIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ReplyIcon,
  DotsVerticalIcon,
  ShareIcon,
  LinkIcon,
  TrashIcon,
} from "@heroicons/vue/outline";
import { ChatIcon } from "@heroicons/vue/outline";
import { ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";

const props = defineProps({
  comment: Object,
  isMobile: Boolean,
});


const store = useMainStore();

const copyLink = ref(
  "https://peaceful-murdock-181b26.netlify.app/link/" + props.comment.id
);

const { copy } = useClipboard();

const textInput = ref(null);

const userMap = computed(
  () =>
    new Map(
      store.users
        .map((user) => user.name)
        .sort()
        .map((userName) => [userName, userName])
    )
);

const openCommentSection = ref(false);

watchEffect(() => {
  if (textInput.value) {
    setTimeout(() => (textInput.value ? textInput.value.focus() : null), 50);
  }
});

const userDiscussion = ref("");

const openWhatsApp = () => {
  window.open(
    "https://api.whatsapp.com/send?text=https://peaceful-murdock-181b26.netlify.app/link/" +
    props.comment.id,
    "_blank"
  );
};

const addSentiment = (comment, sentiment) => {
  store.addSentiment(comment, sentiment);
};
const removeComment = (comment) => {
  store.removeComment(comment);
};

const changeDiscussionStatus = () => {
  store.changeDiscussionStatus(props.comment);
}

const addUserDiscussion = () => {
  store.addUserDiscussion(props.comment, userDiscussion.value);
  openCommentSection.value = false;
  userDiscussion.value = "";
};

const removeUserDiscussion = (comment, timestamp) => {
  store.removeUserDiscussion(comment, timestamp);
};

const current_user = computed(() => store.current_user.name);

const lastDiscussionView = computed(() => store.stats.lastDiscussionView)

const activeDiscussion = computed(() => !props.comment.discussionResolved && props.comment.discussions && props.comment.discussions.length > 0)

const resolvedDiscussion = computed(() => props.comment.discussionResolved && props.comment.discussions && props.comment.discussions.length > 0)


</script>

<style>
</style>