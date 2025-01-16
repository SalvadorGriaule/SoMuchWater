using HTTP, Gumbo, AbstractTrees

mutable struct waterprint
    name::String
    portion::String
    litre::String
end

if length(ARGS) == 1
    rx = r"[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4}(\S*)?"
    if !isnothing(match(rx, ARGS[1]))
        let href = "https://" * ARGS[1] * "/", dataScrap = []

            r = HTTP.get(href)
            r_parsed = parsehtml(String(r.body))
            body = r_parsed.root[2]
            for elem in PreOrderDFS(body)
                try
                    if tag(elem) == :div && getattr(elem, "class") =="entry-content "
                        println(tag(elem)," ",getattr(elem, "class"))
                        println(children(elem))
                        println(elem)
                    end
                catch
                    
                    # if tag(elem) == div && getattr(elem, "class") == "fd-card"
                    #     println(getattr(elem, "class"))
                    #     # currentWP = waterprint("", "", "")
                    #     for balise in children(elem)
                    #         if getattr(balise, "class") == "recipe-title"
                    #             println(balise)
                    #         elseif getattr(balise, "class") == "ozServing"
                    #             println(balise)
                    #         elseif getattr(balise, "class") == "litersKg"
                    #             println(balise)
                    #         end
                    #     end
                    #     # println(currentWP)
                    # end
                end


            end


            println("current:", href)
        end
    else
        println("lien invalide")
    end
end