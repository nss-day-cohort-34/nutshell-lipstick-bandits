import API from "./data.js"
import render from "./dom.js"
import factoryFuncs from "./factory.js"
import login from "./login.js"
import signupForm from "./register.js"
// render friends
const getFriendsOnDom = () => {
  API.getFriendships().then(friendships => {
    const friends = friendships.filter(friendship => (friendship.userId === parseInt(sessionStorage.getItem("userId")) || friendship.friendId === parseInt(sessionStorage.getItem("userId"))))
    friends.forEach(friend => {
      if (friend.userId === parseInt(sessionStorage.getItem("userId")) && friend.friends === true) {
        API.getUsers().then(users => {
          users.forEach(user => {
            if (user.id === friend.friendId) {
              friendContainer.innerHTML += `<h2>${user.username}</h2><button id="deleteFriend--${friend.userId}">Remove Friend</button>`
            }
          });
        })
      } else if (friend.userId !== parseInt(sessionStorage.getItem("userId")) && friend.friends === true) {
        friendContainer.innerHTML += `<h2>${friend.user.username}</h2><button id="deleteFriend--${friend.userId}">Remove Friend</button>`
      } else if (friend.userId === parseInt(sessionStorage.getItem("userId")) && friend.friends === false) {
        API.getUsers().then(users => {
          users.forEach(user => {
            if (user.id === friend.friendId) {
              friendContainer.innerHTML += `<h2>${user.username}</h2><p>Pending</p>`
            }
          });
        })
      } else if (friend.userId !== parseInt(sessionStorage.getItem("userId")) && friend.friends === false) {
        friendContainer.innerHTML += `<h2>${friend.user.username}</h2><p>Pending</p><button id="acceptFriend--${friend.userId}">Accept</button>`
      }
    });
  })
}


const dashboard = document.querySelector("#dashboard")

if (sessionStorage.userId === undefined) {

  login.createAndAppendLoginInput();
  signupForm.createAndAppendRegistrationForm();
  console.log(sessionStorage.userId)
}
if (sessionStorage.userId >= 1) {
  dashboard.innerHTML = factoryFuncs.createDOM()
  API.fetchEvents().then(events => {
    render.renderEvent(events)
  })
  API.fetchMessages().then(message => {
    render.renderMessage(message)
  })
  const friendContainer = document.querySelector("#friendContainer")
  getFriendsOnDom()
}



