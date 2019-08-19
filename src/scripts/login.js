
import API from "./data.js"
import factoryFuncs from "./factory.js";


const usernameInput = document.createElement("input")
const emailInput = document.createElement("input")
const registrationPage = document.querySelector(".outputRegister")
const loginPage = document.querySelector(".outputLogin")
registrationPage.style.display = "none";


const login = {

    
    createAndAppendLoginInput() {
        const outEl = document.querySelector(".outputLogin")
        usernameInput.type = "text"
        emailInput.type = "text"
        outEl.appendChild(usernameInput)
        outEl.appendChild(emailInput)
        const loginButton = document.createElement("button")
        loginButton.textContent="Log in!"
        const registerButton = document.createElement("button")
        registerButton.textContent="Register"
        outEl.appendChild(loginButton)
        outEl.appendChild(registerButton)



        
        loginButton.addEventListener("click", this.getUserData);
        
        registerButton.addEventListener("click", this.replaceWithRegistrationForm);



    },
    getUserData() {
        const username = usernameInput.value;
        const email= emailInput.value;
        API.getData("users")
            .then(allUsers => {
                let checkingUsers = 1;
                allUsers.forEach(user => {
                    if (username === user.username &&  email === user.email) {
                        console.log(`${user.username} with user ID ${user.id} is the current user`)
                        sessionStorage.setItem('userId', user.id)
                        let userId = sessionStorage.getItem('userId');
                        sessionStorage.setItem('userName', user.username)

                        loadUserSpecificPage(userId);

                    } else if (checkingUsers === allUsers.length) {
                        alert("Username/email invalid. If new user, please register. :)")
                    } else {
                        checkingUsers++
                    };
                  
                    function loadUserSpecificPage(userId) {
                        loginPage.style.display = "none";
                         console.log(`This is the user page! ${userId}`);
                        const dashboard = document.querySelector("#dashboard")
                        dashboard.innerHTML= factoryFuncs.createDOM()
                        

                       location.reload
                       



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
    }
}



export default login