import { jsonPatch, useFetchAsync } from "./useFetch.ts";
import { openVerseSearch } from "./openVerse.ts";
import { ref } from "vue";

const bcIFA = new BroadcastChannel("imgForAll");

const insertIMG = async (token: string, elem: Data, jwt: string) => {
    const firstImg = await openVerseSearch(token, elem.name)
    if (firstImg.hasOwnProperty("result_count")) {
        if (firstImg.results[0]) elem.path_img = firstImg.results[0].url;
        let patch = await jsonPatch("http://127.0.0.1:8000/waterprint/" + elem.id, elem, jwt);
        console.log(patch)
    }
}

bcIFA.onmessage = async (e: any) => {
    bcIFA.postMessage("start ImageForAll");
    let tabElem = await useFetchAsync("http://127.0.0.1:8000/waterprint/");
    console.log(tabElem)
    if (tabElem && Array.isArray(tabElem)) {
        bcIFA.postMessage(`Fait sur 0/${tabElem.length} item`)
        for (let i = 0; i < tabElem.length; i++) {
            await insertIMG(e.data[0].token, tabElem[i], e.data[0].jwt)
            bcIFA.postMessage(`Fait sur ${i}/${tabElem.length} item`)
        }
        bcIFA.postMessage("bcIFA end its work");
    }
}