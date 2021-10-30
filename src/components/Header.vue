<template>
    <div
        class="px-2 py-3 sticky top-0 drop-shadow lg:mx-4 shadow-md z-10 bg-white  sm:rounded-lg"
    >
        <div
            class="absolute top-0 z-50  text-slate-500 lg:hidden"
            @click="$emit('openSidebar')"
        >
            <MenuIcon class="h-[3.25rem] w-[3.25rem]" aria-hidden="true" />
        </div>

        <!-- Search bar -->

        <div class="flex justify-center">
            <h1
                class="bg-clip-text text-transparent text-2xl md:text-4xl font-bold  bg-gradient-to-r drop-shadow-xl from-indigo-400 to-indigo-600"
            >Sentrade Statshub</h1>
        </div>
    </div>
</template>

<script setup>
import { MenuIcon } from "@heroicons/vue/outline";

const emit = defineEmits(['openSidebar']);

</script>
<style scoped>
</style>