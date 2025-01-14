<script setup lang="ts">
import { useFetch } from './assets/js/useFetch';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { data, error } = useFetch("http://127.0.0.1:8000/")

</script>

<template>
    <div>
        <p>{{ data.message }}</p>
    </div>
</template>