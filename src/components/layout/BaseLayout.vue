
<template>
  <div class="h-full">
    <div class="h-screen flex bg-slate-200/70">

      <MobileSidebar
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
import MobileSidebarNew from "./MobileSidebarNew.vue";
const store = useMainStore();

</script>

<style scoped>
</style>





