<template>

        <transition-group
            class="relative mt-8 max-w-2xl xl:max-w-4xl 2xl:max-w-5xl sm:mx-auto space-y-6 mx-3 lg:space-y-9"
            :name="disableListAnimation ? 'search' : 'list'"
            tag="ul"
            appear
        >
            <slot></slot>
        </transition-group>

</template>


<script setup>

import { useMainStore } from "../../store";

import { ref, watch } from "vue";

import { storeToRefs } from "pinia";


const store = useMainStore();
const disableListAnimation = ref(false);
const { filterTerm } = storeToRefs(store)
watch(filterTerm, () => {
    disableListAnimation.value = true;
    setTimeout(() => {
        disableListAnimation.value = false
    }, 2000)
})


</script>


<style  scoped>
:deep(.search-move ){
    transition: transform 0.6s ease-in-out;
}

:deep(.search-leave-active) {
    transition: transform 0.5s linear, opacity 0.5s ease-in-out;
    position: absolute;
    width: 100%;
}

:deep(.search-enter-active) {
    transition: transform 0.5s linear, opacity 0.5s ease-in-out;
}

:deep(.search-leave-to) {
    opacity: 0;
}


:deep(.search-enter-from) {
    opacity: 0;
}


:deep(.list-move) {
    transition: transform 0.6s ease-out;
}


:deep(.list-leave-to) {
    opacity: 0;
    transform: translateX(15%);
}

:deep(.list-enter-from) {
    opacity: 0;
    transform: translateX(15%);
}








:deep(.list-enter-active) {
    transition: transform 0.3s, opacity 0.3s;
}

:deep(.list-leave-active) {
    position: absolute;
    width: 100%;
    transition: transform 0.3s, opacity 0.3s;
}
</style>