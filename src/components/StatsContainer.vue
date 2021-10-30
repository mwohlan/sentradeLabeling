<template>
    <div class="mx-auto space-y-8 max-w-5xl p-8">
        <div class="grid mx-auto  max-w-md xl:max-w-full xl:grid-cols-3 gap-4">
            <SentimentStats  :sentiments="overallSentiments">Overall Sentiments</SentimentStats>
            <SentimentStats
                :sentiments="sentimentCountHistory.oneWeekSentiments"
            >Sentiments last week</SentimentStats>
            <SentimentStats
                :sentiments="sentimentCountHistory.oneMonthSentiments"
            >Sentiments last month</SentimentStats>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <GeneralStats :generalStats="generalStats" />
            <ConflictRatios :conflictRatios="conflictRatios" />
            <LabeledRatios :ratios="labeledRatios">Labeled ratios</LabeledRatios>
            <LabeledRatios :ratios="fullyLabeledRatios">Fully labeled ratios</LabeledRatios>
        </div>
    </div>
</template>


<script setup>
import SentimentStats from "./SentimentStats.vue";
import ConflictRatios from './ConflictRatios.vue';
import { oneWeekAgoInMillis, oneMonthAgoInMillis } from '../helper/storeHelpers';
import { useMainStore } from '../store';
import { computed } from "@vue/reactivity";
import LabeledRatios from "./LabeledRatios.vue";
import GeneralStats from "./GeneralStats.vue";


const store = useMainStore();




const overallSentiments = computed(() => {
    let overallSentiments = []
    for (const userStat of store.userStats?.values()) {
        overallSentiments.push({ name: userStat.name, sentimentCounts: userStat.sentimentCounts })
    }
    return overallSentiments

})


const sentimentCountHistory = computed(() => {
    let oneWeekSentiments = []
    let oneMonthSentiments = []
    for (const userStat of store.userStats?.values()) {
        let aggregatedWeekCount = { '-3': 0, '-1': 0, '0': 0, '1': 0, 'total': 0, 'newTotal': 0 }
        let aggregatedMonthCount = { '-3': 0, '-1': 0, '0': 0, '1': 0, 'total': 0, 'newTotal': 0 }
        for (const [day, sentimentCounts] of Object.entries(userStat.sentimentCountHistory)) {
            if (day >= oneWeekAgoInMillis()) {
                for (const [key, value] of Object.entries(sentimentCounts)) {
                    aggregatedWeekCount[key] += value
                    aggregatedMonthCount[key] += value
                }
            }
            if (day >= oneMonthAgoInMillis() && day < oneWeekAgoInMillis()) {
                for (const [key, value] of Object.entries(sentimentCounts)) {
                    aggregatedMonthCount[key] += value
                }
            }
        }
        oneWeekSentiments.push({ name: userStat.name, sentimentCounts: aggregatedWeekCount })
        oneMonthSentiments.push({ name: userStat.name, sentimentCounts: aggregatedMonthCount })
    }

    return { oneWeekSentiments, oneMonthSentiments }
})



const conflictRatios = computed(() => {
    let conflictRatios = {
        overall: {
            fullyLabeled: 0,
            conflicts: 0
        }, 'week': {
            fullyLabeled: 0,
            conflicts: 0
        }, 'month': {
            fullyLabeled: 0,
            conflicts: 0
        }
    }


    if (store.generalStats) {
        for (const [day, events] of Object.entries(store.generalStats?.conflictHistory ?? {})) {
            if (day >= oneWeekAgoInMillis()) {
                conflictRatios['week'].fullyLabeled += events.fullyLabeled
                conflictRatios['week'].conflicts += events.conflicts ?? 0
            }
            if (day >= oneMonthAgoInMillis()) {
                conflictRatios['month'].fullyLabeled += events.fullyLabeled
                conflictRatios['month'].conflicts += events.conflicts ?? 0
            }
            conflictRatios.overall.fullyLabeled += events.fullyLabeled
            conflictRatios.overall.conflicts += events.conflicts ?? 0
        }
    }


    return conflictRatios
})

const generalStats = computed(() => {
    return {
        labeled: store.generalStats?.labeledSentences?.total,
        fullyLabeled: store.generalStats?.labeledSentences?.totalFullyLabeled,
        conflicts: store.generalStats?.labeledSentences?.totalConflicts,
        unlabeled: store.generalStats?.unlabeledSentences

    }
})

const fullyLabeledRatios = computed(() => {
    return {
        week: conflictRatios.value['week'].fullyLabeled,
        month: conflictRatios.value['month'].fullyLabeled,
        weekpred: generalStats.value.fullyLabeled + conflictRatios.value['week'].fullyLabeled,
        monthpred: generalStats.value.fullyLabeled + Math.round(conflictRatios.value['week'].fullyLabeled * 30 / 7)

    }
})

const labeledRatios = computed(() => {
    let weekNewTotal = 0
    let monthNewTotal = 0
    for (const sentiments of sentimentCountHistory.value.oneWeekSentiments) {
        weekNewTotal += sentiments.sentimentCounts.newTotal
    }
    for (const sentiments of sentimentCountHistory.value.oneMonthSentiments) {
        monthNewTotal += sentiments.sentimentCounts.newTotal
    }

    return {
        week: weekNewTotal,
        month: monthNewTotal,
        weekpred: generalStats.value.labeled + weekNewTotal,
        monthpred: generalStats.value.labeled + Math.round(weekNewTotal * 30 / 7)

    }
})

</script>
