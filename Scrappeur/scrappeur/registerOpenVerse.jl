using HTTP
using JSON

mutable struct Registering
    name::String
    description::String
    email::String
end

if length(ARGS) == 3
    data = Registering(ARGS[1], ARGS[2], ARGS[3])
    if length(data.name) <= 150 && length(data.description) <= 10000 && length(data.email) <= 254
        json = JSON.json(Dict("name" => data.name, "description" => data.description, "email" => data.email))
        send = HTTP.post("https://api.openverse.org/v1/auth_tokens/register/",["Content-Type" => "application/json"]; body=json)
        println(send)
    else
        println("un input dépasse la limite")
    end
end
