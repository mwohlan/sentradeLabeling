
<template>
  <base-layout :comments="comments"/>
</template>

<script>
import LabelCard from "../components/LabelCard.vue";
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
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    onMounted( () => {
      if (store.allComments.length == 0) {
        store.setAllComments();
        store.setSentimentCount();
      }
    });

    return {
      sidebarOpen,
      comments: computed(() => store.allComments),
    };
  },
};
</script>





