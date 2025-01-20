import HTTP
using Gumbo, Cascadia, AbstractTrees
if length(ARGS) == 2
    rx = r"[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4}(\S*)?"
    if !isnothing(match(rx, ARGS[1]))
        let href = "https://" * ARGS[1] * "/",impasHR = [], pastHR = [] , zoneSearch = "", select = Selector(ARGS[2]), data=open("scrap.html","a")
            zoneSearch = href
            while !isnothing(href) 
                if isnothing(findfirst(isequal(href), pastHR))
                    push!(pastHR, href)
                else
                    push!(impasHR,href)
                    for hr in pastHR
                        if !isnothing(match(Regex("$zoneSearch"), hr)) && isnothing(findfirst(isequal(hr),impasHR))
                            href = hr
                        end
                    end
                end
                try
                    r = HTTP.get(href)
                    r_parsed = parsehtml(String(r.body))
                    body = r_parsed.root[2]
                    content = eachmatch(select,body)
                    println("match with ", content)
                    if !isempty(collect(content))
                        println("plus de 0 mais ",length(collect(content)))
                        try
                            write(data,nodeText(content[1]))
                            write(data,"\n")
                        catch e
                            println("error in write ",e)
                            println("str? :",content[1])
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