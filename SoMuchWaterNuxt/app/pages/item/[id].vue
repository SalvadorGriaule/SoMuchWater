<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})

// import vue
import { ref, toValue, watch, type Ref } from 'vue';
// import componante
import ImageCenter from '../../components/ImageCenter.vue';
// import ts
import { jsonPatch, uniData } from '../../assets/ts/useFetch';

const route = useRoute()

let data: Ref<Data | null> = ref(uniData("http://127.0.0.1:8000/waterprint/" + route.params.id))

let name: Ref<string | undefined> = ref("")
let waterprint: Ref<number | undefined> = ref(0);
let quantité: Ref<string | undefined> = ref("")
let path_img: Ref<string | undefined | null> = ref("")
let error: Ref<string> = ref("")
let state: Ref<boolean> = ref(false);

watch(data, () => {
    name.value = data.value?.name;
    waterprint.value = data.value?.water_print;
    quantité.value = data.value?.quantité
    path_img.value = data.value?.path_img;
})

const sendData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let jwt: string = cookies.get("admin")
    if (jwt) {
        let json: Object = { "name": toValue(name), "water_print": toValue(waterprint), "quantité": toValue(quantité), "path_img": toValue(path_img) }
        let resp = await jsonPatch("http://127.0.0.1:8000/waterprint/" + route.params.id, json, jwt)
        error.value = resp.error
        state.value = true
    }
}

</script>

<template>
    <a href="/dashboard"><button class="p-2 m-2 mb-2 bg-green-400 border-green-600 border-solid border-2">↵ retour au dashboard</button></a>
    <div class="flex flex-col items-center p-2">
        <ImageCenter v-if="name" :name="name" @url-img="(e) => { path_img = e }" />
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
            <input v-model="path_img" type="text" class="p-1 rounded-sm" placeholder="URL de l'image">
            <input @click="sendData" type="submit" value="envoyer">
        </form>
    </div>
</template>