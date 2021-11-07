<template>
    <div v-if="openPanel">
        <DisclosurePanel v-slot="{ close }" static>
            <div
                class="bg-slate-100 flex flex-col mt-3 shadow rounded sm:rounded-lg overflow-hidden"
            >
                <div v-if="discussionExists" class="flex justify-center mt-2">
                    <button
                        :class="[{ 'cursor-pointer': !isMobileDevice }, 'flex  w-[5.5rem] duration-500 items-center py-[0.06125rem] px-2 rounded-full text-xs shadow font-semibold border', resolvedDiscussion ? 'border-emerald-300 bg-emerald-200/70 text-emerald-700' : ' gap-x-2 border-amber-300 bg-amber-200/70 text-amber-700']"
                        @click.prevent="changeDiscussionStatus"
                    >
                        <RefreshIcon
                            class="h-4 w-4 mr-1 flex-shrink-0"
                            :class="{ 'animate-spin': statusChange }"
                            aria-hidden="true"
                        ></RefreshIcon>
                        {{ resolvedDiscussion ? 'Resolved' : 'Active' }}
                    </button>
                </div>
                <ul class="space-y-3 px-4 sm:px-6" v-if="discussionExists">
                    <li
                        class="flex"
                        v-for="userComment in sentence.discussion.comments"
                        :key="userComment.created"
                    >
                        <div class="flex-1 space-x-3">
                            <div>
                                <div class="text-xs flex justify-between">
                                    <div
                                        class="font-medium text-slate-900 capitalize"
                                    >{{ userComment.user }}</div>
                                    <div
                                        class="bg-indigo-200 text-indigo-500 p-[0.1rem] rounded-full"
                                        v-if="isUnseenPost(userComment)"
                                    >
                                        <FireIcon class="h-4 w-4" aria-hidden="true"></FireIcon>
                                    </div>
                                </div>
                                <div class="mt-1 text-sm text-slate-700 flex flex-wrap">
                                    <p class="whitespace-pre-line">{{ userComment.body }}</p>
                                </div>
                                <div class="flex flex-wrap justify-between">
                                    <div class="mt-2 text-xs space-x-2">
                                        <span
                                            class="text-slate-500"
                                        >{{ getTimeAgo(userComment.created) }}</span>
                                    </div>
                                    <div class="text-sm">
                                        <button
                                            class="text-slate-500 hover:text-slate-600"
                                            @click="
                                                removeUserDiscussion(sentence, userComment.created)
                                            "
                                            :class="{ 'cursor-default': isMobileDevice }"
                                        >
                                            <TrashIcon
                                                class="h-4 w-4"
                                                :class="{
                                                    hidden: userComment.user !== current_user,
                                                }"
                                                aria-hidden="true"
                                            ></TrashIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="flex items-center justify-center">
                    <button
                        class="pb-2"
                        v-if="discussionExists"
                        @click="openTextAreaWithButton = !openTextAreaWithButton"
                        :class="{ 'cursor-default': isMobileDevice }"
                    >
                        <PlusCircleIcon
                            class="h-6 w-6 ease duration-500"
                            :class="[openTextAreaWithButton ? 'rotate-45 text-red-500 hover:text-red-600' : 'rotate-0 text-emerald-500 hover:text-emerald-600']"
                        ></PlusCircleIcon>
                    </button>
                </div>
            </div>
            <transition
                enter-active-class=" duration-300 ease-out"
                enter-from-class=" scale-90 opacity-0"
                enter-to-class=" scale-100 opacity-100"
                leave-active-class=" duration-200 ease-out"
                leave-from-class=" scale-100 opacity-100"
                leave-to-class=" scale-90 opacity-0"
                
            >
                <div
                    class="bg-white mt-3"
                    v-if="
                        openTextAreaSection
                    "
                >
                    <form class="relative flex " @submit.prevent="addUserDiscussion()">
                        <textarea
                            class=" shadow-inner flex-grow focus:ring-transparent focus:border-indigo-300 sm:text-sm border-2 border-slate-300 rounded-md"
                            id="sentence"
                            v-model="userDiscussion"
                            ref="textInput"
                            name="sentence"
                            rows="4"
                            placeholder="Write your comment here.."
                        ></textarea>

                        <button
                            type="submit"
                            class="absolute gap-x-2 flex  bottom-2 right-3 text-sm text-white font-semibold bg-indigo-500/80 py-1 px-2 rounded  shadow"
                            :class="{ 'cursor-default': isMobileDevice }"
                        >
                            <ReplyIcon
                                class=" self-start h-[1.08rem]"
                               
                            ></ReplyIcon>
                            <div class="self-center">Post</div> 
                        </button>
                    </form>
                </div>
            </transition>
        </DisclosurePanel>
    </div>
</template>

<script setup>

import { DisclosurePanel } from "@headlessui/vue";
import { useTimeAgo } from "@vueuse/core";
import {

    ReplyIcon,
    TrashIcon,
   PlusCircleIcon,
    RefreshIcon,

} from "@heroicons/vue/outline";

import { FireIcon } from "@heroicons/vue/solid"
import { ref, computed } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core"


import { useMainStore } from "../store";

const props = defineProps({
    openPanel: Boolean,
    sentence: Object,
    isMobileDevice: Boolean,
})

const store = useMainStore();

const statusChange = ref(false)


const openTextAreaWithButton = ref(false);

const openTextAreaSection = computed(() =>
    openTextAreaWithButton.value ||
    !props.sentence.discussion ||
    props.sentence.discussion.comments.length == 0
)

const getTimeAgo = (date) => {
    return useTimeAgo(new Date(date)).value
}
const userDiscussion = ref("");

const addUserDiscussion = () => {
    store.addUserDiscussion(props.sentence, userDiscussion.value);
    openTextAreaWithButton.value = false;
    userDiscussion.value = "";
};
const changeDiscussionStatus = () => {
    statusChange.value = true;
    setTimeout(() => statusChange.value = false, 1000)
    store.changeDiscussionStatus(props.sentence);
}

const removeUserDiscussion = (sentence, timestamp) => {
    store.removeUserDiscussion(sentence, timestamp);
};



const textInput = ref(null);


watchEffect(() => {


    if (textInput.value) {

        setTimeout(() => (textInput.value.focus()), 50);
    }
});




const current_user = computed(() => store.current_user.name)




const discussionExists = computed(() => props.sentence.discussion?.comments.length > 0)

const resolvedDiscussion = computed(() => props.sentence.discussion?.discussionResolved && props.sentence.discussion?.comments.length > 0)

const unreadDiscussions = computed(() => store.userStats.get(current_user.value.id)?.unreadPosts ? store.userStats.get(current_user.value.id)?.unreadPosts[props.sentence.id] ?? [] : [])

const isUnseenPost = (userComment) => (unreadDiscussions.value.includes(userComment.created) && userComment.user != current_user.value)


</script>


