using HTTP
using JSON

mutable struct Waterprint
    name::String
    portion::String
    litre::Int
end

if length(ARGS) == 1
    rx = r"[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4}(\S*)?"
    if !isnothing(match(rx, ARGS[1]))
        let url = "https://" * ARGS[1]
            try
                response = HTTP.get(url)
                json_data = JSON.parse(String(response.body))
                let tabWp::Array = []
                    for elem in json_data
                        currentWp::Waterprint = Waterprint("","",0);
                        currentWp.name = get(elem, "productdesc", "undefined")
                        currentWp.portion = get(elem, "portionsize", "undefined")
                        currentWp.litre = get(elem, "wfplts", "undefined")
                        push!(tabWp,Dict("name" => currentWp.name,"portion" => currentWp.portion,"litre" => currentWp.litre))
                    end
                    open("data.json","w") do f
                        JSON.print(f, Dict("data" => tabWp), 4)
                    end
                end
            catch
                print("error")
            end
        end
    end
end
