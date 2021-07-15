<template>
  <base-layout :comments="comments" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted, ref, computed, watchEffect } from "vue";

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
      unsub.value = store.setLinkComment(props.id);
    });

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub.value();
      });
    });

    return {
      sidebarOpen,
      comments: computed(() => store.linkComment),
    };
  },
};

</script>
