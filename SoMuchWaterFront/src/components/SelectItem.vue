<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    tab?: Array<Data>
}>()
defineEmits(["selected"])
let selected = ref('')
</script>

<template>
    <select @change="$emit('selected',selected)" v-model="selected" class=" w-5/6 md:w-3/5 lg:w-2/5 rounded-md p-1">
        <option disabled value="default">Selectionner un item</option>
        <option v-for="(elem) in tab" :value="elem.id">
            {{ elem.name }}
        </option>
    </select>
</template>