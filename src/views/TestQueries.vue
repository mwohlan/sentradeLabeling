<template>
  <div>{{ userStats }}</div>
 
</template>

<script>
import { onMounted, computed } from 'vue';

import { useMainStore } from '../store';

export default {
  setup() {
    const store = useMainStore();
    


   store.setStats()

    return {
      userStats: computed(()=>store.userStats),
     
    }
  }
}
</script>

