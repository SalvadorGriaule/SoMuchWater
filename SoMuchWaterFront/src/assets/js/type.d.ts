type Data = {
    id:number
    name:string;
    water_print:number
    quantité:string
}

enum OptFetch {
    single = 1,
    tab = 2
}

type ResponseTab = {
    data:Data[]|null
    error:any
}

type ResponseUni = {
    data:Data|null
    error:any
}

interface WaterPrint {
    name: string,
    id: number
}
