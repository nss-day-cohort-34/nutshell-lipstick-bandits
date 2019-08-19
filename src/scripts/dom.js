import factoryFuncs from "./factory.js"


const render = {

    renderEvent(eventsInDom) {
        const eventInDom = document.querySelector("#eventsContainer")
        eventInDom.innerHTML = ""
        eventsInDom.forEach(event => {
            const eventRep = factoryFuncs.createEventHTML(event)
            eventInDom.innerHTML += eventRep
        })
        // eventsInDom.sort((a,b) => new Date(b.eventDate) - new Date(a.eventDate))
    }
}

export default render
