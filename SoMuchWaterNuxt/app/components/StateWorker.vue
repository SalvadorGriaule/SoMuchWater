<script setup lang="ts">

const ifaWorker = new Worker(new URL('../assets/ts/imgForAllWorker.ts', import.meta.url), { type: "module" })

const bcAuth = new BroadcastChannel("authChannel");
const bcIFA = new BroadcastChannel("imgForAll");

let initTest: boolean = false

const testOVAWorker = () => {
    if (!initTest) {
        initTest = true
        bcAuth.onmessage = (e) => {
            useTokenOV().value = e.data.response;
        }
    }

    bcAuth.postMessage([useToken().value])
}

const testIFAWorker = () => {
    bcIFA.postMessage([{ token: useTokenOV().value, jwt: useToken().value }])
}

</script>

<template>
    <div class="flex justify-center items-center bg-slate-600">
        <button @click="testOVAWorker" class="m-3 bg-yellow-500 p-2 rounded-lg">test OpenVerseAuth</button>
        <button @click="testIFAWorker" class="m-3 bg-lime-600 p-2 rounded-lg">test IFAWorker</button>
    </div>
</template>