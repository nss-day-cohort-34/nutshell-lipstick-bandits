import API from "./data.js"
import login from "./login.js"

const usernameInput = document.createElement("input")
const usernameLabel = document.createElement("label")
const emailInput = document.createElement("input")
const emailInputConfirm = document.createElement("input")
const newUser = document.createElement("button")
const registerPage = document.querySelector(".outputRegister")


const signupForm = {

    createAndAppendRegistrationForm() {
        const registerContainer = document.createElement("div")
        registerContainer.setAttribute("class","formcontainer")

        const registerHeader = document.createElement("h2")
        registerContainer.appendChild(registerHeader)
        registerHeader.textContent = "Register User"
        usernameLabel.setAttribute("for", "username-input")
        usernameLabel.setAttribute("id", "michLabel")
        usernameLabel.textContent = "Create your Username"

        const emailLabel = document.createElement("label")
        emailLabel.setAttribute("for", "email-input")
        emailLabel.setAttribute("id", "michLabel")
        emailLabel.textContent = "Enter your Email"

        const emailLabelConfirm = document.createElement("label")
        emailLabelConfirm.setAttribute("for", "emailInputConfirm")
        emailLabelConfirm.setAttribute("id", "michLabel")
        emailLabelConfirm.textContent = "Confirm your Email"


        usernameInput.type = "text"
        usernameInput.setAttribute("class", "form-control")
        usernameInput.setAttribute("id", "username-input")
        emailInput.type = "text"
        emailInput.setAttribute("class", "form-control")
        emailInput.setAttribute("id", "email-input")
        emailInputConfirm.type = "text"
        emailInputConfirm.setAttribute("class", "form-control")
        emailInputConfirm.setAttribute("id", "emailInputConfrim")
        newUser.setAttribute("class", "btn btn-primary")
        newUser.textContent = "Create Account"



        registerContainer.appendChild(usernameLabel)
        registerContainer.appendChild(usernameInput)
        registerContainer.appendChild(emailLabel)
        registerContainer.appendChild(emailInput)
        registerContainer.appendChild(emailLabelConfirm)
        registerContainer.appendChild(emailInputConfirm)
        registerContainer.appendChild(newUser)
        registerPage.appendChild(registerContainer)
        usernameInput.addEventListener("keyup",this.enableDisable)
// newUser.disabled=true;
        newUser.addEventListener("click", this.registerUser);
    },


    registerUser() {
        console.log("hi")
        const usernameValue = usernameInput.value;

        const emailValue = emailInput.value;

        API.getuserData()
            .then(users => {

                if (users.find(user => user.username === usernameValue)) {
                    alert("Username is taken already. Try something else.")
                } else if (!/\S+@\S+\.\S+/.test(emailValue)){
                    alert("Please enter a valid email.")
                }
                else {
                    const newUserToSave = {
                        username: usernameValue,

                        email: emailValue
                    }
                    API.postNewData("users", newUserToSave)

                    login.replaceWithLoginForm();
                }
              

            })
        }}




export default signupForm