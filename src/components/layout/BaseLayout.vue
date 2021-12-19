
<template>
  <div class="h-full">
    <div class="h-screen flex bg-slate-200/70">
      <MobileSidebar
        @closeSidebar="store.openMobileMenu = false"
        :sidebarOpen="store.openMobileMenu"
      />
      <DesktopSidebar />

    
      <slot ></slot>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "@/store";
import MobileSidebar from "./MobileSidebar.vue";
import DesktopSidebar from "./DesktopSidebar.vue";
const store = useMainStore();

</script>

<style scoped>
</style>





