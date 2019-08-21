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
