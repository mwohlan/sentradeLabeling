
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

    let unsub;

    onMounted(() => {
      let temp = store.setCommentsWithSentiment(0);

      unsub = temp.unsub;
    });
    
    


    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    const scrollReload = () => {
      unsub()
       unsub = store.setCommentsWithSentiment(5).unsub
    }

    return {
      sidebarOpen,
      comments: computed(() =>store.commentsWithSentiment),
      scrollReload,
    };
  },
};
</script>
