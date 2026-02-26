<script setup lang="ts">
import { arrData, uniData } from '../assets/ts/useFetch';
import SelectItem from '../components/SelectItem.vue';
import SearchEngine from '../components/SearchEngine.vue';
import Listing from '../components/Listing.vue'
import { computed, ref, watch, type Ref } from 'vue';


let data: void | Ref<Data[] | Data[]> = await arrData("http://127.0.0.1:8000/waterprint/")
let select: Ref<Data | null> = ref(null)
let select2: Ref<Data | null> = ref(null)

let mainSelect = ref('')
let mainSelect2 = ref('')

// searchFonction
let inputSearch: Ref<string> = ref("")
let result: Ref<any[]> = ref([])

watch(mainSelect, async () => {
    if (mainSelect.value != "") {
        select = await uniData("http://127.0.0.1:8000/waterprint/" + mainSelect.value)
    }
})

watch(mainSelect2, async () => {
    if (mainSelect2.value != "") {
        select2 = await uniData("http://127.0.0.1:8000/waterprint/" + mainSelect2.value)
    }
})

const dynaSearch = computed(() => {
    result
})

const compareWP = computed(() => {
    if (mainSelect.value != "" && mainSelect2.value != "") {
        if (select.value != null && select2.value != null) return { select: select.value, select2: select2.value }
    }
})

</script>

<template>
    <section class="bg-gradient-to-br from-sky-500 to-sky-600 p-2">
        <h2 class="text-center text-2xl mb-2">Calculateur relative</h2>
        <form action="" v-if="Array.isArray(data)"
            class="flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12 lg:px-2 lg:pb-2">
            <SelectItem :tab="data" @selected="(e) => mainSelect = e" />
            <SelectItem :tab="data" @selected="(e) => mainSelect2 = e" />
        </form>
        <div v-if="compareWP" class="flex justify-center">
            <div class="text-center my-3 p-3 text-xl w-fit rounded-xl bg-[rgba(205,205,205,0.50)]">
                <p>{{ compareWP.select.quantité }} {{ compareWP.select.name }} consomme </p>
                <p>{{compareWP.select.water_print / compareWP.select2.water_print }} </p> 
                fois d'eau que {{compareWP.select2.quantité }} de {{ compareWP.select2.name }}
            </div>
        </div>
    </section>
    <section class="flex justify-center">
        <SearchEngine :tab="data" v-model:input="inputSearch" @search="(e) => result = e" />
    </section>
    <section class="flex flex-wrap m-2 justify-center">
       <Listing v-if="inputSearch == '' " :list="data" role="guest" />
       <Listing v-else :list="result" role="guest" />
    </section>
</template>