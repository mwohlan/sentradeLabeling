
<template>
  <base-layout @scrollReload="scrollReload()" :sentences="sentences" />
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
      let queryParam = store.sentences.size ? store.sentences.size : 0;
      if (store.sentences.size) {
        store.sentences.clear()
      }

      ({ unsub } = store.setAllSentences(queryParam));
    });

    const scrollReload = async () => {
      unsub();
      unsub = store.setAllSentences(5).unsub;
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });
    return {
      sidebarOpen,
      sentences: computed(() => store.sentences),
      scrollReload,
    };
  },
};
</script>





