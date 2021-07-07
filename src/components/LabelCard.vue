<template>
  <li>
    <div>
      <h2 class="text-sm font-medium text-gray-900">
        {{ post.threadTitle }}
      </h2>
    </div>
    <div class="mt-3 text-sm text-gray-700 space-y-4">{{ post.content }}</div>
    <div class="mt-3 gap-y-4 flex flex-wrap gap-x-2 justify-end">
      <template v-for="(value, key) in post" :key="key">
        <div
          v-if="userSet.has(key)"
          class="items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="{
            'bg-red-100': value == 0,
            'bg-green-100': value == 1,
            'bg-gray-100': value == -1,
            'text-red-800': value == 0,
            'text-green-800': value == 1,
            'text-gray-800': value == -1,
          }"
        >
          {{ key }}
        </div>
      </template>
    </div>
    <div class="mt-6 flex justify-between md:justify-start space-x-20">
      <div class="flex space-x-10 items-center">
        <button
          @click="addSentiment(post, 1)"
          class="text-green-500 hover:text-green-600"
        >
          <ThumbUpIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button class="text-red-500 pt-1 hover:text-red-600">
          <ThumbDownIcon
            @click="addSentiment(post, 0)"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="text-sm flex space-x-8">
        <button :class="[post.discussion ? 'text-yellow-500 hover:text-yellow-600' :'text-gray-400 hover:text-gray-500' ]">
          <ChatIcon
            @click="addDiscussion(post.id, !post.discussion)"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <a
          class="text-gray-400 pt-1 hover:text-gray-500"
          :href="post.link"
          target="_blank"
        >
          <LinkIcon class="h-6 w-6" aria-hidden="true" />
        </a>
        <button  class="text-gray-400 hover:text-gray-500">
          <TrashIcon
            @click="removePost(post.id)"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import { useMainStore } from "../store";
import {
  ThumbUpIcon,
  TrashIcon,
  ThumbDownIcon,
  LinkIcon,
} from "@heroicons/vue/solid";
import { ChatIcon } from "@heroicons/vue/outline";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    ThumbUpIcon,
    ThumbDownIcon,
    TrashIcon,
    LinkIcon,
    ChatIcon,
  },
  props: {
    post: Object,
  },
  setup() {
    const store = useMainStore();

    const userSet = computed(
      () => new Set(store.users.map((user) => user.name))
    );
    const addDiscussion = (postId, discussion) => {
      store.addDiscussion(postId, discussion);
    };

    const isLoading = ref(false);

    const addSentiment = async (post, sentiment) => {
      isLoading.value = true;
      await store.addSentiment(post, sentiment);
      isLoading.value = false;
    };
    const removePost = (postId) => {
      store.removePost(postId);
    };

    return { addSentiment, removePost, addDiscussion, isLoading, userSet };
  },
};
</script>

<style>
</style>