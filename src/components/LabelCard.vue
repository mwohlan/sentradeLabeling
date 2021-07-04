<template>
  <article>
    <div>
      <h2 class="text-sm font-medium text-gray-900">
        {{ post.threadTitle }}
      </h2>
    </div>
    <div class="mt-2 text-sm text-gray-700 space-y-4" v-html="post.content" />
    <div class="mt-6 flex justify-between space-x-8">
      <div class="flex space-x-10 items-center">
        <button class="text-green-500 hover:text-green-600">
          <ThumbUpIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button class="text-red-500 pt-1 hover:text-red-600">
          <ThumbDownIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="text-sm flex space-x-8">
        <button class="text-gray-400 pt-1 hover:text-gray-500">
          <LinkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <button class="text-gray-400 hover:text-gray-500">
          <TrashIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import {
  ThumbUpIcon,
  TrashIcon,
  ThumbDownIcon,
  LinkIcon,
} from "@heroicons/vue/solid";
export default {
  components: {
    ThumbUpIcon,
    ThumbDownIcon,
    TrashIcon,
    LinkIcon,
  },
  props: {
      post: Object
  },
  setup(props) {

      return{ props}
  },
};
</script>

<style>
</style>