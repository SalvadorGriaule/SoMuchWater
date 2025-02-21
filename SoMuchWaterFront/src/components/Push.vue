<script setup lang="ts">
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });
const bcAuth = new BroadcastChannel("authChannel")

bcAuth.onmessage = (e:any) => {
    console.log(e.data);
    cookies.set("openVerseToken",e.data);
} 

</script>
<template>
    <div
        class="flex items-center fixed bottom-0 left-0 m-2 p-2 rounded-md bg-green-300 border-2 border-green-600 text-green-600">
        <span class="h-2 w-2 rounded-full bg-sky-500"></span>
        <span class="animate-ping absolute h-2 w-2 rounded-full bg-sky-500"></span>
        <span class="ml-2">test</span>
    </div>
</template>