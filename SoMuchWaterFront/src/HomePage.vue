<script setup lang="ts">
import { arrData, uniData } from './assets/ts/useFetch';
import { useRoute, useRouter } from 'vue-router';
import SelectItem from './components/SelectItem.vue'
import { computed, ref, watch, type Ref } from 'vue';

const router = useRouter();
const route = useRoute();
let data: Ref<Data[] | void> = ref(arrData("http://127.0.0.1:8000/waterprint/"))
let select: Ref<Data | null> = ref(null)
let select2: Ref<Data | null> = ref(null)

let mainSelect = ref('')
let mainSelect2 = ref('')

watch(mainSelect, async () => {
    if (mainSelect.value != "") {
        select = uniData("http://127.0.0.1:8000/waterprint/" + mainSelect.value)
    }
})

watch(mainSelect2, async () => {
    if (mainSelect2.value != "") {
        select2 = uniData("http://127.0.0.1:8000/waterprint/" + mainSelect2.value)
    }
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
    <section>
        <ul>
            <li v-for="(elem, index) in data">
                <p class="text-center p-1" :class="(index % 2 == 0 ? 'bg-blue-300' : 'bg-blue-400')">
                    {{ elem.name }} consomme {{ elem.water_print }} Litre d'eau pour {{ elem.quantité }} produit
                </p>
            </li>
        </ul>
    </section>
</template>