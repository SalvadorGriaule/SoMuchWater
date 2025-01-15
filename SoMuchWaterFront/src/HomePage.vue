<script setup lang="ts">
import { useFetch } from './assets/js/useFetch';
import { useRoute, useRouter } from 'vue-router';
import SelectItem from './components/SelectItem.vue'
import { computed, ref } from 'vue';

const router = useRouter();
const route = useRoute();

const { data, error } = useFetch("http://127.0.0.1:8000/waterprint/")
let mainSelect = ref('')
let mainSelect2 = ref('')

const compareWP = computed(() => {
    if(mainSelect.value != "" && mainSelect2.value != ""){
        let { data:select , error:sError} = useFetch("http://127.0.0.1:8000/waterprint/"+mainSelect.value)
        let { data:select2 , error:selEr2} = useFetch("http://127.0.0.1:8000/waterprint/"+mainSelect2.value)
        return {select,select2}
    }
})

</script>

<template>
    <section class="bg-sky-300">
        <h2 class="text-center text-2xl mb-2">Calculateur relative</h2>
        <form action=""
            class="flex flex-col items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:px-2 lg:pb-2">
            <SelectItem :tab="data" @selected="(e) => mainSelect = e" />
            <SelectItem :tab="data" @selected="(e) => mainSelect2 = e" />
        </form>
        <p class="text-center">{{ mainSelect }} {{ mainSelect2 }}</p>
        <p>{{ compareWP }}</p>
    </section>
    <section>
        <ul>
            <li v-for="(elem) in data">
                {{ elem.name }} consomme {{ elem.water_print }} Litre d'eau
            </li>
        </ul>
    </section>
</template>