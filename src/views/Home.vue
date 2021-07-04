
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
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
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
                </a>
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
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
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
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>

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
                      <dt class="sr-only">Company</dt>
                      <dd
                        class="
                          flex
                          items-center
                          text-sm text-gray-500
                          font-medium
                          capitalize
                          sm:mr-6
                        "
                      >
                        <UserIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Yanikovic
                      </dd>
                      <dt class="sr-only">Account status</dt>
                      <dd
                        class="
                          flex
                          items-center
                          text-sm text-gray-500
                          font-medium
                          sm:mr-6
                          sm:mt-0
                          capitalize
                        "
                      >
                        <PresentationChartLineIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        Stats
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-3">
            <LabelCard
              v-for="post in posts"
              :key="post.id"
              :post="post"
              class="bg-white px-4 py-6 shadow-lg rounded sm:p-4 sm:rounded-lg "
            />
          </div>

          <!-- Activity table (small breakpoint and up) -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "../firebase/config";
import LabelCard  from "../components/LabelCard.vue";

import { onMounted, ref } from "vue";
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
  ScaleIcon,
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
const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

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
  setup() {
    const sidebarOpen = ref(false);

    const questions = [
      {
        id: "81614",
        likes: "29",
        replies: "11",
        views: "2.7k",
        author: {
          name: "Dries Vincent",
          imageUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          href: "#",
        },
        date: "December 9 at 11:43 AM",
        datetime: "2020-12-09T11:43:00",
        href: "#",
        title: "What would you have done differently if you ran Jurassic Park?",
        body: "\n          <p>\n            Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.\n          </p>\n          <p>\n            Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;\n          </p>\n        ",
      },
      // More questions...
    ];

    const posts = ref([]);

    onMounted(async () => {
      try {
        const response = await projectFirestore.collection("posts").get();

        posts.value = response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        posts;
      } catch (error) {
        console.log(error);
      }
    });

    return {
      navigation,
      secondaryNavigation,
      cards,
      transactions,
      statusStyles,
      sidebarOpen,
      posts,
      questions,
    };
  },
};
</script>





