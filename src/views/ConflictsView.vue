
<template>
  <base-layout @scrollReload="scrollReload()" :sentences="sentences"></base-layout>
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
    let queryParam = store.sentencesWithConflicts.size ? store.sentencesWithConflicts.size : 0;
    if (store.sentencesWithConflicts.size) {
      store.sentencesWithConflicts.clear()
    }
    let unsub = store.setSentencesWithConflicts(queryParam);





    const scrollReload = async () => {
      unsub()

      unsub = store.setSentencesWithConflicts(store.sentencesWithConflicts.size + 8);
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      sentences:  store.sentencesWithConflicts,
      scrollReload,
    };
  },
};
</script>





