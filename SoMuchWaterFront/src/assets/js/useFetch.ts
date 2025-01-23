import { ref, watchEffect, toValue, type Ref, watch } from 'vue'

export const arrData = (url: string): Ref<Data[]> | void => {
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

export const uniData = (url: string): Ref<Data> => {
    let resp: Ref<Data> = ref({ id: 0, name: "", water_print: 0, quantité: "" })

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

export const useFetch = (url: string) => {
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

export const jsonFetch = async (url: string, data: Object) => {

    try {
        const resp = await fetch(url, { mode: "cors", method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        let json = await resp.json()
        return json
    } catch (e) {
        return e
    }
}