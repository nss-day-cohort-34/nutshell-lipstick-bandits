import API from "./data.js"
import factoryFuncs from "./factory.js";
import render from "./dom.js"
const messagesList = {
  postMessage() {

    API.fetchMessages()
      .then(allMessages => {
        let messageDocFragment = document.createDocumentFragment()
        allMessages.forEach(message => {
          let messageHtml = factoryFuncs.createMessageHTML(message)
          messageDocFragment.innerHTML += messageHtml
        })


      })
      .then(() => {


        API.fetchMessages().then(message => {
          render.renderMessage(message)

        })
      })
  }
}
export default messagesList