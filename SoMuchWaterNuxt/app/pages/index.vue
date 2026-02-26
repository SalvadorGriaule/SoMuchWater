<script setup lang="ts">
import { arrData, uniData } from '../assets/ts/useFetch';
import SearchEngine from '../components/SearchEngine.vue';
import Listing from '../components/Listing.vue'

let data: void | Ref<Data[] | Data[]> = await arrData("http://127.0.0.1:8000/waterprint/")

let mainSelect = ref('')
let mainSelect2 = ref('')

// searchFonction
let inputSearch: Ref<string> = ref('')
let result: Ref<any[]> = ref([])

const { data: select } = useAsyncData(
    mainSelect,
    () => uniData("http://127.0.0.1:8000/waterprint/" + mainSelect.value)
)

const { data: select2 } = useAsyncData(
    mainSelect2,
    () => uniData("http://127.0.0.1:8000/waterprint/" + mainSelect2.value)
)
</script>

<template>
    <section class="fixed bottom-0 w-full bg-gradient-to-br from-sky-500 to-sky-600 p-2">
        <SearchEngine :tab="data" v-model:input="inputSearch" @search="(e) => result = e" />
        <h2 class="text-center text-2xl mb-2">Calculateur relative</h2>

        <div v-if="select2 != undefined && select != undefined" class="flex justify-center">
            <div class="text-center my-3 p-3 text-xl w-fit rounded-xl bg-[rgba(205,205,205,0.50)]">
                <p>{{ select.quantité }} {{ select.name }} consomme </p>
                <p>{{ select.water_print / select2.water_print }} </p>
                fois d'eau que {{ select2.quantité }} de {{ select2.name }}
            </div>
        </div>
    </section>
    <section class="flex flex-wrap m-2 justify-center">
        <Listing :list="inputSearch != '' ? result : data" role="guest" @select="(e) => mainSelect = e"
            @select2="(e) => mainSelect2 = e" />
    </section>
</template>