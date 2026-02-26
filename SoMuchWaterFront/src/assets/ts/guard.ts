import { jwtCheck } from "../ts/useFetch"

// Utilisation du composable useCookie de Nuxt
export const useAdminCookie = () => useCookie<string | undefined>("admin", {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 jours (ajuste selon tes besoins)
    secure: true,
    sameSite: 'strict'
})

export const isAdmin = async (): Promise<boolean> => {
    const adminCookie = useAdminCookie()
    
    if (adminCookie.value) {
        const jwt: string = adminCookie.value
        try {
            const res = await jwtCheck(jwt)
            
            if (typeof res === "boolean") {
                return res
            } else if (typeof res === "object") {
                console.log(res)
                return false
            } else {
                return false
            }
        } catch (error) {
            console.error("Erreur lors de la vérification JWT:", error)
            return false
        }
    } else {
        return false
    }
}