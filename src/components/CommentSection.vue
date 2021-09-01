<template>
    <div v-if="openPanel">
        <DisclosurePanel v-slot="{ close }" static>
            <div
                class="bg-gray-100 flex flex-col mt-3 shadow rounded sm:rounded-lg overflow-hidden"
            >
                <div class="flex justify-center mt-2">
                    <button
                        @click.prevent="changeDiscussionStatus"
                        v-if="resolvedDiscussion"
                        :class="{ 'cursor-pointer': !isMobile }"
                        class="flex items-center py-[0.06125rem]  px-2 rounded-full text-xs shadow font-semibold border border-green-300 bg-green-200/70 text-green-700"
                    >
                        <RefreshIcon class="h-4 w-4 mr-1" aria-hidden="true" />Resolved
                </button>
                    <button
                        :class="{ 'cursor-pointer':!isMobile }"
                        class="flex  px-2 py-[0.06125rem] rounded-full text-xs font-semibold shadow border border-yellow-300 bg-yellow-200/70 text-yellow-700"
                        @click.prevent="changeDiscussionStatus(); close(); "
                        v-else-if="activeDiscussion"
                    >
                        <RefreshIcon class="h-4 w-4 mr-1" aria-hidden="true" />Active
            </button>
                </div>

                <ul v-if="discussionExists" class="space-y-3 px-4 sm:px-6">
                    <li
                        v-for="userComment in sentence.discussion.comments"
                        :key="userComment.created"
                        class="flex"
                    >
                        <div class="flex-1 space-x-3">
                            <div>
                                <div class="text-xs flex justify-between">
                                    <div
                                        class="font-medium text-gray-900 capitalize"
                                    >{{ userComment.user }}</div>

                                    <div
                                        v-if="isUnseenPost(userComment)"
                                        class="bg-indigo-200 text-indigo-500 p-[0.1rem] rounded-full"
                                    > <FireIcon class="h-4 w-4" aria-hidden="true" /></div>
                                </div>
                                <div class="mt-1 text-sm text-gray-700 flex flex-wrap">
                                    <p class="whitespace-pre-line">{{ userComment.body }}</p>
                                </div>
                                <div class="flex flex-wrap justify-between">
                                    <div class="mt-2 text-xs space-x-2">
                                        <span class="text-gray-500">
                                            <UseTimeAgo
                                                v-slot="{ timeAgo }"
                                                :time="new Date(userComment.created)"
                                            >{{ timeAgo }}</UseTimeAgo>
                                        </span>
                                    </div>

                                    <div class="text-sm">
                                        <button
                                            @click="
                                            removeUserDiscussion(sentence, userComment.created)
                                            "
                                            class="text-gray-500 hover:text-gray-600"
                                            :class="{ 'cursor-default': isMobile }"
                                        >
                                            <TrashIcon
                                                class="h-4 w-4"
                                                :class="{
                                                    hidden: userComment.user !== current_user,
                                                }"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="flex items-center justify-center">
                    <button
                        class="pb-1"
                        v-if="discussionExists"
                        @click="openTextAreaWithButton = !openTextAreaWithButton"
                        :class="{ 'cursor-default': isMobile }"
                    >
                        <ArrowCircleDownIcon
                            class="h-6 w-6 ease duration-500"
                            :class="[openTextAreaWithButton ? 'rotate-180 text-red-500 hover:text-red-600' : 'rotate-0 text-green-500 hover:text-green-600']"
                        />
                    </button>
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
                        v-if="
                            openTextAreaSection
                        "
                        class="bg-gray-100 px-4 py-2 sm:px-6"
                    >
                        <div class="flex space-x-3">
                            <div class="min-w-0 flex-1">
                                <form
                                    class="block sm:flex sm:gap-x-6"
                                    @submit.prevent="addUserDiscussion()"
                                >
                                    <div class="sm:flex-1">
                                        <textarea
                                            id="sentence"
                                            v-model="userDiscussion"
                                            ref="textInput"
                                            name="sentence"
                                            rows="2"
                                            class="shadow-inner block w-full focus:ring-gray-400 focus:border-gray-400 sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="Add to discussion"
                                        />
                                    </div>
                                    <div class="mt-3 flex items-center justify-end">
                                        <button
                                            type="submit"
                                            :class="{ 'cursor-default': isMobile }"
                                        >
                                            <ReplyIcon
                                                class="h-6 w-6 text-gray-400 hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </DisclosurePanel>
    </div>
</template>

<script setup>

import { DisclosurePanel } from "@headlessui/vue";
import { UseTimeAgo } from "@vueuse/components";
import {

    ReplyIcon,
    TrashIcon,
    ArrowCircleDownIcon,
    RefreshIcon,
    
} from "@heroicons/vue/outline";

import{ FireIcon } from "@heroicons/vue/solid"
import { ref, computed } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core"


import { useMainStore } from "../store";

const props = defineProps({
    openPanel: Boolean,
    sentence: Object,
    isMobile: Boolean,
})

const store = useMainStore();



const openTextAreaWithButton = ref(false);

const openTextAreaSection = computed(() =>
    openTextAreaWithButton.value ||
    !props.sentence.discussion ||
    props.sentence.discussion.comments.length == 0
)



const userDiscussion = ref("");

const addUserDiscussion = () => {
    store.addUserDiscussion(props.sentence, userDiscussion.value);
    openTextAreaWithButton.value = false;
    userDiscussion.value = "";
};
const changeDiscussionStatus = () => {
    store.changeDiscussionStatus(props.sentence);
}

const removeUserDiscussion = (sentence, timestamp) => {
    store.removeUserDiscussion(sentence, timestamp);
};



const textInput = ref(null);

const lastDiscussionView = computed(() => store.stats.lastDiscussionView)
watchEffect(() => {

    if (textInput.value) {

        setTimeout(() => (textInput.value.focus()), 50);
    }
});




const current_user = computed(() => store.current_user.name);




const discussionExists = computed(() => props.sentence.discussion && props.sentence.discussion.comments.length > 0)

const activeDiscussion = computed(() => props.sentence.discussion && !props.sentence.discussion.discussionResolved && props.sentence.discussion.comments.length > 0)

const resolvedDiscussion = computed(() => props.sentence.discussion && props.sentence.discussion.discussionResolved && props.sentence.discussion.comments.length > 0)

const unreadDiscussions = computed(() => store.stats.unreadPosts[props.sentence.id] ? store.stats.unreadPosts[props.sentence.id] : [])

const isUnseenPost = (userComment) => (unreadDiscussions.value.includes(userComment.created)&& userComment.user != current_user.value)


</script>


