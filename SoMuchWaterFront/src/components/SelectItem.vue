<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    tab?: Array<Object>
}>()
defineEmits(["selected"])
let selected = ref('')
</script>

<template>
    <select @change="$emit('selected',selected)" v-model="selected" class="w-3/5">
        <option disabled value="default">Selectionner un item</option>
        <option v-for="(elem) in tab" :value="elem.id">
            {{ elem.name }}
        </option>
    </select>
</template>