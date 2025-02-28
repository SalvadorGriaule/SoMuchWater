<script setup lang="ts">
import ImageUploader from './ImageUploader.vue';
</script>

<template>
    <div class="h-full w-full">
        <input class="w-full p-1 rounded-md placeholder:italic" type="text" placeholder="Recherche...">
        <div class="h-32">

        </div>
        <ImageUploader />
    </div>
</template>