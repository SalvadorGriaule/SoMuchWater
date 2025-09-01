import Cookies from "universal-cookie"
import { jwtCheck } from "../ts/useFetch"

export const cookies: Cookies = new Cookies(document.cookie, { path: '/' })

export const isAdmin = async (): Promise<boolean> => {
    if (cookies.get("admin")) {
        const jwt: string = cookies.get("admin");
        const check = await jwtCheck(jwt).then((res) => {
            if(typeof res == "boolean" ){
                return res
            } else if (typeof res == "object") {
                console.log(res)
                return false
            } else {
                return false
            }
        })
        return check;
    } else {
        return false;
    }
}

