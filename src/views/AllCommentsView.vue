
<template>
 
  <base-layout @scrollReload="scrollReload()" :comments="comments" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted, ref, computed, watchEffect, toRefs } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

   const queryFunctions = ref(null);

    onMounted(() => {
      queryFunctions.value = store.setAllComments();
    });

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        queryFunctions.value.unsub();
      });
    });

    const scrollReload = () => {
      queryFunctions.value.executeScrollQuery();
    };

    return {
      sidebarOpen,
      comments: computed(() => store.allComments),
      scrollReload,
    };
  },
};
</script>





