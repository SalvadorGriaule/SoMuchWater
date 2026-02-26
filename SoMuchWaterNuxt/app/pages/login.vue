<script setup lang="ts">

import { ref, toValue, type Ref } from 'vue';
import { formFetch } from '../assets/ts/useFetch';

let email: Ref<string> = ref("");
let password: Ref<string> = ref("");
let error: Ref<string> = ref("")
let state: Ref<boolean> = ref(false);

const sendForm = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let formData: FormData = new FormData()
    formData.append("username", toValue(email))
    formData.append("password", toValue(password))
    let send = await formFetch("http://127.0.0.1:8000/token", formData);
    error.value = send.detail
    state.value = true
    console.log(error.value,!error.value)
    if (!error.value) {
        useToken().value = send.access_token
        console.log(useToken().value,send)
        await navigateTo('/dashboard')
    }
}

</script>

<template>
    <div class="flex items-center flex-col mt-2">
        <div v-if="state">
            <div v-if="error" class="p-2 mb-2 bg-red-400 border-red-600 border-solid border-2">
                {{ error }}
            </div>
        </div>
        <form action="" method="post" class="flex flex-col space-y-2 p-2 my-2 bg-cyan-600 rounded-md w-full lg:w-3/4">
            <input v-model="email" type="email" class="bg-white p-1 rounded-sm" placeholder="e-mail">
            <input v-model="password" type="password" class="bg-white p-1 rounded-sm" placeholder="password">
            <input @click="sendForm" type="submit" value="envoyer">
        </form>
    </div>
</template>