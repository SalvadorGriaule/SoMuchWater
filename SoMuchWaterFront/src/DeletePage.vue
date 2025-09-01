<script setup lang="ts">

import { type Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { uniData, deleteFetch } from './assets/ts/useFetch';
import { cookies } from './assets/ts/guard';

const router = useRouter();
const route = useRoute();

let data: Ref<Data | null> = ref(uniData("http://127.0.0.1:8000/waterprint/" + route.params.id))
let response: Ref<string> = ref("");
let error: Ref<string> = ref("")
let state: Ref<boolean> = ref(false);


const delConfime = async () => {
    let jwt: string = cookies.get("admin")
    if (jwt) {
        let resp = await deleteFetch("http://127.0.0.1:8000/waterprint/" + route.params.id,jwt);
        state.value = true
        error.value = resp.detail
        response.value = resp.message
        if (response.value) {
            setTimeout(() => { router.push("/dashboard") }, 700)
        }
    }
}

</script>

<template>
    <div v-if="state">
        <div v-if="error" class="p-2 mb-2 bg-red-400 border-red-600 border-solid border-2">
            {{ error }}
        </div>
        <div v-if="response" class="p-2 mb-2 bg-green-400 border-green-600 border-solid border-2">
            {{ response }}
        </div>
    </div>
    <section class="w-full flex justify-center">
        <div class="flex flex-col items-center space-y-2 p-2 my-2 bg-cyan-600 rounded-md w-full lg:w-3/4">
            <p>Confirmé la suppresion de {{ data?.name }}?</p>
            <input @click="delConfime" class="p-2 text-white rounded-md bg-red-700" type="button" value="OUI">
        </div>
    </section>
</template>