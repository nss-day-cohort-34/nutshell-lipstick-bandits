const factoryFuncs = {
    createArticleHTML(articleObj) {
        return `
        <section>
            <h1>${articleObj.articleTitle}</h1>
            <p>${articleObj.articleSummary}</p>
            <p>${articleObj.articleURL}</p>
            <button class="editArticle--${articleObj.id}">Edit</button>
            <button class="deleteArticle--${articleObj.id}">Delete</button>
            </section>`
    },
    createEventHTML(eventObj) {
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
