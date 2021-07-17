
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
            <div class="absolute top-0 right-0 -mr-12 pt-2"></div>

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
        <div class="flex-shrink-0 w-32" aria-hidden="true">
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
    <div
      ref="scrollComponent"
      @scroll.passive="handleScroll"
      class="flex-1 overflow-auto focus:outline-none"
    >
      <div
        class="
          sticky
          top-0
          z-10
          flex-shrink-0 flex
          h-14
          bg-white
          border-b border-gray-200
          lg:border-none
        "
        :class="{ shadow: shadow }"
      >
        <button
          class="px-4 border-r border-gray-200 text-gray-400 lg:hidden"
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
                  :placeholder="'Search ' + currentRouteName"
                  type="search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <main class="flex-1 relative pb-32 sm:pb-16">
        <!-- Page header -->
        <div class="bg-white shadow">
          <div class="lg:max-w-7xl lg:mx-auto">
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
                  <div class="mt-2 flex flex-wrap justify-around flex-1">
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
                        {{ current_user.name }}
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
                      <ClipboardCheckIcon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      {{ stats.sentimentCount }}
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
                      <DocumentDuplicateIcon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                      {{ stats.unlabeledComments }}
                    </div>

                    <div
                      v-if="testMode"
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
          <div class="max-w-6xl mx-auto flex flex-col">
            <transition-group
              name="list"
              tag="ul"
              class="relative overflow-hidden"
            >
              <LabelCard
                v-for="(comment, index) in comments"
                :key="comment.id"
                :comment="comment"
                :isMobile="isMobile"
                class="
                  bg-white
                  shadow-md
                  sm:shadow-lg
                  rounded
                  p-3
                  sm:rounded-lg
                  list-item
                  mb-5
                  mx-2
                "
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
import { useMainStore } from "../store";
import { useRoute } from "vue-router";

import { onMounted, ref, watchEffect, computed, onUnmounted } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  DocumentReportIcon,
  MenuAlt1Icon,
  MailIcon,
  UserGroupIcon,
  ChatIcon,
  SwitchVerticalIcon,
  ClipboardCheckIcon,
  DocumentDuplicateIcon,
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
    name: "Unlabeled",
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
    XIcon,
    PlusIcon,
    MailIcon,
    UserGroupIcon,
    ChatIcon,
    SwitchVerticalIcon,
    ClipboardCheckIcon,
    DocumentDuplicateIcon,
  },
  props: {
    comments: Array,
  },
  emits: ["scrollReload"],
  setup(props, { emit }) {
    const sidebarOpen = ref(false);
    const store = useMainStore();
    const route = useRoute();
    const currentRouteName = ref("");
    const testMode = ref(false);
    const scrollComponent = ref(null);

    const shadow = ref(false);

    const handleScroll = ({
      target: { scrollTop, clientHeight, scrollHeight },
    }) => {
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        console.log(scrollTop, clientHeight, scrollHeight);
        emit("scrollReload");
      }

      if (scrollTop === 0) {
        shadow.value = false;
      } else {
        shadow.value = true;
      }
    };

    const isMobile = ref(false);

    const listener = ref(null);

    onMounted(() => {
      if (store.users.length == 0) {
        store.setUsers();
      }
      listener.value = store.setSentimentCount();
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

    watchEffect((onInvalidate) => {
      currentRouteName.value = route.name;
      navigation.forEach((navItem) => {
        navItem.current = route.name == navItem.to.name ? true : false;
      });
      onInvalidate(() => {
        listener.value();
      });
    });

    const addRandomComment = () => {
      store.addRandomComment();
    };

    return {
      navigation,
      sidebarOpen,
      posts: computed(() => props.comments),
      current_user: computed(() => store.current_user),
      stats: computed(() => store.stats),
      allCommentsRoute: computed(() => route.name == "all comments"),
      addRandomComment,
      currentRouteName,
      testMode,
      handleScroll,
      scrollComponent,
      shadow,
      isMobile,
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
  transform: translatex(20%);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>





