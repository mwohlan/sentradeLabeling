<template>
  <div class="h-full overflow-auto">
    <button @click="toggle();  timeline(sequence)">Show</button>
    <!-- <Presence>
      <Motion
        :initial="{ opacity: 0, scale: 0.6, rotate: 0 }"
        :animate="{ opacity: 1, scale: 1, rotate: 45 }"
        :exit="{ opacity: 0, scale: 0.6, rotate: 0 }"
        flex
        items-center
        justify-center
        v-if="move"
      >
        <div h-30 w-30 bg-blue-500></div>
      </Motion>
    </Presence> -->

    <div flex gap-2 ml-5>
      <div ref="one" class="one" h-30 w-30 bg-blue-500></div>
      <div ref="two" class="two" h-30 w-30 bg-blue-500></div>
    </div>
  </div>
</template>


<script setup>
import { Motion, Presence } from "motion/vue"
import { timeline } from 'motion';
import { onMounted, ref } from 'vue'
import { useElementVisibility, useToggle } from '@vueuse/core'
const [move, toggle] = useToggle(true)
const el = ref(null)
const show = ref(true)
const one = ref(null)
const two = ref(null)
const sequence = [
 
 
]

onMounted(() => {
  sequence.push( [one.value, { rotate: [0,100] }, { duration: 2 }], [two.value, { rotate: [0,100 ]}, { duration: 2,at:"-1.5" }])
 
})
const isVisible = useElementVisibility(el)
</script>
