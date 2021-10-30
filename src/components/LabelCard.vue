<template>
  <Disclosure
    class="bg-white border border-slate-400/60 shadow-md sm:shadow-lg px-3 py-3 md:px-7 rounded-lg"
    :defaultOpen="activeDiscussion"
    #="{ open: openPanel }"
    as="li"
  >
    <div>
      <h2 class="text-xs font-medium text-slate-600">{{ sentence.submissionTitle }}</h2>
    </div>
    <div
      @click.prevent="sentence.commentBody.length > 1 ? fullComment = !fullComment : fullComment"
      :class="{ 'cursor-pointer': !isMobileDevice && sentence.commentBody.length > 1 }"
      class="mt-4 lg:mt-6 text-slate-800/90 text-[0.95rem]  font-bold leading-relaxed"
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
    <div class="mt-4 space-y-3 lg:mt-6">
      <div class="flex flex-wrap items-center lg:gap-x-6 gap-x-4">
        <div
          class="px-2 py-0.5 grid grid-cols-1 rounded-full text-xs bg-slate-200/70 text-slate-700"
        >{{ `${sentence.subredditName}` + `${sentence.flair ? ' / ' + `${sentence.flair}` : ''}` }}</div>
        <div
          class="px-2 py-0.5 rounded-full text-xs"
          :class="{
            'bg-red-200/70': sentence.score < -1,
            'bg-emerald-200/70': sentence.score > 1,
            'bg-amber-200/70': sentence.score >= -1 && sentence.score <= 1,
            'text-red-700': sentence.score < -1,
            'text-emerald-700': sentence.score > 1,
            'text-amber-700': sentence.score >= -1 && sentence.score <= 1,
          }"
        >{{ sentence.score }}</div>
      </div>

      <div
        v-if="!hideSentiments"
        class="flex justify-end items-center flex-wrap lg:gap-x-6 gap-x-4"
      >
        <button
          v-if="sentence.sentiments.conflict"
          @click="acceptConflict"
          class="px-2 py-0.5 border border-indigo-300 rounded-full text-xs font-medium shadow-md bg-indigo-200 text-indigo-700"
        >Accept Conflict</button>
        <template v-for="[user, value] of userMap" :key="user">
          <div
            v-if="sentence.sentiments[user].value != -2"
            class="px-2 py-0.5 rounded-full text-xs capitalize"
            :class="{
              'bg-red-200/70': sentence.sentiments[user].value == -1,
              'bg-emerald-200/70': sentence.sentiments[user].value == 1,
              'bg-slate-300': sentence.sentiments[user].value == -3,
              'bg-amber-200/70': sentence.sentiments[user].value == 0,
              'text-red-700': sentence.sentiments[user].value == -1,
              'text-emerald-700': sentence.sentiments[user].value == 1,
              'text-amber-700': sentence.sentiments[user].value == 0,
              'text-slate-900': sentence.sentiments[user].value == -3,
            }"
          >{{ user }}</div>
        </template>
      </div>
    </div>
    <div class="mt-6 flex justify-between sm:space-x-20">
      <div class="flex sm:space-x-12 space-x-8 items-center text-slate-500/75">
        <button
          @click="addSentiment(sentence, 1)"
          :class="{
            'cursor-default': isMobileDevice
          }"
        >
          <ThumbUpIcon
            :class="['text-emerald-400/80 hover:text-emerald-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <button
          @click="addSentiment(sentence, 0)"
          :class="{
            'cursor-default': isMobileDevice
          }"
        >
          <SwitchVerticalIcon
            :class="['text-amber-400/80 hover:text-amber-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <button
          @click="addSentiment(sentence, -1)"
          :class="{
            'cursor-default': isMobileDevice
          }"
        >
          <ThumbDownIcon
            :class="['text-red-400/80 hover:text-red-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <button
          @click="addSentiment(sentence, -3)"
          :class="{
            'cursor-default': isMobileDevice
          }"
        >
          <HandIcon
            :class="['text-slate-400 hover:text-slate-500']"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="text-sm flex space-x-5 sm:space-x-12">
        <DisclosureButton
          :class="[
            resolvedDiscussion ? 'text-emerald-500 hover:text-emerald-600' :
              discussionExists ? 'text-amber-500 hover:text-amber-600' : 'text-slate-500/75 hover:text-slate-600',
            isMobileDevice
              ? 'cursor-default' : ''
          ]"
        >
          <ChatIcon class="h-6 w-6" aria-hidden="true" />
        </DisclosureButton>

        <Menu as="div" class="relative">
          <MenuButton class="w-full h-full" :class="{
            'cursor-default': isMobileDevice
          }">
            <DotsVerticalIcon
              class="text-slate-500/75 hover:text-slate-600 h-6 w-6"
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
                      active ? ' text-slate-700 bg-slate-100' : 'text-slate-500',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    :href="sentence.permalink"
                    target="_blank"
                  >
                    <LinkIcon class="h-6 w-6 mr-2" aria-hidden="true" />Permalink
                  </a>
                </MenuItem>
                <MenuItem v-if="isMobileDevice
                " v-slot="{ active }">
                  <button
                    :class="[
                      active ? ' text-slate-700 bg-slate-100' : 'text-slate-500',
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
                      active ? ' text-slate-700 bg-slate-100' : 'text-slate-500',
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
      enter-active-class="duration-300 ease-out"
      enter-from-class="scale-90 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="duration-200 ease-out"
      leave-from-class=" scale-100 opacity-100"
      leave-to-class="scale-90 opacity-0"
    >
      <CommentSection
        :sentence="sentence"
        :isMobileDevice="isMobileDevice
        "
        :openPanel="openPanel"
      />
    </transition>
    <Toast :showToast="showToast" @closeToast="showToast = false">
      <div
        class="z-10 px-3 font-semibold py-3 text-indigo-500 bg-indigo-200 border-l-4 border-indigo-300 rounded-md shadow-md"
      >Link Copied!</div>
    </Toast>
  </Disclosure>
