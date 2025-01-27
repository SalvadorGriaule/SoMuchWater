<script setup lang="ts">

import { ref, type Ref } from 'vue';
import { arrData } from './assets/ts/useFetch';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

let listWP: Ref<Data[] | void> = ref(arrData("http://127.0.0.1:8000/waterprint/"))
let inputSearch: Ref<string> = ref('')

const isInclude = (str:string) => {
    if(str.includes(inputSearch.value)){
        return ''
    } else {
        return 'hidden'
    }
}

</script>

<template>
    <section class="w-full flex items-center flex-col pt-2 bg-slate-400">
        <h1 class="text-2xl font-semibold">DashBoard</h1>
        <div><input class="placeholder:text-center border-2 border-black border-solid rounded-md my-2" type="text"
                placeholder="Recherche" v-model="inputSearch"></div>
    </section>
    <section>
        <ul>
            <li v-for="(elem, index) in listWP" :class="isInclude(elem.name)">
                <p class="text-center p-1" :class="(index % 2 == 0 ? 'bg-blue-300' : 'bg-blue-400')" >
                    {{ elem.name }} consomme {{ elem.water_print }} Litre d'eau pour {{ elem.quantité }} produit
                </p>
            </li>
        </ul>
    </section>
</template>