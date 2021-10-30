<template>
    <div class="p-4 flex-none bg-white shadow-lg rounded-xl">
        <h1 class="text-xl font-bold text-center text-slate-500"><slot></slot></h1>
        <div class="mt-2">
            <div class="space-y-3">
                <div class="flex justify-between">
                    <div class="space-y-3 flex-1 text-slate-500 font-semibold">
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Week</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div class="text-indigo-500 font-semibold">{{ratios.week}}</div>

                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Month</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div class="text-indigo-500 font-semibold">{{ratios.month}}</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Week pred</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div class="text-indigo-500 font-semibold">{{ratios.weekpred}}</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Month Pred</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div class="text-indigo-500 font-semibold">{{ratios.monthpred}}</div>
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
    ratios: Object
})

</script>
