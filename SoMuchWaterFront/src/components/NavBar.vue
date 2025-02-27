<script setup lang="ts">
import { ref, onMounted, type Ref, watch, useTemplateRef } from 'vue';
import Onglet from './Onglet.vue';
import { fillSVG } from '@/assets/ts/svgFunc';

const props = defineProps<{ tab: string[] }>()

const emit = defineEmits(["returnCurrent"])

const currentOng: Ref<number> = ref(0);
const navbar = useTemplateRef("navbar")

const clickOng = (num:number) => {
    return num
}

const svgOngFill = (tab: Element[],firstElem:boolean = true) => {
    firstElem ? fillSVG(tab[0],"#7dd3fc") : fillSVG(tab[0],"#3b82f6")
    
    if(tab.length != 1) return svgOngFill(tab.slice(1),false)
}

onMounted(() => {
    if(navbar.value){
        const onglet = navbar.value.querySelectorAll(".onglet")
        watch(currentOng,() => {
            emit("returnCurrent",currentOng.value)
            for (let i = 0; i < onglet.length; i++){
                currentOng.value == i ? fillSVG(onglet[i],"#7dd3fc") : fillSVG(onglet[i],"#3b82f6")
            }
        })
        svgOngFill([...onglet]) 
    }
})

</script>

<template>
    <div ref="navbar" class="flex space-x-8 ml-[0.85rem]">
        <div v-for="(elem, i) in tab" class="relative flex justify-center items-center">
            <Onglet :fn="clickOng" :value="i" @call-back="(e) => { currentOng = e}" class="scale-x-125 scale-y-110"/>
            <p @click="() => { currentOng = i }" class="absolute top-0 font-semibold text-gray-800">{{ elem }}</p>
        </div>
    </div>
</template>