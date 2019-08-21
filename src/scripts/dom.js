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
        // eventsInDom.sort((a,b) => new Date(b.eventDate) - new Date(a.eventDate))
    },
    renderMessage(chatboxes){
        const chatbox= document.querySelector("#messageContainer")
        chatbox.innerHTML=""
        chatboxes.forEach(message=> {
            const messageRep= factoryFuncs.createMessageHTML(message)
            chatbox.innerHTML += messageRep

        })
    }
}

export default render
