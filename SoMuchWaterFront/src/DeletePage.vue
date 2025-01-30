<script setup lang="ts">

import { type Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { uniData,deleteFetch } from './assets/ts/useFetch';

const router = useRouter();
const route = useRoute();

let data:Ref<Data|null> = ref(uniData("http://127.0.0.1:8000/waterprint/" + route.params.id))

const delConfime = () => {
    deleteFetch("http://127.0.0.1:8000/waterprint/" + route.params.id);
}

</script>

<template>
    <section class="w-full flex justify-center">
        <div class="flex flex-col items-center space-y-2 p-2 my-2 bg-cyan-600 rounded-md w-full lg:w-3/4">
            <p>Confirmé la suppresion de {{ data?.name }}?</p>
            <input @click="delConfime" class="p-2 text-white rounded-md bg-red-700" type="button" value="OUI">
        </div>
    </section>
</template>