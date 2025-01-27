import router from "@/router"
import Cookies from "universal-cookie"

const cookies:Cookies = new Cookies(document.cookie, { path: '/'})

export const isAdmin = () => {
    if(cookies.get("admin")) {
        console.log("Cookies admin detected")
    } else {
        router.push('/')
    }
}

