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
    getData(resource) {
        return fetch(`http://localhost:8088/${resource}`)
            .then(response => response.json())
    },
    getuserData() {
        return fetch(`http://localhost:8088/users`)
            .then(response => response.json())
    },
    getMessage(messageId) {
        return fetch(`http://localhost:8088/messages/${messageId}`)
            .then(response => response.json())
    },
    postNewMessage(content) {
        return fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(data=> data.json())
    },
    postNewData(resource,content) {
        return fetch(`http://localhost:8088/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })},
   
    fetchMessages() {
        return fetch("http://localhost:8088/messages?_expand=user")
            .then(data => data.json())
    },

    putExistingMessage(messageId, messageToEdit) {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(messageToEdit)
        })
      },
      // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
      patchExistingMessage(messageId, messageToEdit) {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(messageToEdit)
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