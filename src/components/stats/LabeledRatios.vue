<template>
    <StatsWrapper>
        <template #header>
            <slot></slot>
        </template>
        <template #content>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Week</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ ratios.week }}</div>
                </div>
            </div>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Month</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ ratios.month }}</div>
                </div>
            </div>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Week pred</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ ratios.weekpred }}</div>
                </div>
            </div>
            <div class="gap-x-4 flex justify-between">
                <div class="flex-1">Month Pred</div>
                <div class="flex gap-x-2 items-baseline">
                    <div class="text-indigo-500 font-semibold">{{ ratios.monthpred }}</div>
                </div>
            </div>
        </template>
    </StatsWrapper>
</template>

<script setup>
import StatsWrapper from './StatsWrapper.vue';

const props = defineProps({
    ratios: Object
})

</script>
