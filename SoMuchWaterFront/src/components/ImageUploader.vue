<script setup lang="ts">
import Dropzone from "dropzone"
import { onMounted, ref, useTemplateRef, watch } from "vue";

const preview = useTemplateRef("preview");
const standBy = useTemplateRef("standBy");
const imgUpload = useTemplateRef("imgUpload")
const feedBack = useTemplateRef("feedback")


let img_post: File;
let data: string | null | undefined;
let url: string = window.location.host;
const upload: Function = (form_data: FormData) => {
    form_data.append("image", img_post);
};

let dragOver = ref(0);
let dOheight = ref(0);
let dOwidth = ref(0);

onMounted(() => {
    data = document.getElementById("app")?.getAttribute("data-image");
    if (data) data = "http://" + url + "/" + data;

    if (standBy.value) {
        watch(dragOver, () => {
            console.log(dOheight.value, dOheight.value);
            dOheight.value = standBy.value.offsetHeight
            dOwidth.value = standBy.value.offsetWidth

        })

    }

    if (preview.value && standBy.value) {
        const dropzone = new Dropzone("#dropImg", {
            maxFiles: 1,
            uploadMultiple: false,
            url: "http://127.0.0.1:8123/media/static/img/",
            autoProcessQueue: false,
            previewTemplate: preview.value.innerHTML,
            acceptedFiles: "image/*",
            clickable: ".clickab",
        });
        dropzone.on("addedfile", (file: File) => {
            standBy.value.classList.toggle("flex");
            standBy.value.classList.toggle("hidden");
            img_post = file;
        });
        dropzone.on("removedfile", () => {
            standBy.value.classList.toggle("flex");
            standBy.value.classList.toggle("hidden");
        });
        dropzone.on("dragenter", (e) => {
            if (standBy.value == e.target) dragOver.value = 1;
        })
        dropzone.on("dragleave", (e) => {
            if (feedBack.value == e.target) dragOver.value = 0;
        })
        document.addEventListener("formdata", (e) => {
            if (img_post != undefined) upload(e.formData);
        })
    }
})
</script>

<template>
    <div class="relative w-full">
        <div class="w-full">
            <div ref="imgUpload" class="clickab flex justify-center items-center bg-neutral-700 w-full" id="dropImg">
                <div id="standBy" class="flex items-center justify-center clickab" ref="standBy">
                    <div class="w-1/3 hidden clickab">
                        <img src="" alt="" />
                    </div>
                    <div
                        class="clickab flex justify-center items-center rounded-md border-gray-400 border-2 border-dashed m-6">
                        <div class="w-1/6 clickab p-3 my-2"><img src="../assets/download.svg" alt="">
                        </div>
                        <p class="text-lg font-semibold text-gray-400">insérer un fichier image ici</p>
                    </div>
                    <div ref="feedback" class="clickab absolute top-0 bg-gray-500/50" :class="dragOver == 1 ? 'block' : 'hidden'"
                        :style="{ height: dOheight + 'px', width: dOwidth + 'px' }">
                    </div>
                </div>
                <div ref="preview" class="dropzone-previews hidden w-full" id="preview">
                    <div id="template" class="flex flex-col items-center w-full m-2">
                        <div><img class="h-20" alt="" data-dz-thumbnail /></div>
                        <div class="flex space-x-1">
                            <p data-dz-name></p>
                            <p data-dz-size></p>
                            <p data-dz-errormessage></p>
                        </div>
                        <div>
                            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0"
                                aria-valuemax="100" aria-valuenow="0">
                                <div class="progress-bar progress-bar-success" style="width:0%"></div>
                            </div>
                        </div>
                        <div class="flex justify-center space-x-2">
                            <button
                                class="bg-red-700 text-white rounded-md mt-1 py-1 px-2 cursor-pointer w-fit hover:bg-white hover:text-red-700"
                                data-dz-remove>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>