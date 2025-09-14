const loadSVG = async (filename:File):Promise<HTMLDivElement> => {
    const content = document.createElement("div")
    content.classList.add("svgContent")
    await fetch("./asset/img/svg/" + filename).then((val) => { return val.text() }).then((val) => {
        content.innerHTML = val.substring(val.indexOf("<svg"));
    })
    return content
}

const fillSVG = (svg:SVGElement, ...color:string[]) => {
    const SVGelem = [...svg.querySelectorAll("rect"), ...svg.querySelectorAll("path")]
    let j = 0;

    for (let i = 0; i < SVGelem.length; i++) {
        if (color[j] != "") SVGelem[i].style.fill = color[j];
        if (j < color.length - 1) j++
    }
}

const dropSVG = async (svgText:File):Promise<string> => {
    const response = await svgText.text()
    return response;
}

export { dropSVG, loadSVG, fillSVG }