</template>

<script setup>
import { useMainStore } from "../store";
import { watchEffect } from 'vue';
import Toast from './Toast.vue';
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
  ThumbUpIcon, ThumbDownIcon, HandIcon
} from "@heroicons/vue/outline";
import { ChatIcon } from "@heroicons/vue/outline";


import CommentSection from "./CommentSection.vue";

const props = defineProps({
  sentence: Object,
  isMobileDevice: Boolean,
  hideSentiments: Boolean,
});

const store = useMainStore();

let copyLink = $ref("https://peaceful-murdock-181b26.netlify.app/link/" + props.sentence.id);
let showToast = $ref(false)
let { copy, copied } = $(useClipboard());
watchEffect(() => {
  if (copied) {
    showToast = true
  }
})

const acceptConflict = () => {
  store.acceptConflict(props.sentence)
}

let userMap = $computed(
  () =>
    new Map(
      store.users
        .map((user) => user.name)
        .sort()
        .map((userName) => [userName, userName])
    )
);




let fullComment = $ref(false)



const openWhatsApp = () => {
  window.open(
    "https://api.whatsapp.com/send?text=https://peaceful-murdock-181b26.netlify.app/link/" +
    props.sentence.id,
    "_blank"
  );
};

const addSentiment = (sentence, sentiment) => {
  if (sentiment != sentence.sentiments[`${store.current_user.name}`].value) {
    store.addSentiment(sentence, sentiment);
  }

};


let activeDiscussion = $computed(() => !props.sentence.discussion?.discussionResolved && props.sentence.discussion?.comments.length > 0)

let discussionExists = $computed(() => props.sentence.discussion?.comments.length > 0)

let resolvedDiscussion = $computed(() => props.sentence.discussion?.discussionResolved && props.sentence.discussion.comments.length > 0)








</script>

<style>
</style>