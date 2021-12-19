//getting the user details information (the elements of the html page)
const firstName = document.getElementById('firstName');
const email = document.getElementsByClassName('email');
const address = document.getElementById('address');
const address2 = document.getElementById('address2');
const state = document.getElementById('state');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const totalPrice = document.getElementById('totalPrice');
const orderDetails = document.getElementById('orderDetails');



let paras=orderDetails.getElementsByTagName('p');
let spans=orderDetails.getElementsByTagName('span');

for (let i = 0; i < paras.length; i++) {
    paras[i].style.fontSize="20px";
    paras[i].style.fontWeight="bold";
    spans[i].style.fontWeight="none";
    spans[i].style.fontSize="15px";
    
}

firstName.innerHTML = `${localStorage.getItem("firstName")}`;

// This will insert the details of the user into the user details page
email[0].innerHTML = `${localStorage.getItem("email")}`;
email[1].innerHTML = `${localStorage.getItem("email")}`;
address.innerHTML = `${localStorage.getItem("address")}`;

address2.innerHTML = `${localStorage.getItem("address2")}`;

country.innerHTML = `${localStorage.getItem("country")}`;

state.innerHTML = `${localStorage.getItem("state")}`;
totalPrice.innerHTML = `${localStorage.getItem("TotalPrice")}`;


