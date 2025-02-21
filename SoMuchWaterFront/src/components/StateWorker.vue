<script setup lang="ts">
import { cookies } from '../assets/ts/guard.ts';

const bcAuth = new BroadcastChannel("authChannel")

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

</script>

<template>
    <div class="flex justify-center items-center bg-slate-600">
        <button @click="testOVAWorker" class="m-3 bg-yellow-500 p-2 rounded-lg">test OpenVerseAuth</button>
    </div>
</template>