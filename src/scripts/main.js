import login from "./login.js"
import signupForm from "./register.js"
import factoryFuncs from "./factory.js"
const dashboard = document.querySelector("#dashboard")
if (sessionStorage.userId === undefined) {
  login.createAndAppendLoginInput();
  signupForm.createAndAppendRegistrationForm();
  console.log(sessionStorage.userId)
}
if (sessionStorage.userId >= 1) {
  dashboard.innerHTML = factoryFuncs.createDOM()

}


dashboard.addEventListener("click", () => {
  if (event.target.id === "pleasework") {
    sessionStorage.clear();
    location.reload();

  }
})
