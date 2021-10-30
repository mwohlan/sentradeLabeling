
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

    let queryParam = store.sentencesWithoutSentiment.size ? store.sentencesWithoutSentiment.size : 0;
    if (store.sentencesWithoutSentiment.size) {
      store.sentencesWithoutSentiment.clear()
    }

    let unsub = store.setSentencesWithoutSentiment(queryParam);

    const scrollReload = async () => {
      unsub();
      unsub = store.setSentencesWithoutSentiment(store.sentencesWithoutSentiment.size + 8);
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      sentences: store.sentencesWithoutSentiment,
      scrollReload,
    };
  },
};
</script>




