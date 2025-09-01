<script setup lang="ts">
import { cookies } from '../assets/ts/guard.ts';

const ifaWorker = new Worker(new URL('../assets/ts/imgForAllWorker.ts', import.meta.url), { type: "module" })

const bcAuth = new BroadcastChannel("authChannel");
const bcIFA = new BroadcastChannel("imgForAll");

let initTest: boolean = false

const testOVAWorker = () => {
    if (!initTest) {
        initTest = true
        bcAuth.onmessage = (e) => {
            cookies.set("openVerseToken", e.data.response);
        }
    }

    bcAuth.postMessage([cookies.get("admin")])
}

const testIFAWorker = () => {
    bcIFA.postMessage([{ token: cookies.get("openVerseToken"), jwt: cookies.get("admin") }])
}

</script>

<template>
    <div class="flex justify-center items-center bg-slate-600">
        <button @click="testOVAWorker" class="m-3 bg-yellow-500 p-2 rounded-lg">test OpenVerseAuth</button>
        <button @click="testIFAWorker" class="m-3 bg-lime-600 p-2 rounded-lg">test IFAWorker</button>
    </div>
</template>