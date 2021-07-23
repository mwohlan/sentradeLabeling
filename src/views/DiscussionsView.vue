
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
  setup() {
    const sidebarOpen = ref(false);
    const store = useMainStore();
    
    let unsub, updateLastDiscussionView;


    onMounted(()=>{
      ({ unsub,updateLastDiscussionView} = store.setCommentsWithDiscussions(0));
    })

    
    
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        unsub();
        updateLastDiscussionView();
      });
    });

   

    return {
      sidebarOpen,
      comments: computed (() => store.sortedCommentsWithDiscussions),
      
    };
  },
};
</script>





