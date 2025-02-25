interface OpenVerseToken {
    access_token: string;
    scope: string;
    expires_in: number
    token_type: string
}


const openVerseAuth = async (jwt: string): Promise<string | Object> => {
    try {
        const resp = await fetch("http://127.0.0.1:8000/api/openverse/token", { mode: "cors", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${jwt}` } })
        let json: OpenVerseToken = await resp.json()
        if (json.hasOwnProperty("access_token")) {
            return json.access_token
        } else {
            return { error: "erreur d'identification", json: json }
        }
    } catch (error) {
        return { error: error }
    }
}

const openVerseSearch = async (tokenOV: string, search: string): Promise<OpenVerseResult|Object> => {
    search = search.replace(" ","+")
    try {
        const resp = await fetch(`https://api.openverse.org/v1/images/?q=${search}`, { mode: "cors", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${tokenOV}` } })
        let json: OpenVerseResult = await resp.json()
        if (json.hasOwnProperty("result_count")){
            return json
        } else {
            return { error: "erreur lors de la recherche", json: json }
        }
    } catch (err){
        return { error: err }
    }
}

export type { OpenVerseToken }
export { openVerseAuth ,openVerseSearch}