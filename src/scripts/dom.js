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
    // },
    // renderFriends(friendsInDom) {
    //     const friendInDom = document.querySelector("friendContainer")
    //     friendInDom.innerHTML = ""
    //     friendsInDom.forEach(friend => {
    //         const friendRep = factoryFuncs.createFriendHTML(friend)
    //         friendInDom.innerHTML += friendRep
    //     })
    }
}

export default render
