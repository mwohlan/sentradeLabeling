
<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        static
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="sidebarOpen = false"
        :open="sidebarOpen"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="
              relative
              flex-1 flex flex-col
              max-w-xs
              w-full
              pt-5
              pb-4
              bg-cyan-700
            "
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  class="
                    ml-1
                    flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-full
                    focus:outline-none
                    focus:ring-2 focus:ring-inset focus:ring-white
                  "
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center gap-x-2 px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg"
                alt="Easywire logo"
              />
              <div class="text-2xl text-cyan-200 font-bold">Sentrade</div>
            </div>
            <nav
              class="
                mt-5
                flex-shrink-0
                h-full
                divide-y divide-cyan-800
                overflow-y-auto
              "
              aria-label="Sidebar"
            >
              <div class="px-2 space-y-1">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    item.current
                      ? 'bg-cyan-800 text-white'
                      : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </router-link>
              </div>
            </nav>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto"
        >
          <div class="flex items-center gap-x-2 flex-shrink-0 px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg"
              alt="Sentrade Logo"
            />
            <div class="text-2xl text-cyan-200 font-bold">Sentrade</div>
          </div>

          <nav
            class="
              mt-5
              flex-1 flex flex-col
              divide-y divide-cyan-800
              overflow-y-auto
            "
            aria-label="Sidebar"
          >
            <div class="px-2 space-y-1">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.current
                    ? 'bg-cyan-800 text-white'
                    : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                  'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- Cards  !-->
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
                  :placeholder="'Search '+ currentRouteName"
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
                <div class="flex items-center py-1">
                    <div
                      class="
                        mt-2
                        flex flex-wrap
                        justify-around
                        flex-1
                      "
                    >
                      <div
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
                      </div>
                      <div
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
                      </div>
                      <div
                        class="
                          flex
                          items-center
                          text-sm text-gray-500
                          font-medium
                          sm:mr-6
                          sm:mt-0
                        "
                      >
                        <button
                          type="button"
                          @click="addRandomComment"
                          class="
                            inline-flex
                            items-center
                            px-1
                            py-1
                            border border-transparent
                            shadow-sm
                            text-sm
                            leading-4
                            font-medium
                            rounded-md
                            text-white
                            bg-green-500
                            hover:bg-green-600
    
                            
                          "
                        >
                          <PlusIcon
                            class="-ml-0.5 mr-2 h-5 w-5"
                            aria-hidden="true"
                           
                          />
                          Comment
                        </button>
                      </div>
                    </div>
      
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <div
            class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col"
          >
          <transition-group v-if="!allCommentsRoute" name="list" tag="ul" class=" relative">
            <LabelCard
              v-for="(post,index) in posts.slice(0,5)"
              :key="post.id"
              :post="post"
              class="bg-white px-4 py-6 shadow-lg rounded sm:p-4 sm:rounded-lg list-item"
              :class="{'mt-5':index!=0}"
            />
          </transition-group>
           <transition-group v-else name="list" tag="ul" class=" relative">
            <LabelCard
              v-for="(post,index) in posts"
              :key="post.id"
              :post="post"
              class="bg-white px-4 py-6 shadow-lg rounded sm:p-4 sm:rounded-lg list-item"
              :class="{'mt-5':index!=0}"
            />
          </transition-group>
          </div>

          <!-- Activity table (small breakpoint and up) -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import LabelCard from "../components/LabelCard.vue";
import LabelList from "../components/LabelList.vue";
import { useMainStore } from "../store";
import { useRoute } from "vue-router";

import { onMounted, ref, watchEffect, computed } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ClockIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  MailIcon,
  UserGroupIcon,
  ChatIcon,
  SwitchVerticalIcon
} from "@heroicons/vue/outline";
import {
  PresentationChartLineIcon,
  UserIcon,
  SearchIcon,
  XIcon,
  PlusIcon,
} from "@heroicons/vue/solid";

const navigation = [
  {
    name: "Unlabled",
    to: { name: "unlabeled" },
    icon: MailIcon,
    current: false,
  },
  {
    name: "Labeled by Others",
    to: { name: "labeled by others" },
    icon: UserGroupIcon,
    current: false,
  },
   {
    name: "Conflicts",
    to: { name: "conflicts" },
    icon: SwitchVerticalIcon,
    current: false,
  },
  {
    name: "Discussions",
    to: { name: "discussions" },
    icon: ChatIcon,
    current: false,
  },
  {
    name: "All Comments",
    to: { name: "all comments" },
    icon: DocumentReportIcon,
    current: false,
  },
  
];

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    PresentationChartLineIcon,
    MenuAlt1Icon,
    UserIcon,
    SearchIcon,
    LabelCard,
    LabelList,
    XIcon,
    PlusIcon,
    MailIcon,
    UserGroupIcon,
    ChatIcon,
    SwitchVerticalIcon
  },
  props: {
    posts: Array,
  },
  setup(props) {
    const sidebarOpen = ref(false);
    const store = useMainStore();
    const route = useRoute();
    const currentRouteName = ref('')


    watchEffect(() => {
      currentRouteName.value = route.name
      navigation.forEach((navItem) => {
        navItem.current = route.name == navItem.to.name ? true : false;
      });
    });

   
    const addRandomComment = () => {
      store.addRandomComment()
    }

    onMounted(() => {
      if (store.users.length == 0) {
        store.setUsers();
      }
    });

    return {
      navigation,
      sidebarOpen,
      posts: computed(() => props.posts),
      user: computed(() => store.user),
      count: computed(() => "Label count: " + store.sentimentCount),
      allCommentsRoute: computed(() => route.name == "AllCommentsView"),
      addRandomComment,
      currentRouteName
    };
  },
};
</script>

<style>

.list-item {
  transition: all 0.4s linear;
 
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translatex(50%);
}

.list-leave-active {
  position: absolute;
}

</style>





