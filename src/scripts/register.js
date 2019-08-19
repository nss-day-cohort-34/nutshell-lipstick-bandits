import API from "./data.js"
import login from "./login.js"

const usernameInput = document.createElement("input")
const emailInput = document.createElement("input")
const newUser = document.createElement("button")


const signupForm = {

    createAndAppendRegistrationForm() {
        const registerContainer = document.querySelector(".outputRegister")
        const registerHeader = document.createElement("h2")
        registerContainer.appendChild(registerHeader)
        registerHeader.textContent = "Register User"
        usernameInput.type = "text"
        emailInput.type = "text"
        newUser.textContent = "Create Account"
        registerContainer.appendChild(usernameInput)
        registerContainer.appendChild(emailInput)
        registerContainer.appendChild(newUser)
        newUser.addEventListener("click", this.registerUser)
    },

    registerUser() {
        const usernameValue = usernameInput.value;

        const emailValue = emailInput.value;

        let newUserToSave = {
            username: usernameValue,

            email: emailValue
        }

        API.postNewData("users", newUserToSave)

        login.replaceWithLoginForm();
    }


}
export default signupForm