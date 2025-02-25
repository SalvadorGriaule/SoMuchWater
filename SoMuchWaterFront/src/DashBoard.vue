<script setup lang="ts">

import { computed, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'universal-cookie';
import { arrData } from './assets/ts/useFetch';
import SearchEngine from './components/SearchEngine.vue';
import StateWorker from './components/StateWorker.vue';

const router = useRouter();
const route = useRoute();
const cookies = new Cookies(null, { path: '/' });

const bcAuth = new BroadcastChannel("authChannel")
bcAuth.postMessage([cookies.get("admin")])

let listWP: Ref<Data[] | void> = ref(arrData("http://127.0.0.1:8000/waterprint/"))
let inputSearch: Ref<string> = ref("")
let result: Ref<boolean[]> = ref([])

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
        <div class="w-64 h-[33vh] my-2 mx-3 border-2 border-blue-700 rounded-md overflow-hidden" v-for="(elem, index) in listWP">
            <div class="h-1/2 overflow-hidden">
                <img :src="elem.path_img == null ? '/src/assets/Placeholder.svg': elem.path_img" :alt="elem.path_img == null ? 'placeholder' : elem.name">
            </div>
            <div class="flex flex-col h-1/2 bg-blue-300 p-2">
                <p>{{ elem.name }}</p>
                <p>Quantité d'eau {{ elem.water_print }} L</p>
                <p>Quantité produit {{ elem.quantité }}</p>
                <div>
                    <a class="w-full" :href="'/item/' + elem.id">
                        <input type="button" value="MODIFIER"
                            class="p-2 text-white bg-green-700 rounded-md my-2 mr-1 cursor-pointer">
                    </a>
                    <a class="w-full" :href="'/item/delete/' + elem.id">
                        <input type="button" value="SUPPRIMER"
                            class="p-2 text-white bg-red-700 rounded-md my-2 mr-1 cursor-pointer">
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>