using Blink
using JSExpr
wait_for_key(prompt) = (print(stdout, prompt); read(stdin, 1); nothing)

w = Window()
loadurl(w, "https://watercalculator.org/water-footprint-of-food-guide")
opentools(w)


wait_for_key("press any key to continue")
div = @js w console.log(document.querySelectorAll(".fd-card"))
println(values(div))
wait_for_key("press any key to continue")