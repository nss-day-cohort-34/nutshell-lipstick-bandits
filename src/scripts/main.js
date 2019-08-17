import login from "./login.js"
import signupForm from "./register.js"
import API from "./data.js"
import render from "./dom.js"


const dashboard = document.querySelector("#dashboard")


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

if (sessionStorage.userId === undefined) {
    login.createAndAppendLoginInput();
    signupForm.createAndAppendRegistrationForm();
    console.log(sessionStorage.userId)
}
if (sessionStorage.userId >= 1) {

}


// get all events
// API.fetchEvents().then(events => {
//     render.renderEvent(events)
// })

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

dashboard.addEventListener("click", event => {
    const showEventDialog = document.querySelector("#addEvent")
    if (event.target.id.startsWith("addEvent")) {
        const eventDialog = document.querySelector("#eventDialog")
        eventDialog.show()
    }
})
dashboard.addEventListener("click", event => {
    const saveEventButton = document.querySelector("#saveEventButton")
    if (event.target.id.startsWith("saveEventButton")) {
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
        const hiddenField = document.querySelector("#eventID")
        if (hiddenField.value !== "") {
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
                }
                )
        } else {
            API.postEvent(newEvent).then(() => {
                const eventsContainer = document.querySelector("#eventsContainer")
                eventsContainer.innerHTML = ""
                API.fetchEvents().then(events => {
                    render.renderEvent(events)
                })
                eventNameInput.value = ""
                eventLocationInput.value = ""
                eventDateInput.value = ""
            })
        }
        const eventDialog = document.querySelector("#eventDialog")
        eventDialog.close()
        saveEventButton.innerHTML = "Save"
    }
})

dashboard.addEventListener("click", event => {
    const cancelEventDialog = document.querySelector("#cancelDialogEventBox")
    if (event.target.id.startsWith("cancelDialogEventBox")) {
        const eventDialog = document.querySelector("#eventDialog")
        eventDialog.close()
    }
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
            const eventDialog = document.querySelector("#eventDialog")
            eventDialog.show()
            const saveEventButton = document.querySelector("#saveEventButton")
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


