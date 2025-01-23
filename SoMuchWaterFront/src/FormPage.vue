<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';
import { jsonFetch } from './assets/js/useFetch';
import { computed, ref, toValue, type Ref } from 'vue';

const router = useRouter();
const route = useRoute();

let name: Ref<string> = ref("")
let waterprint: Ref<number> = ref(0);
let quantité: Ref<string> = ref("")
let error: Ref<string> = ref("")
let state: Ref<boolean> = ref(false);

const sendData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let json: Object = { name: toValue(name), water_print: toValue(waterprint), quantité: toValue(quantité) }
    let resp = await jsonFetch("http://127.0.0.1:8000/waterprint/", json)
    error.value = resp.error
    state.value = true
}

</script>

<template>
    <div class="flex flex-col items-center p-2">
        <div v-if="state">
            <div v-if="error" class="p-2 mb-2 bg-red-400 border-red-600 border-solid border-2">
                {{ error }}
            </div>
            <div v-if="!error" class="p-2 mb-2 bg-green-400 border-green-600 border-solid border-2">
                <p>le produit à été enregistré</p>
            </div>
        </div>
        <form action="" method="post" class="flex flex-col space-y-2 p-2 bg-cyan-600 rounded-md w-full lg:w-3/4">
            <input v-model="name" type="text" class="p-1 rounded-sm" placeholder="name">
            <input v-model="waterprint" type="number" class="p-1 rounded-sm" placeholder="waterprint">
            <input v-model="quantité" type="text" class="p-1 rounded-sm" placeholder="quantité">
            <input @click="sendData" type="submit" value="envoyer">
        </form>
    </div>
</template>