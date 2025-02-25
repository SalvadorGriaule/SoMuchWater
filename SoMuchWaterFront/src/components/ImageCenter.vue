<script setup lang="ts">
import Cookies from 'universal-cookie';
import { openVerseSearch } from '@/assets/ts/openVerse';
import { ref, useTemplateRef, watch, watchEffect, type Ref } from 'vue';

const props = defineProps<{ name: string }>()

const cookies = new Cookies(null, { path: '/' });

const tokenOV = cookies.get("openVerseToken");

const img = useTemplateRef('imgOV');

let currentImg: Ref<number> = ref(0)

let resultSearch: Ref<OpenVerseResult | Object> = ref({});

const incre = () => {
    if(currentImg.value < resultSearch.value.results.length - 1) currentImg.value++
    console.log();
    
}

const decrem = () => {
    if(currentImg.value > 0) currentImg.value--
}

if (tokenOV) {
    watchEffect(async () => {
        resultSearch.value = await openVerseSearch(tokenOV, props.name)
        if (resultSearch.value.hasOwnProperty("results") && img.value) {
            img.value.src = resultSearch.value.results[0].url
        }
    })
}

watch(currentImg,() => {
    if(img.value){
        img.value.src = resultSearch.value.results[currentImg.value].url
    }
})

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
    <div class="flex w-full flex-col items-center mt-2 lg:flex-row-reverse">
        <div class="w-full flex justify-center items-center my-4">
            <div class="flex flex-col items-center">
                <div class="flex items-center justify-around lg:justify-center">
                    <div
                        @click="decrem"
                        class="duration-100 w-1/6 bg-sky-300/50 rounded-full md:w-[12.5%] lg:w-[6.5%] hover:-translate-x-2">
                        <img class="-translate-x-1" src="../assets/Arrow.svg" alt="">
                    </div>
                    <div class="w-1/2 mx-2 lg:w-3/4">
                        <img ref='imgOV' src="../assets/Placeholder.svg" alt="">
                    </div>
                    <div
                        @click="incre"
                        class="duration-100 w-1/6 bg-sky-300/50 rounded-full rotate-180 md:w-[12.5%] lg:w-[6.5%] hover:translate-x-2">
                        <img class="-translate-x-1" src="../assets/Arrow.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="resultSearch.hasOwnProperty('results')"
            class="flex items-center bg-sky-300 p-2 rounded-lg border-blue-500 border-2 mx-2 mb-2 overflow-x-scroll w-full lg:justify-start  lg:flex-wrap lg:h-[50vh] lg:mx-0">
            <div class="h-40 flex-none flex items-center overflow-hidden m-1" :class="i == currentImg ? 'bg-blue-500' : ''" v-for="(elem, i) in resultSearch.results" >
                <div  class="w-32 h-fit p-1" >
                    <img :src="elem.url" alt="">
                </div>
            </div>
        </div>
    </div>
</template>