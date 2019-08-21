const API = {
    fetchEvents() {
        return fetch("http://localhost:8088/events?_expand=user")
            .then(data => data.json())
    },
    postEvent(newEvent) {
        return fetch("http://localhost:8088/events?_expand=user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        })
            .then(data => data.json())
    },
    deleteEvent(eventId) {
        return fetch(`http://localhost:8088/events/${eventId}`,
            {
                "method": "DELETE"
            }
        )
            .then(data => data.json())
    },
    editEvent(eventId, updatedEvent) {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent)
        })
            .then(data => data.json())
    },
    getData(target) {
        return fetch(`http://localhost:8088/${target}`)
            .then(response => response.json())
    },
    getcontentData(target, content) {
        return fetch(`http://localhost:8088/${target}/${content}`)
            .then(response => response.json())
    },
    postNewData(target, content) {
        return fetch(`http://localhost:8088/${target}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
    },
    getUsers() {
        return fetch("http://localhost:8088/users")
        .then(data => data.json())
    },
    searchUsers(username) {
        return fetch(`http://localhost:8088/users?q=${username}`)
        .then(data => data.json())
    },
    getFriendships() {
        return fetch("http://localhost:8088/friendships?_expand=user")
        .then(data => data.json())
    },
    addFriendship(newFriendship) {
        return fetch("http://localhost:8088/friendships", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriendship)
        })
            .then(data => data.json())
    },
    editFriendship(friendshipId, updatedFriendship) {
        return fetch(`http://localhost:8088/friendships/${friendshipId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFriendship)
        })
            .then(data => data.json())
    },
    deleteFriendship(friendshipId) {
        return fetch(`http://localhost:8088/friendships/${friendshipId}`,
            {
                "method": "DELETE"
            }
        )
            .then(data => data.json())
    }

}

export default API