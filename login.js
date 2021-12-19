
const email = document.getElementById('email');
const password = document.getElementById('password');
var emailloginValid = document.getElementById('emailloginValid');

var Emails = ["demo1@email.com", "demo2@email.com", "demo2@email.com"];
var Passwords = ["AbdulIs1Amazing", "AbdulIs2Amazing", "AbdulIs3Amazing"];

email.addEventListener('input', () => {
   
    const pattren2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailPattren = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
    if (email.value.match(pattren2)) {
        emailloginValid.innerHTML = `Valid email :)`;

        emailloginValid.style.color = "#00f7ce";
        email.style.border = "1px solid #00f7ce";
    } else {
        emailloginValid.innerHTML = `Invalid email *_*`;
        emailloginValid.style.color = "red";
    }
});
// >>>>>>>>>>>>>>>>
var loginStatus = document.getElementById('user-login');
// add a listener for add to cart if such a button id is pressed
loginStatus.addEventListener("submit", loginUser);

function loginUser() {

    // wait for submit button to be clicked on login form - 
    // this code only invoked if login form submit button clicked


    for (let i = 0; i < Emails.length; i++) {
        
        if ((email.value == Emails[i]) && (password.value == Passwords[i]))  {   
            // successful login, user redirected to shop.html
            localStorage.setItem('loggedIn',1);    
            window.location.href = "home.html";  
            var element = document.getElementById("loginerror");
            element.classList.add("d-none");// redirect to shop page
            //i added a break to exit the loop after the it found a matching email and password and avoid looping in the background and not 
            //showing the logout and details pages
            break;
        }
        else {
            // login unsuccessful, error message appears
            localStorage.setItem('loggedIn',0);
            var element = document.getElementById("loginerror");
            element.classList.remove("d-none");
        }
    }

 
        event.preventDefault();
    
  }



