<script setup lang="ts">

defineProps<{
    tab?: Array<Data>
}>()
defineEmits(["selected"])
let selectedVal = ref('')
</script>

<template>
    <select @change="$emit('selected',selectedVal)" v-model="selectedVal" class="bg-white  w-5/6 md:w-3/5 lg:w-2/5 rounded-md p-1">
        <option selected disabled hidden  >Selectionner un item</option>
        <option v-for="(elem) in tab" :value="elem.id">
            {{ elem.name }}
        </option>
    </select>
</template>