<script setup lang="ts">

import { ref, toValue, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { jsonPatch, uniData } from './assets/ts/useFetch';
import { cookies } from './assets/ts/guard';

const router = useRouter();
const route = useRoute();

let data: Ref<Data | null> = ref(uniData("http://127.0.0.1:8000/waterprint/" + route.params.id))


let name: Ref<string | undefined> = ref("")
let waterprint: Ref<number | undefined> = ref(0);
let quantité: Ref<string | undefined> = ref("")
let error: Ref<string> = ref("")
let state: Ref<boolean> = ref(false);

watch(data, () => {
    name.value = data.value?.name;
    waterprint.value = data.value?.water_print;
    quantité.value = data.value?.quantité
})

const sendData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let jwt: string = cookies.get("admin")
    if (jwt) {
        let json: Object = { "name": toValue(name), "water_print": toValue(waterprint), "quantité": toValue(quantité) }
        let resp = await jsonPatch("http://127.0.0.1:8000/waterprint/" + route.params.id, json,jwt)
        error.value = resp.error
        state.value = true
    }
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
        <form action="" method="patch" class="flex flex-col space-y-2 p-2 bg-cyan-600 rounded-md w-full lg:w-3/4">
            <input v-model="name" type="text" class="p-1 rounded-sm" placeholder="name">
            <input v-model="waterprint" type="number" class="p-1 rounded-sm" placeholder="waterprint">
            <input v-model="quantité" type="text" class="p-1 rounded-sm" placeholder="quantité">
            <input @click="sendData" type="submit" value="envoyer">
        </form>
    </div>
</template>