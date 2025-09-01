const initPush = (toast: HTMLDivElement, diode: HTMLSpanElement) => {
    diode.classList.add('animate-ping');
    diode.classList.add('bg-yellow-500');
    toast.classList.remove("translate-y-[150%]");
}

const validPush = (toast: HTMLDivElement, diode: HTMLSpanElement) => {
    diode.classList.remove("animate-ping");
    diode.classList.remove("bg-yellow-500")
    diode.classList.add("bg-sky-500")
    setTimeout(() => {
        toast.classList.add("translate-y-[150%]")
    },2400)
}

export { validPush , initPush }