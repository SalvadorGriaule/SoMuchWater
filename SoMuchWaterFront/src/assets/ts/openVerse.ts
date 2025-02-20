interface OpenVerseToken {
    access_token: string;
    scope: string;
    expires_in: number
    token_type: string
}

export const openVerseAuth = async (jwt: string): Promise<string | Object> => {
    try {
        const resp = await fetch("http://127.0.0.1:8000/api/openverse/token", { mode: "cors", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${jwt}` } })
        let json: OpenVerseToken = await resp.json()
        if (json.hasOwnProperty("access_token")) {
            return json.access_token
        } else {
            return { error: "erreur d'identification" , json:json }
        }
    } catch (error) {
        return { error: error }
    }
}