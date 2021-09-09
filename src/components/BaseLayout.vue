
<template>
  <div class="h-full">
    <div class="h-screen flex bg-gray-100">
      <MobileSidebar
        @closeSidebar="sidebarOpen = false"
        :sidebarOpen="sidebarOpen"
        :navigation="navigation"
      /> 
      <DesktopSidebar :navigation="navigation" />

      <div
        id="scrollArea"
        class="flex-1 overflow-x-hidden overflow-y-auto focus:outline-none relative pb-20 lg:pb-32"
      >
        <SearchHeader
          v-model:filterTerm="filterTerm"
          @openSidebar="sidebarOpen = true"
          :currentRouteName="currentRouteName"
        />

        <transition-group
          class="relative mt-8 max-w-2xl xl:max-w-4xl 2xl:max-w-5xl sm:mx-auto space-y-6 mx-3 lg:space-y-9"
          :name="disableListAnimation ? 'search' : 'list'"
          tag="ul"
          appear
        >
          <LabelCard
            v-for="sentence in sentences"
            :key="sentence.id"
            :sentence="sentence"
            :isMobileDevice="isMobileDevice"
            :hideSentiments="hideSentiments"
          />
        </transition-group>
        <div id="intersect"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import createIntersectionObserver from "../helper/createIntersectionObserver"
import checkForMobileDevice from "../helper/checkForMobileDevice"
import LabelCard from "../components/LabelCard.vue";
import MobileSidebar from "../components/MobileSidebar.vue";
import DesktopSidebar from "./DesktopSidebar.vue";
import SearchHeader from "./SearchHeader.vue";
import navigation from "../composables/navigationItems";
import { useMainStore } from "../store";
import { useRoute } from "vue-router";
import { onMounted, ref, watchEffect, computed, watch } from "vue";
const props = defineProps({
  sentences: Map,
});
const emit = defineEmits(["scrollReload"]);

const sidebarOpen = ref(false);
const store = useMainStore();
const route = useRoute();
const currentRouteName = ref("");

const filterTerm = ref("")

const disableListAnimation = ref(false);



watch(filterTerm, () => {
  disableListAnimation.value = true;
  setTimeout(() => {
    disableListAnimation.value = false
  }, 2000)
})

const isMobileDevice = ref(checkForMobileDevice());

const sentences = computed(() => [...props.sentences.values()]
  .filter(sentence => filterTerm.value === ""
    || sentence.body.toLowerCase().includes(filterTerm.value.toLowerCase())
    || sentence.submissionTitle.toLowerCase().includes(filterTerm.value.toLowerCase())
    || sentence.subredditName.toLowerCase().includes(filterTerm.value.toLowerCase())
    || sentence.flair && sentence.flair.toLowerCase().includes(filterTerm.value.toLowerCase())
  ))


const unsubStats = ref(store.setStats());

const hideSentiments = computed(() => {
  return route.meta.hideSentiments
}
)
let intersectionObserver
onMounted(() => {
  intersectionObserver = createIntersectionObserver('#scrollArea', '#intersect', filterTerm, emit)
  if (store.users.length == 0) {
    store.setUsers();
  }


});

watchEffect((onInvalidate) => {
  currentRouteName.value = route.name;
  navigation.forEach((navItem) => {
    navItem.current = route.name == navItem.to.name ? true : false;
  });
  onInvalidate(() => {
    unsubStats.value();
    intersectionObserver.disconnect()
  });
});
</script>

<style scoped>
.search-move {
  transition: transform 0.6s ease-in-out;
}

.search-leave-active {
  transition: transform 0.5s linear, opacity 0.5s ease-in-out;
  position: absolute;
  width: 100%;
}

.search-enter-active {
  transition: transform 0.5s linear, opacity 0.5s ease-in-out;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 0.6s ease-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(15%);
}

.list-enter-active {
  transition: transform 0.8s, opacity 0.8s;
}

.list-leave-active {
  position: absolute;
  width: 100%;
  transition: transform 0.8s, opacity 0.8s;
}
</style>





