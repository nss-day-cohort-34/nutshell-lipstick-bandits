import login from "./login.js"
import signupForm from "./register.js"
import factoryFunc from "./factory.js"

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
if (sessionStorage.userId === undefined) {
    login.createAndAppendLoginInput();
    signupForm.createAndAppendRegistrationForm();
    console.log(sessionStorage.userId)
}
if (sessionStorage.userId >= 1) {

}

