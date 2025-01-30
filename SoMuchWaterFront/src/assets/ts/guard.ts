import Cookies from "universal-cookie"

export const cookies:Cookies = new Cookies(document.cookie, { path: '/'})

export const isAdmin = ():boolean => {
    if(cookies.get("admin")) {
       return true;
    } else {
        return false;
    }
}

