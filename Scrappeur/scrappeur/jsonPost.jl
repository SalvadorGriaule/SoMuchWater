using HTTP
using JSON

mutable struct Waterprint
    name::String
    portion::String
    litre::Int
end

adminPass = Dict("username" => "admin@astro.fr", "password" => "adminPass")

if length(ARGS) == 1
    if isfile(ARGS)

        # processuce d'autorisation

        auth = HTTP.post("http://127.0.0.1:8000/token"; body=Dict("username" => adminPass["username"], "password" => adminPass["password"]))
        jwt = JSON.parse(String(auth.body))

        #  traitement des données

        io = open(ARGS[1], "r")
        text = read(io, String)
        json_data = JSON.parse(text)
        data = get(json_data, "data", "undefined")
        for elem in data
            if get(elem, "Water Footprint", "undefined") != "undefined"
                numLitre = replace(SubString(get(elem, "Water Footprint", "undefined"), findfirst('(', get(elem, "Water Footprint", "undefined"))), " liters" => "", "," => "", "(" => "", ")" => "")
                println(numLitre)
                postWP = Waterprint(get(elem, "Item", "undefined"), "1", parse(Int64, numLitre))
            else
                postWP = Waterprint(get(elem, "name", "undefined"), get(elem, "portion", "undefined"), get(elem, "litre", 0))
            end

            # envoi des données
            try
                resp = HTTP.post("http://127.0.0.1:8000/waterprint/" ,["Authorization" => "Bearer " * jwt["access_token"] ]; body=JSON.json(Dict("name" => postWP.name, "water_print" => postWP.litre, "quantité" => postWP.portion)))
                println(resp)
            catch
                println(resp)
            end
        end
    end
end