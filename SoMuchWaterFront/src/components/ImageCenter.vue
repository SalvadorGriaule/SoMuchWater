<script setup lang="ts">
import Cookies from 'universal-cookie';
import { openVerseSearch } from '@/assets/ts/openVerse';

const props = defineProps<{ name: string }>()

const cookies = new Cookies(null, { path: '/' });

const tokenOV = cookies.get("openVerseToken");

if (tokenOV) openVerseSearch(tokenOV, props.name)

</script>

<template>
    <div>
        <div v-if="tokenOV" class="p-2 bg-green-300 border-green-600 border-2 rounded-md text-green-600">
            <p class="font-semibold">tokenOV disponible</p>
        </div>
        <div v-else="!tokenOV" class="p-2 border-2 rounded-md bg-red-300 border-red-500 text-red-500">
            <p class="font-semibold">tokenOV indisponible</p>
        </div>
    </div>
    <div class="w-full flex justify-center items-center my-4">
        <div class="flex flex-col items-center">
            <div class="flex items-center justify-around lg:justify-center">
                <div
                    class="duration-100 w-1/6 bg-sky-300/50 rounded-full md:w-[12.5%] lg:w-[6.5%] hover:-translate-x-2">
                    <img class="-translate-x-1" src="../assets/Arrow.svg" alt="">
                </div>
                <div class="w-1/2 mx-2 lg:w-1/4">
                    <img src="../assets/Placeholder.svg" alt="">
                </div>
                <div
                    class="duration-100 w-1/6 bg-sky-300/50 rounded-full rotate-180 md:w-[12.5%] lg:w-[6.5%] hover:translate-x-2">
                    <img class="-translate-x-1" src="../assets/Arrow.svg" alt="">
                </div>
            </div>
            <p>name:</p>
        </div>
    </div>
</template>