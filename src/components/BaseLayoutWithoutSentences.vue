
<template>
  <div class="h-full">
    <div class="flex h-screen bg-slate-200/70">
      <MobileSidebar
        @closeSidebar="sidebarOpen = false"
        :sidebarOpen="sidebarOpen"
        :navigation="navigation"
      />
      <DesktopSidebar :navigation="navigation" />

      <div class="flex-1 overflow-y-scroll">
        <Header @openSidebar="sidebarOpen = !sidebarOpen" />
        
        <slot></slot>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import MobileSidebar from "../components/MobileSidebar.vue";
import DesktopSidebar from "./DesktopSidebar.vue";
import navigation from "../composables/navigationItems";
import { useMainStore } from "../store";
import { useRoute } from "vue-router";
import { ref, watchEffect, watch } from "vue";
import Header from "./Header.vue";


const sidebarOpen = ref(false);
const store = useMainStore();
const route = useRoute();
const currentRouteName = ref("");


const disableListAnimation = ref(false);





const unsubStats = ref(store.setStats());


watchEffect((onInvalidate) => {
  currentRouteName.value = route.name;
  navigation.forEach((navItem) => {
    navItem.current = route.name == navItem.to.name ? true : false;
  });
  onInvalidate(() => {
    unsubStats.value();
  });
});
</script>








