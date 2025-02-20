import { openVerseAuth } from "./openVerse.ts";

onconnect = (e) => {
    let port = e.ports[0];
    port.onmessage = async (e) => {
        const token = await openVerseAuth(e.data[0])
        port.postMessage(token)
    }
    port.postMessage("init openVerseAuth")
}

// export default self