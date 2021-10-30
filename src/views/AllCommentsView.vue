
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



    let queryParam = store.sentences.size ? store.sentences.size : 0;

    if (store.sentences.size) {
      store.sentences.clear()
    }

    let unsub = store.setAllSentences(queryParam);



    const scrollReload = async () => {
      unsub();
      unsub = store.setAllSentences(store.sentences.size + 8);
    };


    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });
    return {
      sidebarOpen,
      sentences: store.sentences,
      scrollReload,
    };
  },
};
</script>





