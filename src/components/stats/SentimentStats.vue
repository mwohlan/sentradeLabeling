<template>
    <div class="xl:px-4">
        <div class="py-4 px-3 flex-none bg-white shadow-lg rounded-xl">
            <h1 class="text-xl text-center font-bold text-slate-500">
                <slot></slot>
            </h1>
            <div class="mt-2">
                <div class="space-y-3 divide-y-2 divide-dashed divide-slate-300">
                    <div class="flex justify-center gap-x-5">
                        <template v-for="(userSentiment,index) in sentiments">
                            <div v-if="index === 0" class="space-y-3">
                                <div
                                    class="ml-3 text-slate-500 font-semibold capitalize"
                                >{{ userSentiment?.name }}</div>
                                <div class="gap-x-4 flex items-center">
                                    <ThumbUpIcon
                                        :class="['text-emerald-400/80']"
                                        class="h-[1.35rem]"
                                        aria-hidden="true"
                                    />
                                    <div
                                        class="text-emerald-500 font-semibold"
                                    >{{ getPercentage(userSentiment,1) }}</div>
                                </div>
                                <div class="gap-x-4 flex items-center">
                                    <ThumbDownIcon
                                        :class="['text-red-400/80']"
                                        class="h-[1.35rem]"
                                        aria-hidden="true"
                                    />
                                    <div class="text-red-500 font-semibold">{{ getPercentage(userSentiment,-1) }}</div>
                                </div>
                                <div class="gap-x-4 flex items-center">
                                    <SwitchVerticalIcon
                                        :class="['text-amber-400/80']"
                                        class="h-[1.35rem]"
                                        aria-hidden="true"
                                    />
                                    <div class="text-amber-500 font-semibold">{{ getPercentage(userSentiment,-0) }}</div>
                                </div>
                                <div class="gap-x-4 flex items-center">
                                    <HandIcon
                                        :class="['text-slate-400/80']"
                                        class="h-[1.35rem]"
                                        aria-hidden="true"
                                    />
                                    <div
                                        class="text-slate-500 font-semibold"
                                    >{{ getPercentage(userSentiment,-3) }}</div>
                                </div>

                                <div class="flex gap-x-4 items-center">
                                    <div
                                        :class="['text-slate-500/80']"
                                        class="h-[1.35rem] w-[1.35rem] i-fluent-autosum-24-filled"
                                        aria-hidden="true"
                                    />
                                    <div
                                        class="text-slate-700 font-semibold"
                                    >{{ userSentiment?.sentimentCounts?.total }}</div>
                                </div>
                            </div>
                            <div  v-else class="space-y-3 flex flex-col items-end">
                                <div
                                    class="text-slate-500 font-semibold capitalize"
                                >{{ userSentiment?.name }}</div>
                                <div class="gap-x-4 flex">
                                    <div
                                        class="text-emerald-500 font-semibold"
                                    >{{ getPercentage(userSentiment,1) }}</div>
                                </div>
                                <div class="gap-x-4 flex items-center">
                                    <div class="text-red-500 font-semibold">{{ getPercentage(userSentiment,-1) }}</div>
                                </div>
                                <div class="gap-x-4 flex items-center">
                                    <div class="text-amber-500 font-semibold">{{ getPercentage(userSentiment,0) }}</div>
                                </div>
                                <div class="gap-x-4 flex items-center">
                                    <div
                                        class="text-slate-500 font-semibold"
                                    >{{ getPercentage(userSentiment,-3) }}</div>
                                </div>
                                <div class="flex items-center gap-x-4">
                                    <div
                                        class="text-slate-700 font-semibold"
                                    >{{ userSentiment?.sentimentCounts?.total }}</div>
                                </div>
                            </div>
                        
                        </template>
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


const getPercentage = (userSentiment,targetSentiment) => {
    return `${Math.round(userSentiment.sentimentCounts[targetSentiment] * 100 / userSentiment.sentimentCounts.total) || 0}%`
}









</script>
