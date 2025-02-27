import { ref, watchEffect, toValue, type Ref, watch } from 'vue'

const arrData = (url: string): Ref<Data[]> | void => {
    let resp: Ref<Data[]> = ref([])

    let { data: select, error: sError } = useFetch(url)
    watch(select, async () => {
        if (select.value != null && Array.isArray(select.value)) {
            resp.value = select.value
        } else {
            return console.log(sError)
        }
    })
    return resp
}

const uniData = (url: string): Ref<Data> => {
    let resp: Ref<Data> = ref({ id: 0, name: "", water_print: 0, quantité: "" ,path_img: ""})

    let { data: select, error: sError } = useFetch(url)
    watch(select, async () => {
        if (select.value != null && !Array.isArray(select.value)) {
            resp.value = select.value
        } else {
            return console.log(sError)
        }
    })
    return resp
}

const useFetch = (url: string) => {
    const data: Ref<Data[] | Data | null> = ref(null);
    const error: Ref<unknown | null> = ref(null);

    watchEffect(async () => {
        data.value = null;
        error.value = null;

        const urlValue = toValue(url);

        try {
            const res = await fetch(urlValue, { mode: 'cors', credentials: 'same-origin' });
            data.value = await res.json();
        } catch (e) {
            error.value = e
        }
    })

    return { data, error }
}

const useFetchAsync = async (url:string) => {
    let data: Data[]|Data|null = null
    try {
        const res = await fetch(url, { mode: 'cors', credentials: 'same-origin' });
        data = await res.json()
        return data
    } catch (error) {
        return {err :error}
    }
}

const jsonFetch = async (url: string, data: Object, jwt: string) => {
    try {
        const resp = await fetch(url, { mode: "cors", method: "POST", headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${jwt}` }, body: JSON.stringify(data) })
        let json = await resp.json()
        return json
    } catch (e) {
        return e
    }
}

const jwtCheck = async (jwt: string):Promise<boolean|Object> => {
    try {
        const resp = await fetch("http://127.0.0.1:8000/admin/guard", { mode: "cors",headers:{ "Content-Type": "application/json", "Authorization": `Bearer ${jwt}`} })
        let json:Object = await resp.json();
        return !json.hasOwnProperty("detail")
    } catch (e) {
        return {"error":e}
    }
}

const deleteFetch = async (url: string, jwt: string) => {
    try {
        const resp = await fetch(url, { mode: "cors", method: "DELETE", credentials: "same-origin", headers: { 'Authorization': `Bearer ${jwt}` } });
        let json = await resp.json()
        return json
    } catch (e) {
        return e
    }
}

const jsonPatch = async (url: string, data: Object, jwt: string) => {
    try {
        const resp = await fetch(url, { mode: "cors", method: "PATCH", headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${jwt}` }, body: JSON.stringify(data) })
        let json = await resp.json()
        return json
    } catch (e) {
        return e
    }
}

const formFetch = async (url: string, form: FormData) => {
    try {
        const resp = await fetch(url, { mode: "cors", method: "POST", body: form })
        let json = await resp.json()
        return json
    } catch (e) {
        return e
    }
}

export { formFetch, jsonFetch, jsonPatch, deleteFetch, arrData, uniData ,jwtCheck, useFetchAsync}