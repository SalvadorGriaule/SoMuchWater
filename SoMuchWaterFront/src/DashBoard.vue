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
    <section>
        <ul>
            <li v-for="(elem, index) in listWP" :class="result[index] ? '' : 'hidden'">
                <div class="flex flex-col items-center" :class="(index % 2 == 0 ? 'bg-blue-300' : 'bg-blue-400')">
                    <p class="text-center p-1">
                        {{ elem.name }} consomme {{ elem.water_print }} Litre d'eau pour {{ elem.quantité }} produit
                    </p>
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
            </li>
        </ul>
    </section>
</template>