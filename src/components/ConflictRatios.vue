<template>
    <div class="p-4 flex-none bg-white shadow-lg rounded-xl">
        <h1 class="text-xl text-center font-bold text-slate-500">Conflict Ratios</h1>
        <div class="mt-2">
            <div class="space-y-3">
                <div class="flex justify-between">
                    <div class="space-y-3 flex-1 text-slate-500 font-semibold">
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Overall</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div
                                    class="text-indigo-500 font-semibold"
                                >{{overallRatio}}</div>
                                <div v-if="overallRatio !== 'Not available'"
                                    class="text-slate-500 text-xs"
                                >({{ conflictRatios?.overall.conflicts }} of {{ conflictRatios?.overall.fullyLabeled }})</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Week</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div
                                    class="text-indigo-500 font-semibold"
                                >{{ weekRatio}}</div>
                                <div v-if="weekRatio !== 'Not available'"
                                    class="text-slate-500 text-xs"
                                >({{ conflictRatios?.week.conflicts }} of {{ conflictRatios?.week.fullyLabeled }})</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Month</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div
                                    class="text-indigo-500 font-semibold"
                                >{{ monthRatio }}</div>
                                <div v-if="monthRatio !== 'Not available'"
                                    class="text-slate-500 text-xs"
                                >({{ conflictRatios?.month.conflicts }} of {{ conflictRatios?.month.fullyLabeled }})</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
    conflictRatios: Object
})

const getRatio = (amountConflicts, amountFullyLabeled) => {
    return amountFullyLabeled == 0 ? 'Not available' : `${Math.round(amountConflicts * 100 / amountFullyLabeled)}%`

}

const overallRatio = computed(()=>{
   return getRatio(props.conflictRatios.overall.conflicts, props.conflictRatios.overall.fullyLabeled)
}
)

const weekRatio = computed(()=>{
   return getRatio(props.conflictRatios.week.conflicts, props.conflictRatios.week.fullyLabeled)
}
)

const monthRatio = computed(()=>{
   return getRatio(props.conflictRatios.month.conflicts, props.conflictRatios.month.fullyLabeled)
}
)





</script>
