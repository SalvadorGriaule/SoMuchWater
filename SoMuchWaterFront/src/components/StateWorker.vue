<script setup lang="ts">
import { cookies } from '../assets/ts/guard.ts';

const bcAuth = new BroadcastChannel("authChannel")

const testOVAWorker = () => {

    bcAuth.onmessage = (e) => {
        console.log(e.data)
        cookies.set("openVerseToken",e.data);
    }

    bcAuth.postMessage([cookies.get("admin")])
}

</script>

<template>
    <div class="flex justify-center items-center bg-slate-600">
        <button @click="testOVAWorker" class="m-3 bg-yellow-500 p-2 rounded-lg">test OpenVerseAuth</button>
    </div>
</template>