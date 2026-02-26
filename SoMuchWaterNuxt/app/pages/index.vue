<script setup lang="ts">
import { arrData, uniData } from '../assets/ts/useFetch';
import SelectItem from '../components/SelectItem.vue';
import SearchEngine from '../components/SearchEngine.vue';
import Listing from '../components/Listing.vue'

let data: void | Ref<Data[] | Data[]> = await arrData("http://127.0.0.1:8000/waterprint/")

let mainSelect = ref('')
let mainSelect2 = ref('')

// searchFonction
let inputSearch: Ref<string> = ref("")
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
    <section class="bg-gradient-to-br from-sky-500 to-sky-600 p-2">
        <h2 class="text-center text-2xl mb-2">Calculateur relative</h2>
        <form action="" v-if="Array.isArray(data)"
            class="flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12 lg:px-2 lg:pb-2">
            <SelectItem :tab="data" @selected="(e) => mainSelect = e" />
            <SelectItem :tab="data" @selected="(e) => mainSelect2 = e" />
        </form>
        <div v-if="select2 != null && select != null" class="flex justify-center">
            <div class="text-center my-3 p-3 text-xl w-fit rounded-xl bg-[rgba(205,205,205,0.50)]">
                <p>{{ select.quantité }} {{ select.name }} consomme </p>
                <p>{{ select.water_print / select2.water_print }} </p>
                fois d'eau que {{ select2.quantité }} de {{ select2.name }}
            </div>
        </div>
    </section>
    <section class="flex justify-center">
        <SearchEngine :tab="data" v-model:input="inputSearch" @search="(e) => result = e" />
    </section>
    <section class="flex flex-wrap m-2 justify-center">
        <Listing v-if="inputSearch == ''" :list="data" role="guest" />
        <Listing v-else :list="result" role="guest" />
    </section>
</template>