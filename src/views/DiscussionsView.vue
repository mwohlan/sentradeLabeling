
<template>
  <base-layout :posts="posts"/>
</template>

<script>
import LabelCard from "../components/LabelCard.vue";
import LabelList from "../components/LabelList.vue";
import BaseLayout from "../components/BaseLayout.vue";
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
    LabelList,
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    onMounted( () => {
      if (store.discussionPosts.length == 0) {
        store.setDiscussionPosts();
        store.setSentimentCount();
      }
    });

    return {
      sidebarOpen,
      posts: computed(() => store.discussionPosts),
    };
  },
};
</script>





