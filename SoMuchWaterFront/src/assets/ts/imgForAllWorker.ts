import { arrData, jsonPatch } from "./useFetch.ts";
import { openVerseSearch } from "./openVerse.ts";
import { ref } from "vue";

const chanIFA = new BroadcastChannel("imgForAll");

const insertIMG = async (token: string, elem: Data, jwt: string) => {
    const firstImg = await openVerseSearch(token, elem.name)
    console.log(typeof firstImg);
    if (firstImg.hasOwnProperty("result_count")) {
        elem.path_img = firstImg.results[0].url;
        let patch = await jsonPatch("http://127.0.0.1:8000/waterprint/" + elem.id, elem, jwt);
        console.log(patch)
    }
}

chanIFA.onmessage = async (e: any) => {
    chanIFA.postMessage("start ImageForAll");
    let tabElem = arrData("http://127.0.0.1:8000/waterprint/");
    let num = 0;
    if(tabElem) {
        chanIFA.postMessage(`Fait sur ${num}/${tabElem.value.length} item`)
        for(let i = 0; i < tabElem.value.length; i++){
            await insertIMG(e.Data[0].token,tabElem.value[i],e.Data[0].jwt)
            chanIFA.postMessage(`Fait sur ${num}/${tabElem.value.length} item`)
        }
    }
}