import { ref, watchEffect, toValue} from 'vue'

export const useFetch = (url:string) => {
    const data = ref(null);
    const error = ref(null);

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