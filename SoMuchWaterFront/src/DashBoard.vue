<script setup lang="ts">

import { computed, reactive, ref, type Ref } from 'vue';
import { arrData } from './assets/ts/useFetch';
import { useRoute, useRouter } from 'vue-router';
import SearchEngine from './components/SearchEngine.vue';

const router = useRouter();
const route = useRoute();

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
        <SearchEngine :tab="listWP" v-model:input="inputSearch" @search="(e) => result = e" />
    </section>
    <section>
        <ul>
            <li v-for="(elem, index) in listWP" :class="result[index] ? '' : 'hidden'">
                <a class="w-full" :href="'/item/' + elem.id">
                    <p class="text-center p-1" :class="(index % 2 == 0 ? 'bg-blue-300' : 'bg-blue-400')">
                        {{ elem.name }} consomme {{ elem.water_print }} Litre d'eau pour {{ elem.quantité }} produit
                    </p>
                </a>
            </li>
        </ul>
    </section>
</template>