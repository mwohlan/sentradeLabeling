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
                                <div class="text-indigo-500 font-semibold">{{Math.round(conflictRatios?.overall.conflicts*100/conflictRatios?.overall.fullyLabeled)}}%</div>
                                <div class="text-slate-500 text-xs">({{conflictRatios?.overall.conflicts}} of {{conflictRatios?.overall.fullyLabeled}})</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Week</div>
                            <div class="flex gap-x-2 items-baseline">
                                 <div class="text-indigo-500 font-semibold">{{Math.round(conflictRatios?.week.conflicts*100/conflictRatios?.week.fullyLabeled)}}%</div>
                                <div class="text-slate-500 text-xs">({{conflictRatios?.week.conflicts}} of {{conflictRatios?.week.fullyLabeled}})</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Month</div>
                            <div class="flex gap-x-2 items-baseline">
                                 <div class="text-indigo-500 font-semibold">{{Math.round(conflictRatios?.month.conflicts*100/conflictRatios?.month.fullyLabeled)}}%</div>
                                <div class="text-slate-500 text-xs">({{conflictRatios?.month.conflicts}} of {{conflictRatios?.month.fullyLabeled}})</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    conflictRatios: Object
})

</script>
