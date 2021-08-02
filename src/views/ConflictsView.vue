
<template>
<base-layout @scrollReload="scrollReload()" :comments="comments"></base-layout></template>

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

      onBeforeMount(() => {
      store.loading = true;
    })


    onMounted(() => {
      ({ unsub} = store.setCommentsWithConflicts(0));
    });

    const scrollReload = async () => {
      unsub()
      unsub = store.setCommentsWithConflicts(5).unsub;
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      comments: computed(() =>store.commentsWithConflicts),
      scrollReload,
    };
  },
};
</script>





