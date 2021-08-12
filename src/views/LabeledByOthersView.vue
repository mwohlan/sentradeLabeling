
<template>
  <base-layout @scrollReload="scrollReload()" :comments="comments" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted, ref, onBeforeMount, computed, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    let unsub;

    onMounted(() => {
      if (store.commentsWithSentiment.size) {
        store.commentsWithSentiment.clear()
      }

      ({ unsub } = store.setCommentsWithSentiment(0));
    });




    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        store.loading = true;
        unsub();
      });
    });

    const scrollReload = () => {
      unsub()

      unsub = store.setCommentsWithSentiment(5).unsub
    }

    return {
      sidebarOpen,
      comments: computed(() => store.commentsWithSentiment),
      scrollReload,
    };
  },
};
</script>
