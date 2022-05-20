
<template>
  <div>
    <ListTransition>
      <LabelCard  :data-index="index" v-for="sentence,index in sentences" :key="sentence.id" :sentence="sentence" />
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
let queryParam = store.sentencesWithoutSentiment.size ? store.sentencesWithoutSentiment.size : 0;
if (store.sentencesWithoutSentiment.size) {
  store.sentencesWithoutSentiment.clear()
}

let unsub = store.setSentencesWithoutSentiment(queryParam);

const scrollReload = async () => {
  unsub();
  unsub = store.setSentencesWithoutSentiment(store.sentencesWithoutSentiment.size + 8);
};

watchEffect((onInvalidate) => {
  onInvalidate(() => {
    unsub();
    intersectionObserver.disconnect()
  });
});


const { sentencesWithoutSentiment: originalSentences, filterTerm } = storeToRefs(store)


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


