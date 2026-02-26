import { abortNavigation, defineNuxtRouteMiddleware } from "nuxt/app";
import { jwtCheck } from "../assets/ts/useFetch"
import { useToken } from "../composables/useToken";


export default defineNuxtRouteMiddleware(async (to, from) => {
    if (useToken().value) {
        const jwt: string = useToken().value;
        const check = await jwtCheck(jwt).then((res) => {
            if (typeof res == "boolean") {
                return res
            } else if (typeof res == "object") {
                console.log(res)
                return false
            } else {
                return false
            }
        })
        return 
    } else {
        return abortNavigation();
    }
})

