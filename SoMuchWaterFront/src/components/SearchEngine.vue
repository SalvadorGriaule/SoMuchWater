<script setup lang="ts">

import { ref, type ModelRef, type Ref } from 'vue';

const input: ModelRef<string | undefined> = defineModel('input')

const props = defineProps<{
    tab?: Array<Data> | undefined | void
}>()

const emit = defineEmits(["search"])

const searchResult: boolean[] = new Array(props.tab?.length).fill(false)

const isInclude = (str: string):boolean => {
    if (input.value != undefined) {

        if (str.includes(input.value)) {
            return true
        } else {
            return false
        }
    }
    return false
}

const searching = (tab: Data[] | undefined | void) => {
    if (Array.isArray(tab)) {
        for (let i = 0; tab.length > i; i++) {
            searchResult[i] = isInclude(tab[i].name)
        }
        console.log("emit")
        emit("search", searchResult)
    }
}

</script>

<template>
    <div><input class="placeholder:text-center border-2 border-black border-solid rounded-md my-2" type="text"
            placeholder="Recherche" @keyup="searching(tab)" v-model="input"></div>
</template>