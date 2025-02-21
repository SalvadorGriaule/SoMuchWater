import { openVerseAuth } from "./openVerse.ts";

const bcAuth = new BroadcastChannel("authChannel")

bcAuth.onmessage = async (e:any) => {
    const token = await openVerseAuth(e.data[0])
    bcAuth.postMessage(token)
}

