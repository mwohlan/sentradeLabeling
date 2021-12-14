<template>
    <div class="flex px-2 lg:py-3 py-1 sticky top-0 drop-shadow lg:mx-4 shadow-md z-10 bg-white sm:rounded-lg">
        <div class="text-slate-500 lg:hidden" @click="toggleMobileMenu()">
            <MenuIcon class="h-3.25rem w-3.25rem" aria-hidden="true" />
        </div>
        <div class="mx-auto flex gap-x-2 items-center justify-end lg:justify-center">
            <h1
                class="bg-clip-text text-transparent text-2xl md:text-4xl font-bold bg-gradient-to-r drop-shadow-xl from-indigo-400 to-indigo-600"
            >Sentrade Statshub</h1>
            <div
                i-iconoir-stats-report
                class="bg-gradient-to-r drop-shadow-xl from-indigo-400 to-indigo-600 w-10 h-10"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { MenuIcon } from "@heroicons/vue/outline";
import {useMainStore} from "../store"

const store = useMainStore()


const toggleMobileMenu = () => {
  store.openMobileMenu = !store.openMobileMenu;
  
}
</script>
