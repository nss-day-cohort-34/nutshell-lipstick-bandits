import login from "./login.js"
import API from "./data.js";
import messageList from "./messageapi.js"
const factoryFuncs = {
    createEventHTML(eventObj) {
        return `
        <section>
            <h1>${eventObj.eventName}</h1>
            <p>${eventObj.eventLocation}</p>
            <p>${eventObj.eventDate}</p>
            <p>Event Created by ${eventObj.user.username}</p>
            <button id="editEvent--${eventObj.id}">Edit</button>
            <button id="deleteEvent--${eventObj.id}">Delete</button>

        </section>`

    },

    createMessageHTML(messageObj) {
        if (sessionStorage.userId == messageObj.userId) {
            return `<section id = "message--${messageObj.id}">
        <p>${messageObj.message}</p>
        <h5>Message from: ${messageObj.user.username}</h5>
        <button id="editMessage--${messageObj.id}">Edit</button>
        </section>`}
        else return `<section>
        <p>${messageObj.message}</p>
        <h5>Message from: ${messageObj.user.username}</h5></section>`

    },
    createAndAppendForm(messageId, messageObjToEdit) {

        let messageField = document.createElement("p")
        let messageLabel = document.createElement("label")
        messageLabel.textContent = "Message"
        let messageInput = document.createElement("input")
        messageInput.value = messageObjToEdit.message

        messageField.appendChild(messageLabel)
        messageField.appendChild(messageInput)

        let submitEditButton = document.createElement("button")
        submitEditButton.textContent = "Save"
        submitEditButton.addEventListener("click", () => {
            let editedMessage = {
                message: messageInput.value,

            }

            API.patchExistingMessage(messageObjToEdit.id, editedMessage)
                .then(response => {
                    messageList.postMessage()
                })
        })


        const messageSection = document.getElementById(`message--${messageId}`)


        while (messageSection.firstChild) {
            messageSection.removeChild(messageSection.firstChild);
        }
        messageSection.appendChild(messageField)
        messageSection.appendChild(submitEditButton)
    },


    createDOM() {
        return `
        <header>
            <h1>Nutshell</h1>
       <button id="pleasework">Sign Out</button>
        </header>
        <section id="box1">
            <section id="box1_event">
            <h1>Events</h1>
            <article id="eventsContainer"></article>
            <dialog id="eventDialog">
                <input type="hidden" id="eventID" value="" />
                <section>
                <form action="">
                    <label for="">Event Name</label>
                    <input type="text" id="eventNameInput">
                </form>
                <form action="">
                    <label for="">Event Location</label>
                    <input type="text" id="eventLocationInput">
                </form>
                <form action="">
                    <label for="">Event Date</label>
                    <input type="date" id="eventDateInput">
                </form>
                <button id="saveEventButton" class="hideEvent">Save</button>
                <button id="cancelDialogEventBox" class="cancelEventDialog">Cancel</button>
                </section>
            </dialog>
            <button id="addEvent" class="showEvent">Add</button>
            
            </section>
            <section id="box1_article">
            <h1>Articles</h1>
            <article id="articleContainer"></article>
            </section>
            <section id="box1_message">
            <h1>Messages</h1>
            <article id="messageContainer">
            </article>
            <input  placeholder="Enter a message" type="text" id="messageInput">
            <button id="addMessage">Send</button>
            </section>
        </section>
        <section id="box2">
            <section id="box2_task">
                <h1>Tasks</h1>
                <article id="taskContainer"></article>
            </section>
            <section id="box2_friend">
                <h1>Friends</h1>
                <article id="friendContainer"></article>
            </section>
        </section>
        `

    }
}


export default factoryFuncs