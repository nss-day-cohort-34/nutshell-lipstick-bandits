const eventInDom = document.querySelector("#eventsContainer")
const articleInDom = document.querySelector("#articleContainer")

const render = {
    renderArticle(htmlRep) {
        articleInDom.innerHTML += htmlRep
    },
    renderEvent(htmlRep) {
        eventInDom.innerHTML += htmlRep
    }
}

export default render