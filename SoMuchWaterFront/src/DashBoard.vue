<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isAdmin } from './assets/ts/guard';

onBeforeMount(() => {
    isAdmin()
})

const router = useRouter();
const route = useRoute();

</script>

<template>
    <h1>DashBoard</h1>

</template>