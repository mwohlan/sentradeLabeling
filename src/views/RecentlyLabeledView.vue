<template>
  <div>
    <ListTransition>
      <LabelCard v-for="sentence in sentences" :key="sentence.id" :sentence="sentence" />
    </ListTransition>
    <div id="intersect"></div>
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



const store = useMainStore();
store.loading = true
let queryParam = store.recentlyLabeledSentences.size ? store.recentlyLabeledSentences.size : 0;
if (store.recentlyLabeledSentences.size) {
  store.recentlyLabeledSentences.clear()
}

let unsub = store.setRecentlyLabeledSentences(queryParam);

const scrollReload = async () => {
  unsub();
  unsub = store.setRecentlyLabeledSentences(store.recentlyLabeledSentences.size + 8);
};

watchEffect((onInvalidate) => {
  onInvalidate(() => {
    unsub();
    intersectionObserver.disconnect();
  });
});



const { recentlyLabeledSentences: originalSentences, filterTerm } = storeToRefs(store)


const fuse = computed(() => new Fuse([...originalSentences.value.values()], {
  keys: ['body', 'submissionTitle', 'subredditName', 'flair'],
  threshold: 0.3,

}))

const sentences = computed(() =>
  filterTerm.value != "" ?
    fuse.value.search(filterTerm.value).map(fuse => fuse.item) :
    [...originalSentences.value.values()])




let intersectionObserver
onMounted(() => {
  intersectionObserver = createIntersectionObserver('#scrollArea', '#intersect', () => {
    if (filterTerm.value === "") {
       store.loading = true
      scrollReload()
     
    }
  })

});



</script>



