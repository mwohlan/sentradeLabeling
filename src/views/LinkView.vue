<template>
  <base-layout :sentences="sentences" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { ref,  watchEffect } from "vue";

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

    let unsub = store.setLinkSentence(props.id);

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
      });
    });

    return {
      sidebarOpen,
      sentences: store.linkSentence,
    };
  },
};

</script>
