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
    }
}

export default API