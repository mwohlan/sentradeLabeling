<template>
  <Disclosure class="sm:hover:scale-[1.01] duration-200 bg-white shadow-md sm:shadow-lg  px-3 py-3   md:px-7 rounded-lg  mx-2" :defaultOpen="activeDiscussion" #="{open:openPanel}" as="li">
    <div>
      <h2 class="text-xs font-medium text-gray-600 ">{{ comment.submissionTitle }}</h2>
    </div>
    <div class="mt-4 lg:mt-6 text-gray-800/90 text-[0.95rem] font-medium  leading-relaxed text-justify">{{ comment.body }} </div>
    <div class="mt-4 gap-y-4 lg:mt-6 flex flex-wrap gap-x-2 justify-between">
      <div class="flex flex-wrap items-center lg:gap-x-6 gap-x-4">
        <div
          class=" px-2 py-0.5  rounded-full text-xs  bg-gray-200/70 text-gray-700"
        >{{ comment.subredditName }}</div>
        <div
          class=" px-2 py-0.5  rounded-full text-xs "
          :class="{
            'bg-red-200/70': comment.score < -1,
            'bg-green-200/70': comment.score > 1,
            'bg-yellow-200/70': comment.score >= -1 && comment.score <= 1,
            'text-red-700': comment.score < -1,
            'text-green-700': comment.score > 1,
            'text-yellow-700': comment.score >= -1 && comment.score <= 1,
          }"
        >{{ comment.score }}</div>
      </div>

      <div class="flex items-center flex-wrap lg:gap-x-6 gap-x-4">
        <template v-for="[user, value] of userMap" :key="user">
          <div v-if="comment[user] != -2"
            class=" px-2 py-0.5 rounded-full text-xs "
            :class="{
              'bg-red-200/70': comment[user] == -1,
              'bg-green-200/70': comment[user] == 1,
              'bg-gray-200/60': comment[user] == -2,
              'bg-yellow-200/70': comment[user] == 0,
              'text-red-700': comment[user] == -1,
              'text-green-700': comment[user] == 1,
              'text-yellow-700': comment[user] == 0,
              'text-gray-700': comment[user] == -2,
            }"
          >{{ user }}</div>
        </template>
      </div>
    </div>
    <div class="mt-6 flex justify-between  sm:space-x-20">
      <div class="flex sm:space-x-12 space-x-8 items-center text-gray-500/75">
        <button @click="addSentiment(comment, 1)" >
          <ThumbUpIcon :class="[userSentiment == 1 ? 'text-green-400/80 hover:text-green-500':'hover:text-gray-500']" class="h-6 w-6" aria-hidden="true" />
        </button>

        <button @click="addSentiment(comment, 0)" >
          <SwitchVerticalIcon :class="[userSentiment == 0 ? 'text-yellow-400/80 hover:text-yellow-500':'hover:text-gray-500']" class="h-6 w-6" aria-hidden="true" />
        </button>

        <button >
          <ThumbDownIcon @click="addSentiment(comment, -1)" :class="[userSentiment == -1 ? 'text-red-400/80 hover:text-red-500':'hover:text-gray-500']" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="text-sm flex space-x-8 sm:space-x-12">
        <DisclosureButton
          :class="[
            comment.discussionResolved ? 'text-green-500 hover:text-green-600' :
              comment.discussions && comment.discussions.length > 0
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-500/75 hover:text-gray-600',
          ]"
        >
          <ChatIcon class="h-6 w-6" aria-hidden="true" />
        </DisclosureButton>

        <button class="text-gray-500/75 hover:text-gray-600">
          <TrashIcon @click="removeComment(comment)" class="h-6 w-6" aria-hidden="true" />
        </button>
        <Menu as="div" class="relative">
          <MenuButton class="w-full h-full">
            <DotsVerticalIcon class="text-gray-500/75 hover:text-gray-600 h-6 w-6" aria-hidden="true" />
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
                      active ? ' text-gray-700 bg-gray-100' : 'text-gray-500',
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
                      active ? ' text-gray-700 bg-gray-100' : 'text-gray-500',
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
                      active ? ' text-gray-700 bg-gray-100' : 'text-gray-500',
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
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform scale-90 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition-all duration-200 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-90 opacity-0"
    >
      <CommentSection :comment="comment" :openPanel="openPanel"/>
    </transition>
  </Disclosure>
</template>

<script setup>
import { useMainStore } from "../store";

import { useClipboard } from "@vueuse/core";

import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
} from "@headlessui/vue";
import {  } from "@heroicons/vue/solid";
import {
  SwitchVerticalIcon,
  DotsVerticalIcon,
  ShareIcon,
  LinkIcon,
  TrashIcon,
  ThumbUpIcon, ThumbDownIcon
} from "@heroicons/vue/outline";
import { ChatIcon } from "@heroicons/vue/outline";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import CommentSection from "./CommentSection.vue";

const props = defineProps({
  comment: Object,
  isMobile: Boolean,
});


const store = useMainStore();

const copyLink = ref("https://peaceful-murdock-181b26.netlify.app/link/" + props.comment.id);

const { copy } = useClipboard();

const userMap = computed(
  () =>
    new Map(
      store.users
        .map((user) => user.name)
        .sort()
        .map((userName) => [userName, userName])
    )
);



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



const activeDiscussion = computed(() => !props.comment.discussionResolved && props.comment.discussions && props.comment.discussions.length > 0)

const current_user = computed(() => store.current_user.name);

const userSentiment = computed(() => props.comment[current_user.value]);





</script>

<style>
</style>