dashboard.addEventListener("click", () => {
  if (event.target.id === "pleasework") {
    sessionStorage.clear();
    location.reload();

  }
})
dashboard.addEventListener("click", event => {
  if (event.target.id === "addMessage") {
    const content = {
      message: messageInput.value,
      userId: sessionStorage.getItem("userId")
    }
    API.postNewMessage(content)
    .then(() => {
      const eventsContainer = document.querySelector("#eventsContainer")

      API.fetchMessages().then(message => {
        render.renderMessage(message)
      })
    }
    )
  }
})
// delete event
dashboard.addEventListener("click", () => {
  if (event.target.id.startsWith("editMessage")) {
    console.log("edit this")
    let articleId = event.target.parentNode.id
    let messageId = articleId.split("--")[1]
    API.getMessage(messageId)
    .then(response => {
      factoryFuncs.createAndAppendForm(messageId, response)
      })
    }
})
dashboard.addEventListener("click", event => {
  if (event.target.id.startsWith("deleteEvent")) {
    const eventsContainer = document.querySelector("#eventsContainer")
    const eventId = event.target.id.split("--")[1]
    eventsContainer.innerHTML = ""
    console.log("Delete")
    API.deleteEvent(eventId)
    .then(() => {
      API.fetchEvents().then(events => {
        render.renderEvent(events)
      })
    }
    )
  }


  // show dialog box
  dashboard.addEventListener("click", event => {
    const showEventDialog = document.querySelector("#addEvent")
    if (event.target.id.startsWith("addEvent")) {
      const eventDialog = document.querySelector("#eventDialog")
      eventDialog.show()
    }
  })

  // editing/adding with date validation
  dashboard.addEventListener("click", event => {
    const now = new Date()
    const day = now.getDate()
    const month = ("0" + (now.getMonth() + 1)).slice(-2)
    const today = `${now.getFullYear()}-${month}-${day}`
    const saveEventButton = document.querySelector("#saveEventButton")
    if (event.target.id.startsWith("saveEventButton")) {
      const eventNameInput = document.querySelector("#eventNameInput")
      const eventLocationInput = document.querySelector("#eventLocationInput")
      const eventDateInput = document.querySelector("#eventDateInput")
      const newEvent = {
        eventName: eventNameInput.value,
        eventLocation: eventLocationInput.value,
        eventDate: eventDateInput.value,
        userId: sessionStorage.getItem("userId")
      }
      console.log(newEvent)
      const hiddenField = document.querySelector("#eventID")
      if (hiddenField.value !== "" && eventDateInput.value >= today) {
        API.editEvent(hiddenField.value, newEvent)
          .then(() => {
            const eventsContainer = document.querySelector("#eventsContainer")
            eventsContainer.innerHTML = ""
            API.fetchEvents().then(events => {
              render.renderEvent(events)
            })
            hiddenField.value = ""
            eventNameInput.value = ""
            eventLocationInput.value = ""
            eventDateInput.value = ""
            const eventDialog = document.querySelector("#eventDialog")
            eventDialog.close()
            saveEventButton.innerHTML = "Save"
          }
          )
        } else if (eventDateInput.value >= today) {
          API.postEvent(newEvent).then(() => {
          const eventsContainer = document.querySelector("#eventsContainer")
          eventsContainer.innerHTML = ""
          API.fetchEvents().then(events => {
            render.renderEvent(events)
          })
          eventNameInput.value = ""
          eventLocationInput.value = ""
          eventDateInput.value = ""
          const eventDialog = document.querySelector("#eventDialog")
          eventDialog.close()
          saveEventButton.innerHTML = "Save"
        })
      } else {
        window.alert("Cannot choose date that has already passed")
      }

    }
  })

  // cancel dialog box
  dashboard.addEventListener("click", event => {
    const cancelEventDialog = document.querySelector("#cancelDialogEventBox")
    if (event.target.id.startsWith("cancelDialogEventBox")) {
      const eventDialog = document.querySelector("#eventDialog")
      eventDialog.close()
    }
  })

  // populate form with previously written event for editing
  const populateDialogToEdit = (eventId) => {
    const eventNameInput = document.querySelector("#eventNameInput")
    const eventLocationInput = document.querySelector("#eventLocationInput")
    const eventDateInput = document.querySelector("#eventDateInput")
    const hiddenField = document.querySelector("#eventID")
    fetch(`http://localhost:8088/events/${eventId}?_expand=user`)
    .then(data => data.json())
      .then(event => {
        hiddenField.value = event.id
        eventNameInput.value = event.eventName
        eventLocationInput.value = event.eventLocation
        eventDateInput.value = event.eventDate
        const eventDialog = document.querySelector("#eventDialog")
        eventDialog.show()
        const saveEventButton = document.querySelector("#saveEventButton")
        saveEventButton.innerHTML = "Edit"
      })
    }

    // edit
    dashboard.addEventListener("click", event => {
    const eventsContainer = document.querySelector("#eventsContainer")
    if (event.target.id.startsWith("editEvent")) {
      const eventId = event.target.id.split("--")[1]
      populateDialogToEdit(eventId)
    }
  })


  // show friend search dialog box
  dashboard.addEventListener("click", event => {
    const addFriendButton = document.querySelector("#addFriendButton")
    const friendDialog = document.querySelector("#friendDialog")
    if (event.target.id.startsWith("addFriendButton")) {
      friendDialog.show()
    }
  })

  // cancel friend search
  dashboard.addEventListener("click", event => {
    const friendDialog = document.querySelector("#friendDialog")
    const cancelFriendSearch = document.querySelector("#cancelFriendSearch")
    const searchUsernameInput = document.querySelector("#searchUsernameInput")
    const friendListContainer = document.querySelector("#friendListContainer")
    if (event.target.id.startsWith("cancelFriendSearch")) {
      friendListContainer.innerHTML = ""
      searchUsernameInput.value = ""
      friendDialog.close()
    }
  })

  // search and add friend
  dashboard.addEventListener("click", event => {
    const friendListContainer = document.querySelector("#friendListContainer")
    const searchFriends = document.querySelector("#searchFriends")
    const searchUsernameInput = document.querySelector("#searchUsernameInput")
    const friendContainer = document.querySelector("#friendContainer")
    if (event.target.id.startsWith("searchFriends")) {
      API.searchUsers(searchUsernameInput.value).then(username => {
        friendListContainer.innerHTML = `<h1>${username[0].username}</h1><button id="addFriend">Add Friend</button>`
        const addFriend = document.querySelector("#addFriend")
        addFriend.addEventListener("click", () => {
          API.getFriendships().then(friendships => {
            const areWeFriends = friendships.filter(friendship => (friendship.userId === parseInt(sessionStorage.getItem("userId")) || friendship.userId === username[0].id) && (friendship.friendId === parseInt(sessionStorage.getItem("userId")) || friendship.friendId === username[0].id) && username[0].username === parseInt(sessionStorage.getItem("userId")));
            console.log(areWeFriends)
            if (areWeFriends.length === 0) {
              const newFriendship = {
                userId: parseInt(sessionStorage.getItem("userId")),
                friendId: username[0].id,
                friends: false
              }
              API.addFriendship(newFriendship).then(() => {
                friendContainer.innerHTML = ""
                const friendDialog = document.querySelector("#friendDialog")
                friendListContainer.innerHTML = ""
                searchUsernameInput.value = ""
                friendDialog.close()
                getFriendsOnDom()
              })
            }
          })
        })
      })
    }
  })

  // accept friendship and edit friendship in json
  dashboard.addEventListener("click", event => {
    if (event.target.id.startsWith("acceptFriend")) {
      const friendId = event.target.id.split("--")[1]
      API.getUsers().then(users => {
        users.forEach(user => {
          if (user.id === parseInt(friendId)) {
            API.getFriendships().then(friendships => {
              friendships.forEach(friendship => {
                if (friendship.userId === user.id && friendship.friendId === parseInt(sessionStorage.getItem("userId"))) {
                  friendship.friends = true
                  const friendshipId = friendship.id
                  const newFriendsGreat = {
                    userId: friendship.userId,
                    friendId: friendship.friendId,
                    friends: friendship.friends
                  }
                  API.editFriendship(friendshipId, newFriendsGreat).then(() => {
                    const friendContainer = document.querySelector("#friendContainer")
                    friendContainer.innerHTML = ""
                    getFriendsOnDom()
                  })
                }
              });
            })
          }

        });
      })
    }
  })

  // delete friendship
  dashboard.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteFriend")) {
      const friendId = event.target.id.split("--")[1]
      const friendContainer = document.querySelector("#friendContainer")
      friendContainer.innerHTML = ""
      API.getFriendships().then(friendships => {
        friendships.forEach(friendship => {
          if (friendship.userId === parseInt(friendId)) {
            const friendshipId = friendship.id
            API.deleteFriendship(friendshipId).then(() => {
              getFriendsOnDom()
            })
          }
        });
      })
    }

  })
})
