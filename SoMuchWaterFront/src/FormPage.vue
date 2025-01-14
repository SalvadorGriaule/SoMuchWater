<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

</script>

<template>
    <div>
        <form action="/waterprint/" method="post">
            <input type="text" placeholder="name">
            <input type="number" placeholder="waterprint">
            <input type="submit" value="">
        </form>
    </div>
</template>