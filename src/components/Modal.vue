<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="$emit('closeModal')">
            <div class="flex items-center justify-center min-h-screen">
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-gray-500/75" />
                </TransitionChild>

                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-10 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div class="bg-white rounded-lg p-4 transform overflow-hidden shadow-xl">
                        <div>
                            <div
                                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                            >
                               
                            </div>
                            <div class="mt-3 text-center sm:mt-5">
                                <DialogTitle
                                    as="h3"
                                    class="text-lg leading-6 font-medium text-gray-900"
                                >Payment successful</DialogTitle>
                                <div class="mt-2">
                                    <p
                                        class="text-sm text-gray-500"
                                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6">
                            <button
                                type="button"
                                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none  sm:text-sm"
                                @click="$emit('closeModal')"
                            >Go back to dashboard</button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>


<script setup>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
    open: Boolean
});

defineEmits(['closeModal'])



</script>
