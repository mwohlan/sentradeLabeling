
<template>
<base-layout @scrollReload="scrollReload()" :sentences="sentences"></base-layout></template>

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
      let queryParam = store.sentencesWithConflicts.size ? store.sentencesWithConflicts.size : 0;
      if (store.sentencesWithConflicts.size) {
        store.sentencesWithConflicts.clear()
      }
      ({ unsub} = store.setSentencesWithConflicts(queryParam));
    });

    const scrollReload = async () => {
      unsub()
     
      unsub = store.setSentencesWithConflicts(5).unsub;
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      sentences: computed(() =>store.sentencesWithConflicts),
      scrollReload,
    };
  },
};
</script>





