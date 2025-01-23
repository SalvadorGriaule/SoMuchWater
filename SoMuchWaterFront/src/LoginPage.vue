<script setup lang="ts">

import { ref, toValue, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

let email: Ref<string> = ref("");
let password: Ref<string> = ref("");

const sendForm = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let formData:FormData = new FormData()
    formData.append("email", toValue(email))
    formData.append("password", toValue(password))
    console.log(formData)
}

</script>

<template>
    <div class="flex justify-center ">
        <form action="" method="post" class="flex flex-col space-y-2 p-2 my-2 bg-cyan-600 rounded-md w-full lg:w-3/4">
            <input v-model="email" type="email" class="p-1 rounded-sm" placeholder="e-mail">
            <input v-model="password" type="password" class="p-1 rounded-sm" placeholder="password">
            <input @click="sendForm" type="submit" value="envoyer">
        </form>
    </div>
</template>