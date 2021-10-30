
<template>
  <base-layout :sentences="sentences" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { ref, computed, watchEffect} from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();

    if (store.sentencesWithDiscussions.size) {
      store.sentencesWithDiscussions.clear()
    }
    const{ unsub, updateUnreadPosts } = store.setSentencesWithDiscussions();
  

  


    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
        updateUnreadPosts();
      });
    });



    return {
      sidebarOpen,
      sentences: computed(() => store.sortedSentencesWithDiscussions),

    };
  },
};
</script>





