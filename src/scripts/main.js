import API from "./data.js"
import factoryFuncs from "./factory.js"
import render from "./dom.js"

API.fetchEvents().then(events => {
    events.forEach(event => {
        const htmlRep = factoryFuncs.createEventHTML(event)
        render.renderEvent(htmlRep)
        console.log(event)
    });
})
API.getArticles().then(articles => {
    articles.forEach(article => {
        const htmlRep = factoryFuncs.createArticleHTML(article)
        render.renderArticle(htmlRep)
        console.log(article)
    });
})