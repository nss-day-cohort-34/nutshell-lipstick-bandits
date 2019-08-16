import login from "./login.js"
import signupForm from "./register.js"
import factoryFunc from "./factory.js"

 if (sessionStorage.userId === undefined) {
    login.createAndAppendLoginInput();
    signupForm.createAndAppendRegistrationForm();
    console.log(sessionStorage.userId)
  } 
  if (sessionStorage.userId >= 1) {
     
}
 
