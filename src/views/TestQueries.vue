<template>
    <div class="h-full overflow-auto">
      <div @click="toggle" m-6 p-1 w-15 h-6 bg-gray-400 rounded-full relative op-30 flex>
        <div class="shadow bg-white h-4 w-4 rounded-full duration-375" :class=" move ? 'translate-x-8.75' : 'translate-x-0' "></div>
      </div>
    <div class="mb-2">
      Info on the right bottom corner
    </div>
    <div ref="el" class="max-w-100 relative area bg-white dark:bg-gray-800 shadow-lg z-60">
      Target Element (scroll down)
    </div>
    <div class="h-screen mt-96 bg-blue-200"></div>
  </div>
  <div class="absolute bottom-3  m-3 area shadow-lg">
    Element
   {{isVisible}}
    the viewport
  </div>

</template>


<script setup>

import { ref } from 'vue'
import { useElementVisibility,useToggle } from '@vueuse/core'
const [move,toggle] = useToggle(false)
const el = ref(null)
const isVisible = useElementVisibility(el)
</script>
