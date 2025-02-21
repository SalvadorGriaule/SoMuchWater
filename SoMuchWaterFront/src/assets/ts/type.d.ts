enum StateFetch {
    Wait = "Waiting",
    Succes = "Succes",
    Fail = "Fail",
}

type Data = {
    id:number
    name:string;
    water_print:number
    quantité:string
}

interface WStateFetch {
    state:string;
    response:string | Object;
}

