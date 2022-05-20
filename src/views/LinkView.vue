<template>
  <div>
    <ListTransition
    >
      <LabelCard v-for="sentence in sentences" :key="sentence.id" :sentence="sentence" />
    </ListTransition>
  </div>
</template>

<script setup>

import { useMainStore } from "../store";
import LabelCard from "@/components/labelcard/LabelCard.vue";
import createIntersectionObserver from "../helper/createIntersectionObserver"
import { onMounted, ref, watchEffect, computed, watch } from "vue";
import Fuse from 'fuse.js'
import { storeToRefs } from "pinia";
import ListTransition from "@/components/labelcard/ListTransition.vue";


const props = defineProps({ id: String })



const store = useMainStore();
store.loading = true
let unsub = store.setLinkSentence(props.id);



const { linkSentence: originalSentences, filterTerm } = storeToRefs(store)

watchEffect((onInvalidate) => {
  onInvalidate(() => {
    unsub();
  });
});



const fuse = computed(() => new Fuse([...originalSentences.value.values()], {
  keys: ['body', 'submissionTitle', 'subredditName', 'flair'],
  threshold: 0.3,

}))

const sentences = computed(() =>
  filterTerm.value != "" ?
    fuse.value.search(filterTerm.value).map(fuse => fuse.item) :
    [...originalSentences.value.values()])





</script>




