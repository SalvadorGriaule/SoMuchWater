import { type Ref } from 'vue'

const isData = (data: any): data is Data => {
    return "waterprint" in data
}

const arrData = async (url: string): Promise<void | Ref<Data[], Data[]>> => {

    let { data: select, error: sError } = await useFetch(url)

    return select.value != null && Array.isArray(select.value) ? select.value : console.log(sError);
}

const uniData = async (url: string): Promise<void | Ref<Data, Data>> => {

    let { data: select, error: sError } = await useFetch(url)

    return select.value != null && !Array.isArray(select.value) ? select.value : console.log(sError);
}

const useFetchAsync = async (url: string) => {
    let data: Data[] | Data | null = null
    try {
        const res = await useFetch(url, { mode: 'cors', credentials: 'same-origin' });
        data = res.data
        return data
    } catch (error) {
        return { err: error }
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

const jwtCheck = async (jwt: string): Promise<boolean | Object> => {
    try {
        const resp = await useFetch("http://127.0.0.1:8000/admin/guard", { mode: "cors", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${jwt}` } })
        let json: Object = resp.data.value;
        return !json.hasOwnProperty("detail")
    } catch (e) {
        return { "error": e }
    }
}

const deleteFetch = async (url: string, jwt: string) => {
    try {
        const resp = await useFetch(url, { mode: "cors", method: "DELETE", credentials: "same-origin", headers: { 'Authorization': `Bearer ${jwt}` } });
        let json = resp.data
        return json.value
    } catch (e) {
        return e
    }
}

const jsonPatch = async (url: string, data: Object, jwt: string) => {
    try {
        const resp = await useFetch(url, { mode: "cors", method: "PATCH", headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${jwt}` }, body: JSON.stringify(data) })
        let json = resp.data
        return json.value
    } catch (e) {
        return e
    }
}

const formFetch = async (url: string, form: FormData) => {
    try {
        const { data, error: sError } = await useFetch(url, { mode: "cors", method: "POST", body: form })
        let json = data.value
        return json
    } catch (e) {
        return e
    }
}

export { formFetch, jsonFetch, jsonPatch, deleteFetch, arrData, uniData, jwtCheck, useFetchAsync }