<script setup lang="ts">
import { cookies } from '../assets/ts/guard.ts';
const authWorker = new SharedWorker(new URL('../assets/ts/openVerseWorker.ts', import.meta.url), { type: "module" })

const testOVAWorker = () => {
    authWorker.port.start()

    authWorker.port.onmessage = (e) => {
        console.log(e.data)
    }

    authWorker.port.postMessage([cookies.get("admin")])
}

</script>

<template>
    <div class="flex justify-center items-center bg-slate-600">
        <button @click="testOVAWorker" class="m-3 bg-yellow-500 p-2 rounded-lg">test OpenVerseAuth</button>
    </div>
</template>