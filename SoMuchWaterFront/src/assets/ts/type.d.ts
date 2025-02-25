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


class OpenVerseResult {
    result_count:number;
    page_count:number;
    page_size:number;
    page:number;
    results:any[];
    warnings:any[];

    constructor(result_count: number,page_count:number,page_size:number,page:number,result:any[],warnings:any[]){
        this.result_count = result_count;
        this.page_count = page_count;
        this.page_size = page_size;
        this.page = page;
        this.results = result;
        this.warnings = warnings;
    }
}

interface WStateFetch {
    state:string;
    response:string | Object;
}

