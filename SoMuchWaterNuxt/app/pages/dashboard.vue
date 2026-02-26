<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})

import { computed, ref, type Ref } from 'vue';
import { arrData } from '../assets/ts/useFetch';
import SearchEngine from '../components/SearchEngine.vue';
import StateWorker from '../components/StateWorker.vue';
import Listing from '../components/Listing.vue'


const bcAuth = new BroadcastChannel("authChannel")
bcAuth.postMessage([useToken().value])

let listWP: void | Ref<Data[] | Data[]> = await arrData("http://127.0.0.1:8000/waterprint/")
let inputSearch: Ref<string> = ref("")
let result: Ref<any[]> = ref([])

const dynaSearch = computed(() => {
    result
})

</script>

<template>
    <section class="w-full flex items-center flex-col pt-2 bg-slate-400">
        <h1 class="text-2xl font-semibold">DashBoard</h1>
        <StateWorker />
        <SearchEngine :tab="listWP" v-model:input="inputSearch" @search="(e) => result = e" />
    </section>
    <section class="flex flex-wrap m-2 justify-center">
       <Listing v-if="inputSearch == '' " :list="listWP" role="admin" />
       <Listing v-else :list="result" role="admin" />
          
    </section>
</template>