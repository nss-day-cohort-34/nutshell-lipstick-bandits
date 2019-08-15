const factoryFuncs = {
    createArticleHTML (articleObj) {
    return `
        <div class="article">
            <p>${articleObject.name}</p>
            <p>${contactObject.phoneNumber}</p>
            <p>${contactObject.address}</p>
            </div>
            `
    },
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
