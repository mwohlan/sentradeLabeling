
<template>
  <base-layout @scrollReload="scrollReload()" :comments="comments" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted,onBeforeMount, ref, computed, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();


    let unsub;
   
  
    onMounted(() => {

     ({ unsub} = store.setAllComments(0));
    });

    const scrollReload = async () => {
      unsub();
      unsub = store.setAllComments(5).unsub;
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        store.loading = true;
        unsub();
      });
    });
    return {
      sidebarOpen,
      comments: computed(() => store.allComments),
      scrollReload,
    };
  },
};
</script>





