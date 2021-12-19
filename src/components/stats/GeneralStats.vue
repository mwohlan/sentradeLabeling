<template>
    <StatsWrapper>
        <template #header>General Stats</template>
        <template #content>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Labeled</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ generalStats.labeled }}</div>
                </div>
            </div>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Fully Labeled</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ generalStats.fullyLabeled }}</div>
                </div>
            </div>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Conflicts</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ generalStats.conflicts }}</div>
                </div>
            </div>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Unlabeled</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ generalStats.unlabeled }}</div>
                </div>
            </div>
        </template>
    </StatsWrapper>
</template>


<script setup>
import StatsWrapper from './StatsWrapper.vue';


const props = defineProps({
    generalStats: Object
})

</script>
