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
    path_img:string|null
}


type OpenVerseResult = {
    result_count:number;
    page_count:number;
    page_size:number;
    page:number;
    results:any[];
    warnings:any[];
}

interface WStateFetch {
    state:string;
    response:string | Object;
}

