
<template>
  <base-layout @scrollReload="scrollReload()" :sentences="sentences" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import {  ref, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    let queryParam = store.sentencesWithSentiment.size ? store.sentencesWithSentiment.size : 0;
    if (store.sentencesWithSentiment.size) {
      store.sentencesWithSentiment.clear()
    }

    let unsub = store.setSentencesWithSentiment(queryParam);


    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    const scrollReload = () => {
      unsub()

      unsub = store.setSentencesWithSentiment(store.sentencesWithSentiment.size + 8)
    }

    return {
      sidebarOpen,
      sentences:store.sentencesWithSentiment,
      scrollReload,
    };
  },
};
</script>
