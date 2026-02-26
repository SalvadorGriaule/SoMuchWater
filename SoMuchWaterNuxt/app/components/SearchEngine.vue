<script setup lang="ts">

import { type ModelRef } from 'vue';

const input: ModelRef<string | undefined> = defineModel('input')

const props = defineProps<{
    tab?: Array<Data> | undefined | void
}>()

const emit = defineEmits<{ search: [value: Data[]] }>()

const isInclude = (str: string): boolean => {
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
    let searchResult: Data[] = []
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
    <div class="flex justify-center">
        <input
            class="w-5/6 placeholder:text-center border-2 bg-white border-black border-solid rounded-md p-1 my-2 md:w-3/5 lg:w-1/2"
            type="text" placeholder="Recherche" @keyup="(() => { searching(tab) })" v-model="input">
    </div>
</template>