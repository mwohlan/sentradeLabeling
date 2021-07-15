
<template>

  <base-layout @scrollReload="scrollReload()" :comments="comments" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted, ref, computed, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    const {unsub, executeScrollQuery} = store.setCommentsWithSentiment();
    
    


    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    const scrollReload = () => {
        executeScrollQuery()
    }

    return {
      sidebarOpen,
      comments: computed(() =>store.commentsWithSentiment),
      scrollReload,
    };
  },
};
</script>
