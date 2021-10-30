
<template>

    <base-layout @scrollReload="scrollReload()" :sentences="sentences" />

</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { ref, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();


    let queryParam = store.recentlyLabeledSentences.size ? store.recentlyLabeledSentences.size : 0;
    if (store.recentlyLabeledSentences.size) {
      store.recentlyLabeledSentences.clear()
    }

    let unsub = store.setRecentlyLabeledSentences(queryParam);

    const scrollReload = async () => {
      unsub();
      unsub = store.setRecentlyLabeledSentences(store.recentlyLabeledSentences.size + 8);
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      sentences: store.recentlyLabeledSentences,
      scrollReload,
    };
  },
};
</script>




