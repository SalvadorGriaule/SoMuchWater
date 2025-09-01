<script setup lang="ts">

import { useTemplateRef, ref, type Ref } from 'vue';
import Cookies from 'universal-cookie';
import anime from "animejs";

import { validPush, initPush } from '@/assets/ts/pushFunction';

const cookies = new Cookies(null, { path: '/' });
const bcAuth = new BroadcastChannel("authChannel")
const bcIFA = new BroadcastChannel("imgForAll");

const push = useTemplateRef("push")
const diode = useTemplateRef("diode")
let textPush: Ref<string> = ref("")

bcAuth.onmessage = (e: any) => {
    if (e.data == "initialization") {
        if( push.value && diode.value ) initPush(push.value,diode.value)
        textPush.value = "claim a openVerseToken"
    } else if (e.data.state == "Succes") {
        cookies.set("openVerseToken", e.data.response);
        textPush.value = "openVerseToken getting";
        if( push.value && diode.value ) validPush(push.value,diode.value)
    }
}

bcIFA.onmessage = (e: any) => {
    if (e.data == "start ImageForAll"){
        if( push.value && diode.value ) initPush(push.value,diode.value)
        textPush.value = e.data
    } else if (e.data.includes("Fait sur")){
        textPush.value = e.data
    } else if (e.data == "bcIFA end its work") {
        textPush.value = "bcIFA done"
        if( push.value && diode.value ) validPush(push.value,diode.value)
    }
}

</script>
<template>
    <div ref="push"
        class="flex items-center fixed bottom-0 left-0 m-2 p-2 rounded-md bg-green-300 border-2 border-green-600 text-green-600 duration-150 translate-y-[150%]">
        <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
        <span ref="diode" class="animate-ping absolute h-2 w-2 rounded-full bg-yellow-500"></span>
        <span class="ml-2">{{ textPush }}</span>
    </div>
</template>