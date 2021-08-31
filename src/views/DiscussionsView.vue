
<template>

  <base-layout :sentences="sentences" />
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
import { useMainStore } from "../store";

import { onMounted,onBeforeMount, ref, computed, watchEffect } from "vue";

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();
    
    let unsub, updateUnreadPosts;



    onMounted(()=>{
       if (store.sentencesWithDiscussions.size) {
        store.sentencesWithDiscussions.clear()
      }
      ({ unsub,updateUnreadPosts} = store.setSentencesWithDiscussions(0));
    })

    
    
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
        updateUnreadPosts();
      });
    });

   

    return {
      sidebarOpen,
      sentences: computed (() => store.sortedSentencesWithDiscussions),
      
    };
  },
};
</script>





