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
import LabelCard from "@/components/LabelCard.vue";
import { ref, watchEffect, computed, watch } from "vue";
import Fuse from 'fuse.js'
import { storeToRefs } from "pinia";
import ListTransition from "@/components/ListTransition.vue";



const store = useMainStore();

const { unsub, updateUnreadPosts } = store.setSentencesWithDiscussions();


watchEffect((onInvalidate) => {
  onInvalidate(() => {
    unsub()
    updateUnreadPosts()
  });
});


const { sentencesWithDiscussions: originalSentences, filterTerm } = storeToRefs(store)


const fuse = computed(() => new Fuse([...originalSentences.value.values()], {
  keys: ['body', 'submissionTitle', 'subredditName', 'flair'],
  threshold: 0.3,

}))

const sentences = computed(() =>
  filterTerm.value != "" ?
    fuse.value.search(filterTerm.value).map(fuse => fuse.item) :
    [...originalSentences.value.values()])



</script>










