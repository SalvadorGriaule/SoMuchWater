import { abortNavigation, defineNuxtRouteMiddleware } from "nuxt/app";
import { jwtCheck } from "../assets/ts/useFetch"
import { useToken } from "../composables/useToken";


export default defineNuxtRouteMiddleware(async (to, from) => {
    const admineCookie = useCookie("admin")
    if (admineCookie.value) {
        const jwt: string = admineCookie.value;
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
        if(!check) return abortNavigation();
        return 
    } else {
        return abortNavigation();
    }
})

