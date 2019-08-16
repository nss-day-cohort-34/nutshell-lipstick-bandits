const API = {
    fetchEvents () {
        return fetch("http://localhost:8088/events")
        .then (data => data.json())
    }
}

export default API