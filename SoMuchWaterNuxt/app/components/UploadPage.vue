<script setup lang="ts">

import ImageUploader from './ImageUploader.vue';
let disabled = ref(true);

</script>

<template>
    <div class="h-full w-full flex flex-col items-center">
        <input class="w-full p-1 rounded-md placeholder:italic" type="text" placeholder="Recherche...">
        <div class="h-32">

        </div>
        <ImageUploader @if-upload="(e) => {disabled = e}" />
        <button :disabled="disabled" class="bg-green-600 text-white mt-2 p-1 rounded-lg disabled:bg-slate-500 disabled:text-black">Envoyer</button>
    </div>
</template>