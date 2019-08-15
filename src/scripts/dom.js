const eventInDom = document.querySelector("#eventsContainer")

const render = {
    renderEvent (htmlRep) {
        eventInDom.innerHTML += htmlRep
    }
}

export default render