<template>
  <div class="flex-1 overflow-auto focus:outline-none">
    <div
      class="
        relative
        z-10
        flex-shrink-0 flex
        h-16
        bg-white
        border-b border-gray-200
        lg:border-none
      "
    >
      <button
        class="
          px-4
          border-r border-gray-200
          text-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-inset focus:ring-cyan-500
          lg:hidden
        "
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Search bar -->
      <div
        class="
          flex-1
          px-4
          flex
          justify-between
          sm:px-6
          lg:max-w-6xl
          lg:mx-auto
          lg:px-8
        "
      >
        <div class="flex-1 flex">
          <form class="w-full flex md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pointer-events-none
                "
                aria-hidden="true"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                class="
                  block
                  w-full
                  h-full
                  pl-8
                  pr-3
                  py-2
                  border-transparent
                  text-gray-900
                  placeholder-gray-500
                  focus:outline-none
                  focus:ring-0
                  focus:border-transparent
                  sm:text-sm
                "
                placeholder="Search Content"
                type="search"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
      <!-- Page header -->
      <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div
            class="
              md:flex
              md:items-center
              md:justify-between
              lg:border-t lg:border-gray-200
            "
          >
            <div class="flex-1 min-w-0">
              <!-- Profile -->
              <div class="flex items-center py-2">
                <div>
                  <dl
                    class="
                      mt-2
                      flex flex-wrap
                      gap-x-2
                      sm:ml-3
                      sm:mt-1
                      sm:flex-row sm:flex-wrap
                    "
                  >
                    <dd
                      class="
                        flex
                        items-center
                        text-sm text-gray-500
                        font-medium
                        sm:mr-6
                      "
                    >
                      <router-link
                        class="flex capitalize"
                        :to="{ name: 'Login' }"
                      >
                        <UserIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {{ user.name }}
                      </router-link>
                    </dd>
                    <dd
                      class="
                        flex
                        items-center
                        text-sm text-gray-500
                        font-medium
                        sm:mr-6
                        sm:mt-0
                      "
                    >
                      <PresentationChartLineIcon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      {{ count }}
                    </dd>
                    
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-3"
        >
          <LabelCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            class="bg-white px-4 py-6 shadow-lg rounded sm:p-4 sm:rounded-lg"
          />
        </div>

        <!-- Activity table (small breakpoint and up) -->
      </div>
    </main>
  </div>
</template>

<script>
import LabelCard from "../components/LabelCard.vue";
import { useMainStore } from "../store";

import { onMounted, ref, computed } from "vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  XIcon,
} from "@heroicons/vue/outline";
import {
  CashIcon,
  PresentationChartLineIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UserIcon,
  SearchIcon,
  ThumbUpIcon,
  TrashIcon,
  EyeIcon,
  ThumbDownIcon,
  LinkIcon,
} from "@heroicons/vue/solid";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "History", href: "#", icon: ClockIcon, current: false },
  { name: "Reports", href: "#", icon: DocumentReportIcon, current: false },
];
const secondaryNavigation = [
  { name: "Settings", href: "#", icon: CogIcon },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    BellIcon,
    CashIcon,
    PresentationChartLineIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MenuAlt1Icon,
    UserIcon,
    SearchIcon,
    XIcon,
    ThumbUpIcon,
    EyeIcon,
    ThumbDownIcon,
    TrashIcon,
    LinkIcon,
    LabelCard,
  },
  props: {
    posts: Array,
  },
  setup(props) {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    return {
      navigation,
      sidebarOpen,
      posts: computed(() => props.posts),
      user: computed(() => store.user),
      count: computed(() => "Label count: " + store.sentimentCount),
    };
  },
};
</script>

<style>
</style>