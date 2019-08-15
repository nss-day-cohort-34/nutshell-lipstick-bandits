const factoryFuncs = {
    createEventHTML (eventObj) {
        return `
        <section>
            <h1>${eventObj.eventName}</h1>
            <p>${eventObj.eventLocation}</p>
            <p>${eventObj.eventDate}</p>
            <button class="editEvent--${eventObj.id}">Edit</button>
            <button class="deleteEvent--${eventObj.id}">Delete</button>
        </section>`
    }
}

export default factoryFuncs