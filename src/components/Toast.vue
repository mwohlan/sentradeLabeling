<template>
    <teleport to="body">
        <transition
            enter-from-class="-translate-y-full opacity-0"
            enter-to-class="opacity-100 "
            leave-to-class="opacity-0 -translate-y-full"
            leave-from-class="opacity-100 "
        >
            <div
                v-if="showToast"
                class="absolute left-0 z-10 flex justify-center w-full duration-500 transform sm:justify-end sm:px-32 top-11 "
            >
                <slot></slot>
            </div>
        </transition>
    </teleport>
</template>
<script setup>

import { watchEffect } from "@vue/runtime-core";


const props = defineProps({
    showToast: {
        type: Boolean,
        default: false
    },
    duration: {
        type: Number,
        default: 3000
    }
})

const emit = defineEmits(['closeToast'])

watchEffect(() => {
    if (props.showToast) {
        setTimeout(() => {
            emit('closeToast')
        }, props.duration)
    }
})

</script>
