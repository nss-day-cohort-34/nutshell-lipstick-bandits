const factoryFuncs = {
    createEventHTML(eventObj) {
        if (parseInt(sessionStorage.getItem("userId")) === eventObj.user.id) {
        return `
        <section>
            <h2>${eventObj.eventName}</h2>
            <p>${eventObj.eventLocation}</p>
            <p>${eventObj.eventDate}</p>
            <p>Event Created by ${eventObj.user.username}</p>
            <button id="editEvent--${eventObj.id}">Edit</button>
            <button id="deleteEvent--${eventObj.id}">Delete</button>

        </section>`
        } else {
            return `
            <section>
                <h2>${eventObj.eventName}</h2>
                <p>${eventObj.eventLocation}</p>
                <p>${eventObj.eventDate}</p>
                <p>Event Created by ${eventObj.user.username}</p>`
        }
    },
    createFirstEventHTML(eventObj) {
        if (parseInt(sessionStorage.getItem("userId")) === eventObj.user.id) {
            return `
            <section>
                <h2 class="firstEvent">${eventObj.eventName}</h2>
                <p>${eventObj.eventLocation}</p>
                <p>${eventObj.eventDate}</p>
                <p>Event Created by ${eventObj.user.username}</p>
                <button id="editEvent--${eventObj.id}">Edit</button>
                <button id="deleteEvent--${eventObj.id}">Delete</button>
    
            </section>`
            } else {
                return `
                <section>
                    <h2 class="firstEvent">${eventObj.eventName}</h2>
                    <p>${eventObj.eventLocation}</p>
                    <p>${eventObj.eventDate}</p>
                    <p>Event Created by ${eventObj.user.username}</p>`
            }
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
            <dialog id="friendDialog">
                    <form action="">
                        <label for="">Search Username</label>
                        <input type="text" id="searchUsernameInput">
                    </form>
                    <button id="searchFriends">Search</button>
                    <button id="cancelFriendSearch">Cancel</button>
                    <section id="friendListContainer"></section>
                </dialog>
            <article id="eventsContainer"></article>
            <button id="addEvent" class="showEvent">Add</button>
            
            </section>
            <section id="box1_article">
            <h1>Articles</h1>
            <article id="articleContainer"></article>
            </section>
            <section id="box1_message">
            <h1>Messages</h1>
            <article id="messageContainer"></article>
            </section>
        </section>
        <section id="box2">
            <section id="box2_task">
                <h1>Tasks</h1>
                <article id="taskContainer"></article>
            </section>
            <section id="box2_friend">
                <button id="addFriendButton">Add Friend</button>
                <h1>Friends</h1>
                <article id="friendContainer"></article>
                
            </section>
        </section>
        `

    }
}


export default factoryFuncs