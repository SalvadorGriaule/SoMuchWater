import { ref, watchEffect, toValue, type Ref} from 'vue'

export const useFetch = (url:string) => {
    const data = ref(null);
    const error:Ref<unknown|null> = ref(null);

    watchEffect(async () => {
        data.value = null;
        error.value = null;

        const urlValue = toValue(url);

        try {
            const res = await fetch(urlValue, {mode: 'cors',credentials: 'same-origin'});
            data.value = await res.json();
        } catch(e) {
            error.value = e
        }
    })

    return { data, error}
}

export const jsonFetch = async(url:string,data:Object) => {    
    try{
        const resp = await fetch(url,{mode:"cors" ,method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)
    });
    } catch(e) {
        console.log(e);
    }
}