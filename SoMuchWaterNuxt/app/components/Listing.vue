<script setup lang="ts">
const props = defineProps<{ list: any[], role: string }>()

const emit = defineEmits<{ select: [val: string], select2: [val: string] }>()

let select: Ref<string> = ref('')
let select2: Ref<string> = ref('')

const onclick = (id: number) => {
    if (select.value == '') {
        select.value = String(id)
    } else if (select.value != '' && select2.value == '') {
        select2.value = String(id)
    } else {
        select.value = select2.value
        select2.value = String(id)
    }
    emit("select", select.value)
    emit("select2", select2.value)
}

</script>

<template>
    <div class="w-4/5 h-[33vh] my-2 mx-3 border-2 border-blue-700 rounded-md overflow-hidden md:w-64"
        v-for="(elem, index) in list">
        <button @click="onclick(elem.id)">
            <div class="h-1/2 overflow-hidden">
                <img :src="elem.path_img == null ? '/svg/Placeholder.svg' : elem.path_img"
                    :alt="elem.path_img == null ? 'placeholder' : elem.name">
            </div>
            <div :class="{ 'justify-around': role != 'admin' }" class="flex flex-col h-1/2 bg-blue-300 p-2">
                <p :class="{ 'text-2xl': role != 'admin' }">{{ elem.name }}</p>
                <p :class="{ 'text-xl': role != 'admin' }">Quantité d'eau {{ elem.water_print }} L</p>
                <p>Quantité produit {{ elem.quantité }}</p>
            </div>
        </button>
        <div v-if="role == 'admin'">
            <a class="w-full" :href="'/item/' + elem.id">
                <input type="button" value="MODIFIER"
                    class="p-2 text-white bg-green-700 rounded-md my-2 mr-1 cursor-pointer">
            </a>
            <a class="w-full" :href="'/item/delete/' + elem.id">
                <input type="button" value="SUPPRIMER"
                    class="p-2 text-white bg-red-700 rounded-md my-2 mr-1 cursor-pointer">
            </a>
        </div>
    </div>
</template>