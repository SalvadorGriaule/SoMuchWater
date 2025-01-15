<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';
import { jsonFetch } from './assets/js/useFetch';
import { ref, toValue, type Ref } from 'vue';

const router = useRouter();
const route = useRoute();

let name: Ref<string> = ref("")
let waterprint: Ref<number> = ref(0);

const sendData = (e) => {
    e.preventDefault()
    let json: Object = { name: toValue(name), water_print: toValue(waterprint) }
    jsonFetch("http://127.0.0.1:8000/waterprint/", json)
}

</script>

<template>
    <div>
        <form action="" method="post">
            <input v-model="name" type="text" placeholder="name">
            <input v-model="waterprint" type="number" placeholder="waterprint">
            <input @click="sendData" type="submit" value="envoyer">
        </form>
    </div>
</template>