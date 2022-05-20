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
import { watchEffect, computed, onMounted } from "vue";
import createIntersectionObserver from "@/helper/createIntersectionObserver";
import Fuse from 'fuse.js'
import { storeToRefs } from "pinia";
import ListTransition from "@/components/labelcard/ListTransition.vue";



const store = useMainStore();

store.loading = true


const { sortedSentencesWithDiscussions: originalSentences, filterTerm } = storeToRefs(store)

let queryParam = originalSentences.value.size ? originalSentences.value.size : 0;
if (originalSentences.value.size) {
  store.sentencesWithDiscussions.clear()
}


let { unsub, updateUnreadPosts } = store.setSentencesWithDiscussions(queryParam);

const scrollReload = async () => {
  unsub();
  unsub = store.setSentencesWithDiscussions(originalSentences.value.size + 8).unsub;
};

watchEffect((onInvalidate) => {
  onInvalidate(() => {
    unsub()
    updateUnreadPosts()
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










