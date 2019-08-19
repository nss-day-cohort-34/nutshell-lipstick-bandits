
import API from "./data.js"
import factoryFuncs from "./factory.js";
import render from "./dom.js"


const usernameInput = document.createElement("input")
const usernameLabel = document.createElement("label")
const emailInput = document.createElement("input")
const emailLabel = document.createElement("label")
const registrationPage = document.querySelector(".outputRegister")
const loginPage = document.querySelector(".outputLogin")
registrationPage.style.display = "none";



const login = {
    createAndAppendLoginInput() {
        const outEl = document.createElement("div")
        outEl.setAttribute("class", "formcontainer")

        const header = document.createElement("h1")
        header.setAttribute("class", "loginHeader")
        header.textContent = "Log in"
        usernameLabel.setAttribute("for", "username-input")
        usernameLabel.setAttribute("id","michLabel")
        usernameLabel.textContent = "Enter Your Username"
        usernameInput.type = "text"
        usernameInput.setAttribute("class", "form-control")
        usernameInput.setAttribute("id", "username-input")
        emailLabel.setAttribute("for", "email-input")
        emailLabel.setAttribute("id","michLabel")
        emailLabel.textContent = "Enter Your Email"
        emailInput.type = "text"
        emailInput.setAttribute("class", "form-control")
        emailInput.setAttribute("id", "email-input")
        outEl.appendChild(header)
        outEl.appendChild(usernameLabel)
        outEl.appendChild(usernameInput)
        outEl.appendChild(emailLabel)
        outEl.appendChild(emailInput)

        const loginButton = document.createElement("button")
        loginButton.setAttribute("class", "btn btn-primary")
        loginButton.textContent = "Log in!"
        const register = document.createElement("p")
        register.textContent = "Don't have an account yet?"
        const registerButton = document.createElement("p")
        registerButton.setAttribute("id", "a")
        registerButton.textContent = "Sign up for free!"
        outEl.appendChild(loginButton)
        outEl.appendChild(register)
        outEl.appendChild(registerButton)
        loginPage.appendChild(outEl)



        loginButton.addEventListener("click", this.getUserData);

        registerButton.addEventListener("click", this.replaceWithRegistrationForm);
    },
    getUserData() {
        const username = usernameInput.value;
        const email = emailInput.value;
        API.getData("users")
            .then(allUsers => {
                let checkingUsers = 1;
                allUsers.forEach(user => {
                    if (username === user.username && email === user.email) {
                        console.log(`${user.username} with user ID ${user.id} is the current user`)
                        sessionStorage.setItem("userId", user.id)
                        let userId = sessionStorage.getItem("userId");
                        sessionStorage.setItem("userName", user.username)

                        loadUserSpecificPage(userId);

                    } else if (checkingUsers === allUsers.length) {
                        alert("Username/email invalid. If new user, please register. :)")
                    } else {
                        checkingUsers++
                    };


                    function loadUserSpecificPage(userId) {
                        loginPage.style.display = "none";
                        console.log(`This is the user page! ${userId}`);
                        location.reload();
                    }
                })
            })
    },

    replaceWithRegistrationForm() {
        console.log("testing");
        const registrationPage = document.querySelector(".outputRegister")
        const loginPage = document.querySelector(".outputLogin");
        loginPage.style.display = "none";
        registrationPage.style.display = "block";
    },

    replaceWithLoginForm() {
        console.log("LoginForm");
        loginPage.style.display = "block";
        registrationPage.style.display = "none";
    },
}



export default login