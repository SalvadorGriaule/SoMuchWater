using HTTP
using JSON

mutable struct Waterprint
    name::String
    portion::String
    litre::Int
end

if length(ARGS) == 1
    if isfile(ARGS)
        io = open(ARGS[1],"r")
        text = read(io,String)
        json_data = JSON.parse(text)
        data = get(json_data,"data","undefined")
        for elem in data
            if get(elem,"Water Footprint","undefined") != "undefined"
                numLitre = replace(SubString(get(elem,"Water Footprint","undefined"),findfirst('(',get(elem,"Water Footprint","undefined")))," liters" => "", "," => "", "(" => "", ")" => "")
                println(numLitre)
                postWP = Waterprint(get(elem,"Item","undefined"),"1",parse(Int64,numLitre))
            else
                postWP = Waterprint(get(elem,"name","undefined"),get(elem,"portion","undefined"),get(elem,"litre",0))
            end
            
            resp = HTTP.post("http://127.0.0.1:8000/waterprint/"; body=JSON.json( Dict("name" => postWP.name, "water_print" => postWP.litre, "quantité" => postWP.portion)))
            println(postWP,resp)
        end
    end
end