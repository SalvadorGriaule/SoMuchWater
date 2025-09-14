import { openVerseAuth } from "./openVerse";
const bcAuth = new BroadcastChannel("authChannel")

bcAuth.onmessage = async (e:any) => {
    bcAuth.postMessage("initialization")
    const token = await openVerseAuth(e.data[0])
    if(typeof token == "string") {
        const resp:WStateFetch = { state:"Succes" , response:token}
        bcAuth.postMessage(resp)
    } else {
        const resp:WStateFetch = {state:"Fail" , response:token}
        bcAuth.postMessage(token)
    }
}

