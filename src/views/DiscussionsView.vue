
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
    
    let unsub, updateLastDiscussionView;



    onMounted(()=>{
       if (store.sentencesWithDiscussions.size) {
        store.sentencesWithDiscussions.clear()
      }
      ({ unsub,updateLastDiscussionView} = store.setSentencesWithDiscussions(0));
    })

    
    
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
        updateLastDiscussionView();
      });
    });

   

    return {
      sidebarOpen,
      sentences: computed (() => store.sortedSentencesWithDiscussions),
      
    };
  },
};
</script>





