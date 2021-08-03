<template>
  <div>
    <main>
            <router-view  v-slot="{Component}">
      <transition name="component-fade" mode="out-in" appear>
           <component :is="Component"/>
      </transition>
            </router-view>
    </main>
  </div>
</template>


<style >

.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.2s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0.6;
}
</style>
