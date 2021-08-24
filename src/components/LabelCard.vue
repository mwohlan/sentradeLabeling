<template>
  <Disclosure
    class="sm:hover:scale-[1.01] duration-200 bg-white shadow-md sm:shadow-lg px-3 py-3 md:px-7 rounded-lg mx-3 lg:mx-0"
    :defaultOpen="activeDiscussion"
    #="{ open: openPanel }"
    as="li"
  >
    <div>
      <h2 class="text-xs font-medium text-gray-600">{{ sentence.submissionTitle }}</h2>
    </div>
    <div
      @click.prevent="sentence.commentBody.length > 1 ? fullComment = !fullComment : fullComment"
      :class="{ 'cursor-pointer': !isMobile }"
      class="mt-4 lg:mt-6 text-gray-800/90 text-[0.95rem] font-semibold leading-relaxed text-justify"
    >
      <transition
        enter-from-class="opacity-25"
        leave-to-class="opacity-25"
        class="duration-200"
        mode="out-in"
      >
        <span v-if="!fullComment">{{ sentence.body }}</span>
        <div v-else>
          <span
            v-for="(sent,index) of sentence.commentBody"
            :class="[index == sentence.sentencePosition ? 'font-semibold' : 'font-normal']"
          >{{ sent + ' ' }}</span>
        </div>
      </transition>
    </div>
    <div class="mt-4 gap-y-4 lg:mt-6 flex flex-wrap gap-x-2 justify-between">
      <div class="flex flex-wrap items-center lg:gap-x-6 gap-x-4">
        <div
          class="px-2 py-0.5 rounded-full text-xs bg-gray-200/70 text-gray-700"
        >{{ sentence.subredditName }}</div>
        <div
          class="px-2 py-0.5 rounded-full text-xs"
          :class="{
            'bg-red-200/70': sentence.score < -1,
            'bg-green-200/70': sentence.score > 1,
            'bg-yellow-200/70': sentence.score >= -1 && sentence.score <= 1,
            'text-red-700': sentence.score < -1,
            'text-green-700': sentence.score > 1,
            'text-yellow-700': sentence.score >= -1 && sentence.score <= 1,
          }"
        >{{ sentence.score }}</div>
      </div>

      <div class="flex items-center flex-wrap lg:gap-x-6 gap-x-4">
        <template v-for="[user, value] of userMap" :key="user">
          <div
            v-if="sentence.sentiments[user].value != -2"
            class="px-2 py-0.5 rounded-full text-xs"
            :class="{
              'bg-red-200/70': sentence.sentiments[user].value == -1,
              'bg-green-200/70': sentence.sentiments[user].value == 1,
              'bg-gray-300': sentence.sentiments[user].value == -3,
              'bg-yellow-200/70': sentence.sentiments[user].value == 0,
              'text-red-700': sentence.sentiments[user].value == -1,
              'text-green-700': sentence.sentiments[user].value == 1,
              'text-yellow-700': sentence.sentiments[user].value == 0,
              'text-gray-900': sentence.sentiments[user].value == -3,
            }"
          >{{ user }}</div>
        </template>
      </div>
    </div>
    <div class="mt-6 flex justify-between sm:space-x-20">
      <div class="flex sm:space-x-12 space-x-8 items-center text-gray-500/75">
        <button @click="addSentiment(sentence, 1)" :class="{ 'cursor-default': isMobile }">
          <ThumbUpIcon
            :class="[userSentiment == 1 ? 'text-green-400/80 hover:text-green-500' : 'hover:text-gray-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <button @click="addSentiment(sentence, 0)" :class="{ 'cursor-default': isMobile }">
          <SwitchVerticalIcon
            :class="[userSentiment == 0 ? 'text-yellow-400/80 hover:text-yellow-500' : 'hover:text-gray-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <button @click="addSentiment(sentence, -1)" :class="{ 'cursor-default': isMobile }">
          <ThumbDownIcon
            :class="[userSentiment == -1 ? 'text-red-400/80 hover:text-red-500' : 'hover:text-gray-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

            <button @click="addSentiment(sentence, -3)" :class="{ 'cursor-default': isMobile }">
          <BanIcon 
           :class="[userSentiment == -3 ? 'text-gray-800 hover:text-gray-900' : 'hover:text-gray-500']"
          class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="text-sm flex space-x-8 sm:space-x-12">
        <DisclosureButton
          :class="[
            resolvedDiscussion ? 'text-green-500 hover:text-green-600' :
              discussionExists ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-500/75 hover:text-gray-600',
            isMobile ? 'cursor-default' : ''
          ]"
        >
          <ChatIcon class="h-6 w-6" aria-hidden="true" />
        </DisclosureButton>

    
        <Menu as="div" class="relative">
          <MenuButton class="w-full h-full" :class="{ 'cursor-default': isMobile }">
            <DotsVerticalIcon
              class="text-gray-500/75 hover:text-gray-600 h-6 w-6"
              aria-hidden="true"
            />
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
                    :href="sentence.permalink"
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
      <CommentSection :sentence="sentence" :isMobile="isMobile" :openPanel="openPanel" />
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

import {
  SwitchVerticalIcon,
  DotsVerticalIcon,
  ShareIcon,
  LinkIcon,
  TrashIcon,
  ThumbUpIcon, ThumbDownIcon,BanIcon
} from "@heroicons/vue/outline";
import { ChatIcon } from "@heroicons/vue/outline";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import CommentSection from "./CommentSection.vue";

const props = defineProps({
  sentence: Object,
  isMobile: Boolean,
});


const store = useMainStore();

let copyLink = $ref("https://peaceful-murdock-181b26.netlify.app/link/" + props.sentence.id);

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


const fullComment = ref(false)



const openWhatsApp = () => {
  window.open(
    "https://api.whatsapp.com/send?text=https://peaceful-murdock-181b26.netlify.app/link/" +
    props.sentence.id,
    "_blank"
  );
};

const addSentiment = (sentence, sentiment) => {
  store.addSentiment(sentence, sentiment);
};
const removeComment = (sentence) => {
  store.removeComment(sentence);
};



const activeDiscussion = computed(() => props.sentence.discussion && !props.sentence.discussion.discussionResolved && props.sentence.discussion.comments.length > 0)

const discussionExists = computed(() => props.sentence.discussion && props.sentence.discussion.comments.length > 0)

const resolvedDiscussion = computed(() => props.sentence.discussion && props.sentence.discussion.discussionResolved && props.sentence.discussion.comments.length > 0)

const current_user = computed(() => store.current_user.name);

const userSentiment = computed(() => props.sentence.sentiments[current_user.value].value);





</script>

<style>
</style>