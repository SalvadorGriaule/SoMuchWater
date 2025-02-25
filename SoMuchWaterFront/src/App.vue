<script setup lang="ts">
import Push from './components/Push.vue';
const authWorker = new Worker(new URL('./assets/ts/openVerseWorker.ts', import.meta.url), { type: "module" })
</script>

<template>
  <header class="
  bg-blue-800 h-36 flex justify-end items-center flex-col space-y-2 pb-2">
    <div>
      <h1 class="text-[3.25rem] font-semibold text-center text-blue-400 md:text-7xl">SoMuchWater</h1>
    </div>
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <Push />
</template>

<style scoped></style>
