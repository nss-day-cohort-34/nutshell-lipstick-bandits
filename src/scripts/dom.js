import factoryFuncs from "./factory.js"


const render = {

    renderEvent(eventsInDom) {
        const eventInDom = document.querySelector("#eventsContainer")
        eventInDom.innerHTML = ""
        eventsInDom.forEach(event => {
            const eventRep = factoryFuncs.createEventHTML(event)
            eventInDom.innerHTML += eventRep
        })
    }
    // renderFriends(friendsInDom) {
    //     API.getFriendships().then(friendships => {
    //     if (friendships.filter(friendship => (friendship.userId === parseInt(sessionStorage.getItem("userId")) || friendship.userId === username[0].id) && (friendship.friendId === parseInt(sessionStorage.getItem("userId")) || friendship.friendId === username[0].id))) {
    //         const friendInDom = document.querySelector("friendContainer")
    //         friendInDom.innerHTML = ""
    //         friendsInDom.forEach(friend => {
    //             const friendRep = factoryFuncs.createFriendHTML(friend)
    //             friendInDom.innerHTML += friendRep
    //         })
    //     }
    // })
    // }
}

export default render
