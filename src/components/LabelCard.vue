<template>
  <Disclosure :defaultOpen="defaultOpen" as="li">
    <div>
      <h2 class="text-xs font-semibold text-gray-800">
        {{ comment.submissionTitle }}
      </h2>
    </div>
    <div class="mt-3 text-sm text-gray-800">{{ comment.body }}</div>
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
            comment.discussions && comment.discussions.length > 0
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-400 hover:text-gray-500',
          ]"
        >
          <ChatIcon class="h-6 w-6" aria-hidden="true" />
        </DisclosureButton>

        <button class="text-gray-400 hover:text-gray-500">
          <TrashIcon
            @click="removeComment(comment)"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
        <Menu as="div" class="relative">
          <MenuButton class="w-full h-full">
            <DotsVerticalIcon
              class="text-gray-400 hover:text-gray-500 h-6 w-6"
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
              class="
                absolute
                right-0
                w-32
                mt-2
                origin-top-right
                bg-white
                rounded-md
                shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none
              "
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
                    <LinkIcon class="h-6 w-6 mr-2" aria-hidden="true" />

                    Permalink
                  </a>
                </MenuItem>
                <MenuItem v-if="isMobile" v-slot="{ active }">
                  <a
                    :class="[
                      active ? ' text-gray-800 bg-gray-100' : 'text-gray-600',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    :href="
                      encodeURI(
                        'https://api.whatsapp.com/send?text=http://192.168.188.70:3000/link/' +
                          comment.id
                      )
                    "
                    target="_blank"
                  >
                    <ShareIcon
                      :active="active"
                      class="w-6 h-6 mr-2"
                      aria-hidden="true"
                    />
                    Share
                  </a>
                </MenuItem>
                <MenuItem v-if="isMobile" v-slot="{ active }">
                  <a
                    :class="[
                      active ? ' text-gray-800 bg-gray-100' : 'text-gray-600',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    :href="
                      encodeURI(
                        'https://api.whatsapp.com/send?text=https://peaceful-murdock-181b26.netlify.app/link/' +
                          comment.id
                      )
                    "
                    target="_blank"
                  >
                    <ShareIcon
                      :active="active"
                      class="w-6 h-6 mr-2"
                      aria-hidden="true"
                    />
                    Whatsapp
                  </a>
                </MenuItem>
                <MenuItem v-else v-slot="{ active }">
                  <button
                    :class="[
                      active ? ' text-gray-800 bg-gray-100' : 'text-gray-600',
                      'group flex  items-center w-full px-2 py-2 font-medium',
                    ]"
                    @click="copy(copyLink)"
                  >
                    <ShareIcon
                      :active="active"
                      class="w-6 h-6 mr-2"
                      aria-hidden="true"
                    />
                    Copy Link
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
      <DisclosurePanel>
        <div
          class="bg-gray-100 mt-3 shadow rounded sm:rounded-lg overflow-hidden"
        >
          <ul
            v-if="comment.discussions && comment.discussions.length > 0"
            class="space-y-3 py-2 px-4 sm:px-6"
          >
            <li
              v-for="discussion in comment.discussions"
              :key="discussion.created"
              class="flex"
            >
              <div class="flex-1 space-x-3">
                <div>
                  <div class="text-xs">
                    <a href="#" class="font-medium text-gray-900 capitalize">{{
                      discussion.user
                    }}</a>
                  </div>
                  <div class="mt-1 text-sm text-gray-700 flex flex-wrap">
                    <p class="whitespace-pre-line">{{ discussion.body }}</p>
                  </div>
                  <div class="flex flex-wrap justify-between">
                    <div class="mt-2 text-xs space-x-2">
                      <span class="text-gray-500"
                        ><UseTimeAgo
                          v-slot="{ timeAgo }"
                          :time="new Date(discussion.created)"
                        >
                          {{ timeAgo }}
                        </UseTimeAgo></span
                      >
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
                  <form
                    class="block sm:flex sm:gap-x-6"
                    @submit.prevent="addUserDiscussion()"
                  >
                    <div class="sm:flex-1">
                      <textarea
                        id="comment"
                        v-model="userDiscussion"
                        name="comment"
                        rows="2"
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
                      <button type="submit">
                        <reply-icon
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

<script>
import { useMainStore } from "../store";

import { useClipboard} from "@vueuse/core";

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
import { computed, onMounted } from "@vue/runtime-core";

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
    SwitchVerticalIcon,
    UseTimeAgo,
    MinusCircleIcon,
    PlusCircleIcon,
    ReplyIcon,
    Menu,
    MenuItem,
    MenuItems,
    MenuButton,
    DotsVerticalIcon,
    ShareIcon,
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

    const copyLink = ref("https://peaceful-murdock-181b26.netlify.app/"+props.comment.id);

    const { copy} = useClipboard();

    const isMobile = ref(false);
  
    onMounted(() => {

     
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          navigator.userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          navigator.userAgent.substr(0, 4)
        )
      ) {
        isMobile.value = true;
      }
    });

    const userSet = computed(
      () => new Set(store.users.map((user) => user.name))
    );

    const isLoading = ref(false);
    const openCommentSection = ref(false);

    const userDiscussion = ref("");

    const addSentiment = (comment, sentiment) => {
      isLoading.value = true;
      store.addSentiment(comment, sentiment);
      isLoading.value = false;
    };
    const removeComment = (comment) => {
      store.removeComment(comment);
    };

    const addUserDiscussion = () => {
      store.addUserDiscussion(props.comment, userDiscussion.value);
      openCommentSection.value = false;
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
      openCommentSection,
      isMobile,
      copy,
      copyLink,
      defaultOpen: computed(
        () => props.comment.discussions && props.comment.discussions.length > 0
      ),
    };
  },
};
</script>

<style>
</style>