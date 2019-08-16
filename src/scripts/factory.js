const factoryFuncs = {
    createEventHTML (eventObj) {
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
    createDOM () {
        
        return `
        <header>
            <h1>Nutshell</h1>
            <button>Sign Out</button>
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
                <button class="cancelEventDialog">Cancel</button>
                </section>
            </dialog>
            <button class="showEvent">Add</button>
            
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
                <h1>Friends</h1>
                <article id="friendContainer"></article>
            </section>
        </section>
        `
    }
}

export default factoryFuncs
