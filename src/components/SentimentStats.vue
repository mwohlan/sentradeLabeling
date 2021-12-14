<template>
    <div class="xl:px-4">
        <div class="py-4 px-3 flex-none bg-white shadow-lg rounded-xl">
            <h1 class="text-xl text-center font-bold text-slate-500">
                <slot></slot>
            </h1>
            <div class="mt-2">
                <div class="space-y-3 divide-y-2 divide-dashed divide-slate-300">
                    <div class="flex justify-center gap-x-10">
                        <div class="space-y-3">
                            <div
                                class="ml-3 text-slate-500 font-semibold capitalize"
                            >{{ sentiments[0]?.name }}</div>
                            <div class="gap-x-4 flex">
                                <ThumbUpIcon
                                    :class="['text-emerald-400/80']"
                                    class="h-[1.35rem]"
                                    aria-hidden="true"
                                />
                                <div
                                    class="text-emerald-500 font-semibold"
                                >{{getPercentage(0,1)}}</div>
                            </div>
                            <div class="gap-x-4 flex items-center">
                                <ThumbDownIcon
                                    :class="['text-red-400/80']"
                                    class="h-[1.35rem]"
                                    aria-hidden="true"
                                />
                                <div
                                    class="text-red-500 font-semibold"
                                >{{getPercentage(0,-1)}}</div>
                            </div>
                            <div class="gap-x-4 flex items-center">
                                <SwitchVerticalIcon
                                    :class="['text-amber-400/80']"
                                    class="h-[1.35rem]"
                                    aria-hidden="true"
                                />
                                <div
                                    class="text-amber-500 font-semibold"
                                >{{getPercentage(0,0)}}</div>
                            </div>
                            <div class="gap-x-4 flex items-center">
                                <HandIcon
                                    :class="['text-slate-400/80']"
                                    class="h-[1.35rem]"
                                    aria-hidden="true"
                                />
                                <div
                                    class="text-slate-500 font-semibold"
                                >{{getPercentage(0,-3)}}</div>
                            </div>

                            <div class="flex gap-x-4 items-center">
                                <div
                                    :class="['text-slate-500/80']"
                                    class="h-[1.35rem] w-[1.35rem] i-fluent-autosum-24-filled"
                                    aria-hidden="true"
                                />
                                <div
                                    class="text-slate-700 font-semibold"
                                >{{ sentiments[0]?.sentimentCounts.total }}</div>
                            </div>
                        </div>
                        <div class="space-y-3 flex flex-col items-end">
                            <div
                                class="text-slate-500 font-semibold capitalize"
                            >{{ sentiments[1]?.name }}</div>
                            <div class="gap-x-4 flex">
                                <div
                                    class="text-emerald-500 font-semibold"
                                >{{getPercentage(1,1)}}</div>
                            </div>
                            <div class="gap-x-4 flex items-center">
                                <div
                                    class="text-red-500 font-semibold"
                                >{{getPercentage(1,-1)}}</div>
                            </div>
                            <div class="gap-x-4 flex items-center">
                                <div
                                    class="text-amber-500 font-semibold"
                                >{{getPercentage(1,0)}}</div>
                            </div>
                            <div class="gap-x-4 flex items-center">
                                <div
                                    class="text-slate-500 font-semibold"
                                >{{getPercentage(1,-3)}}</div>
                            </div>
                            <div class="flex items-center gap-x-4">
                                <div
                                    class="text-slate-700 font-semibold"
                                >{{ sentiments[1]?.sentimentCounts.total }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {
    SwitchVerticalIcon,

    ThumbUpIcon, ThumbDownIcon, HandIcon
} from "@heroicons/vue/outline";


const props = defineProps({
    sentiments: Array
})


const getPercentage = (user,sentiment) => {
   return `${Math.round(props?.sentiments[user]?.sentimentCounts[sentiment] * 100 / props?.sentiments[user]?.sentimentCounts.total) || 0}%`
}









</script>
