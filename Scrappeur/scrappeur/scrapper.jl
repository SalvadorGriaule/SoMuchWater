import HTTP
using Gumbo, Cascadia, AbstractTrees, JSON

if length(ARGS) == 2
    rx = r"[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4}(\S*)?"
    if !isnothing(match(rx, ARGS[1]))
        let href = "https://" * ARGS[1] * "/", impasHR = [], pastHR = [], zoneSearch = "", select = Selector(ARGS[2]), tabI::Number = 1
            zoneSearch = href
            while !isnothing(href)
                if isnothing(findfirst(isequal(href), pastHR))
                    push!(pastHR, href)
                else
                    push!(impasHR, href)
                    for hr in pastHR
                        if !isnothing(match(Regex("$zoneSearch"), hr)) && isnothing(findfirst(isequal(hr), impasHR))
                            href = hr
                        end
                    end
                end
                try
                    r = HTTP.get(href)
                    r_parsed = parsehtml(String(r.body))
                    body = r_parsed.root[2]
                    content = eachmatch(select, body)
                    # println("match with ", content)
                    if !isempty(collect(content))
                        println("plus de 0 mais ", length(collect(content)))
                        try
                            tableHTML::Array{Dict} = []
                            tableTd::Dict = Dict()
                            trFirst = 0
                            arrayKey = []
                            currentKey = 1
                            for elem in PreOrderDFS(content[1].children)
                                println(typeof(elem))
                                if typeof(elem) <: HTMLText
                                    println(elem.text)
                                elseif typeof(elem) <: HTMLElement
                                    println(tag(elem))
                                    if (tag(elem) == :tr) && (trFirst == 0 || trFirst == 1)
                                        trFirst += 1
                                    elseif tag(elem) == :tr && trFirst > 1
                                        push!(tableHTML, tableTd)
                                        tableTd = Dict()
                                        currentKey = 1
                                    elseif (tag(elem) == :td || tag(elem) == :th) && trFirst == 1
                                        tableTd[nodeText(elem)] = ""
                                        arrayKey = [keys(tableTd)...]
                                        println(arrayKey)
                                    elseif tag(elem) == :td
                                        tableTd[arrayKey[currentKey]] = nodeText(elem)
                                        println(tableTd)
                                        currentKey += 1
                                    end
                                end
                            end
                            println(tableHTML)
                            open(string("tab", tabI, ".json"), "w") do f
                                JSON.print(f, Dict("data" => tableHTML), 4)
                            end
                            tabI += 1
                            # write(data,nodeText(content[1]))
                            # write(data,"\n")
                        catch e
                            println("error in write ", e)
                        end
                    end
                    for elem in PreOrderDFS(body)
                        try
                            if tag(elem) == :a
                                tmpHR = getattr(elem, "href")
                                if !isnothing(match(Regex("$zoneSearch"), tmpHR)) && isnothing(findfirst(isequal(tmpHR), pastHR))
                                    href = tmpHR
                                end
                            end
                        catch
                        end
                    end
                catch
                    continue
                end
                println("current:", href)
            end
            for hr in pastHR
                println(hr)
            end
        end
    else
        println("lien invalide")
    end
else
    println("nombre d'argument invalide")
end

# CLIENT_ID=CBb20uZCcycK0QhtbP8trvqy4sTBkcCC1GMDF2QE
# CLIENT_SECRET=C4FBDDNmt7Taqo2ZSS9GNBom1HpjGGIhXuoBjfty70vjRJvvXdvKcgnkfjiBoZoP93sHfD0hZlv9sT0Pd2h3H1sHRtkislwOres5b5I8BceHd2wweWebSDwoAhocggN3
# SECRET_KEY=51e14729a14876cffb31272d914eb82e4e79f3112f15a0da5c89a1d7e42cbf12
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=60