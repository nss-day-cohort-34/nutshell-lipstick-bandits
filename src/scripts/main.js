import login from "./login.js"
import signupForm from "./register.js"
import factoryFunc from "./factory.js"

const dashboard = document.querySelector("#dashboard")

dashboard.innerHTML = factoryFuncs.createDOM()

const eventsContainer = document.querySelector("#eventsContainer")

const eventDialog = document.querySelector("#eventDialog")
const showEventDialog = document.querySelector(".showEvent")
const hideEventDialog = document.querySelector(".hideEvent")
const cancelEventDialog = document.querySelector(".cancelEventDialog")

const eventNameInput = document.querySelector("#eventNameInput")
const eventLocationInput = document.querySelector("#eventLocationInput")
const eventDateInput = document.querySelector("#eventDateInput")

const hiddenField = document.querySelector("#eventID")

const saveEventButton = document.querySelector("#saveEventButton")


// get all events
API.fetchEvents().then(events => {
    render.renderEvent(events)
})

// delete event
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
})

showEventDialog.addEventListener("click", event => {
    const showEventDialog = document.querySelector(".showEvent")
    eventDialog.show()
})
hideEventDialog.addEventListener("click", event => {
    const hideEventDialog = document.querySelector(".hideEvent")
    const eventNameInput = document.querySelector("#eventNameInput")
    const eventLocationInput = document.querySelector("#eventLocationInput")
    const eventDateInput = document.querySelector("#eventDateInput")
    const newEvent = {
        eventName: eventNameInput.value,
        eventLocation: eventLocationInput.value,
        eventDate: eventDateInput.value,
        userId: 1
    }
    console.log(newEvent)
    if (hiddenField.value !== "") {
        API.editEvent(hiddenField.value, newEvent)
            .then(() => {
                eventsContainer.innerHTML = ""
                API.fetchEvents().then(events => {
                    render.renderEvent(events)
                })
                hiddenField.innerHTML = ""
                eventNameInput.value = ""
                eventLocationInput.value = ""
                eventDateInput.value = ""
            }
            )
    } else {
        API.postEvent(newEvent).then(() => {
            eventsContainer.innerHTML = ""
            API.fetchEvents().then(events => {
                render.renderEvent(events)
            })
        })
    }
    eventDialog.close()
    saveEventButton.innerHTML = "Save"
})

cancelEventDialog.addEventListener("click", () => {
    const cancelEventDialog = document.querySelector(".cancelEventDialog")
    eventDialog.close()
})

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
            eventDialog.show()
            saveEventButton.innerHTML = "Edit"
        })
}

dashboard.addEventListener("click", event => {
    const eventsContainer = document.querySelector("#eventsContainer")
    if (event.target.id.startsWith("editEvent")) {
        const eventId = event.target.id.split("--")[1]
        populateDialogToEdit(eventId)
    }
})

// const showTest = document.querySelector("#showTest")
// const dashboard = document.querySelector("#dashboard")

// showTest.addEventListener("click", () => {
//     dashboard.classList.toggle("show")
// })
 if (sessionStorage.userId === undefined) {
    login.createAndAppendLoginInput();
    signupForm.createAndAppendRegistrationForm();
    console.log(sessionStorage.userId)
  } 
  if (sessionStorage.userId >= 1) {
     
}
 
