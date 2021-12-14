<template>
    <div class="p-4 flex-none bg-white shadow-lg rounded-xl">
        <h1 class="text-xl font-bold text-center text-slate-500">General Stats</h1>
        <div class="mt-2">
            <div class="space-y-3">
                <div class="flex justify-between">
                    <div class="space-y-3 flex-1 text-slate-500 font-semibold">
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Labeled</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div class="text-indigo-500 font-semibold">{{ generalStats.labeled }}</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Fully Labeled</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div
                                    class="text-indigo-500 font-semibold"
                                >{{ generalStats.fullyLabeled }}</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Conflicts</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div
                                    class="text-indigo-500 font-semibold"
                                >{{ generalStats.conflicts }}</div>
                            </div>
                        </div>
                        <div class="gap-x-4 flex justify-between">
                            <div class="flex-1">Unlabeled</div>
                            <div class="flex gap-x-2 items-baseline">
                                <div
                                    class="text-indigo-500 font-semibold"
                                >{{ generalStats.unlabeled }}</div>
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
    generalStats: Object
})

</script>
