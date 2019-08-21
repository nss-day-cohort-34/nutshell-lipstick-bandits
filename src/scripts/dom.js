import factoryFuncs from "./factory.js"


const render = {

    renderEvent(eventsInDom) {
        const eventInDom = document.querySelector("#eventsContainer")
        eventInDom.innerHTML = ""
        eventsInDom.sort((a, b) => (a.eventDate > b.eventDate) ? 1 : -1)
        eventsInDom.forEach(event => {
            if (eventInDom.innerHTML === "") {
                const eventRep = factoryFuncs.createFirstEventHTML(event)
                eventInDom.innerHTML += eventRep
            } else if (eventInDom.innerHTML !== "") {
                const eventRep = factoryFuncs.createEventHTML(event)
                eventInDom.innerHTML += eventRep
            }
        })
    }
}

export default render
