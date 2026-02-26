<script setup lang="ts">

import { type ModelRef } from 'vue';

const input: ModelRef<string | undefined> = defineModel('input')

const props = defineProps<{
    tab?: Array<Data> | undefined | void
}>()

const emit = defineEmits(["search"])

const isInclude = (str: string):boolean => {
    if (input.value != undefined) {
        console.log(input.value);
        
        if (str.toLowerCase().includes(input.value.toLowerCase())) {
            return true
        } else {
            return false
        }
    }
    return false
}

const searching = (tab: Data[] | undefined | void) => {
    let j = 0;
    let searchResult:Data[] = []
    if (Array.isArray(tab)) {
        for (let i = 0; tab.length > i; i++) {
            if (isInclude(tab[i].name)) {
                searchResult[j] = tab[i]
                j++
            }
        }
        console.log(searchResult)
        emit("search", searchResult)
    }
}

</script>

<template>
    <div><input class="placeholder:text-center border-2 border-black border-solid rounded-md my-2" type="text"
            placeholder="Recherche" @keyup="(() => {searching(tab)})" v-model="input"></div>
</template>