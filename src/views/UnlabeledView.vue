
<template>
  <base-layout @scrollReload="scrollReload()" :sentences="sentences" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted, onBeforeMount, ref, computed, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();
    let unsub;

    onMounted(() => {
      let queryParam = store.sentencesWithoutSentiment.size ? store.sentencesWithoutSentiment.size : 0;
      if (store.sentencesWithoutSentiment.size) {
        store.sentencesWithoutSentiment.clear()
      }

      ({ unsub } = store.setSentencesWithoutSentiment(queryParam));
    });

    const scrollReload = async () => {
      unsub();
      unsub = store.setSentencesWithoutSentiment(5).unsub;
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      sentences: computed(() => store.sentencesWithoutSentiment),
      scrollReload,
    };
  },
};
</script>




