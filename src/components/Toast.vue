<template>
    <teleport to="main">
        <transition
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
         leave-to-class="-translate-y-full opacity-0"
        leave-from-class="translate-x-0 opacity-100"
       >
            
            <div
                v-if="showToast"
                class="absolute shadow-md transform duration-500 border-l-4 border-r-4  border-green-400 rounded-md z-10 top-4 right-10 text-green-800 bg-green-200 p-4 w-full max-w-[15rem]"
            >New Messages</div>
        </transition>
    </teleport>
</template>
<script setup>

import { watchEffect } from "@vue/runtime-core";


const props = defineProps({
    showToast: Boolean
})

const emit = defineEmits(['closeToast'])

watchEffect(() => {
    if (props.showToast) {
        setTimeout(() => {
            emit('closeToast')
        }, 2000)
    }
})

</script>
