<template>
  <main class="h-screen bg-slate-200/70">
    <login-page v-if="routeName === 'Login'" />
    <base-layout v-else>
      <div
        id="scrollArea"
        ref="scrollTarget"
        class="flex-1 overflow-x-hidden overflow-y-scroll focus:outline-none relative pb-20 lg:pb-32"
      >
        <search-header v-if="routeName !== 'stats'" />
        <Header v-else />

        <router-view v-slot="{ Component }">
          <transition
            leave-active-class="duration-200"
            leave-to-class="op-0 -translate-x-15%"
            mode="out-in"

          >
            <component :key="routeName" :is="Component" />
          </transition>
        </router-view>
      </div>
    </base-layout>
    <loading-bar />
  </main>
</template>


<script setup>
import LoadingBar from "./components/BottomLoadingBar.vue"
import BaseLayout from "./components/BaseLayout.vue";
import { useRoute } from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import SearchHeader from "./components/SearchHeader.vue";
import Header from "./components/Header.vue";
import { computed, onUnmounted, ref, watch } from "vue";
import { useMainStore } from './store';
import navigation from './composables/navigationItems'
import checkForMobileDevice from "./helper/checkForMobileDevice";


const route = useRoute()
const routeName = computed(() => {
  return route.name
})

const store = useMainStore()

const unsubStats = ref(store.setStats())

store.setUsers()




store.isMobileDevice = checkForMobileDevice()


watch(() => route.meta.hideSentiments, () => {
  store.hideSentiments = route.meta.hideSentiments ? true : false
})

watch(() => route.name, () => {
  navigation.value = navigation.value.map(entry => { return { ...entry, current: routeName.value == entry.to.name } })
})



onUnmounted(() => unsubStats.value())

</script>





