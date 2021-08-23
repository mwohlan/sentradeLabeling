<template>
  <base-layout :sentences="sentences" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted, onBeforeMount, ref, computed, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  props: {
      id: String
  },
  setup(props) {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    const unsub = ref(null);



    onMounted(() => {
      unsub.value = store.setLinkSentence(props.id);
    });

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub.value();
      });
    });

    return {
      sidebarOpen,
      sentences: computed(() => store.linkSentence),
    };
  },
};

</script>
