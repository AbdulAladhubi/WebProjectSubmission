const allAccountOptions = document.getElementsByClassName('accountCards');
const accountPersonalDetails = document.getElementById('accountPersonalDetails');
const accountBillingAddress = document.getElementById('accountBillingAddress');
const accountHistory = document.getElementById('accountHistory');
//Getting the elements in the Personal Details Section
const accName = document.getElementById('accName');
const accUsername = document.getElementById('accUsername');
const accEmail = document.getElementById('accEmail');
const accPnumber = document.getElementById('accPnumber');
//Getting the elements in the Billing Address Section
const accAddress1 = document.getElementById('accAddress1');
const accAddress2 = document.getElementById('accAddress2');
const accZip = document.getElementById('accZip');
const accState = document.getElementById('accState');
const accCountry = document.getElementById('accCountry');
//Getting the elements in the History Section
const accNumOfOrderd = document.getElementById('accNumOfOrderd');
const accTotAmount = document.getElementById('accTotAmount');



//This will show the Personal Details section
function ShowPersonalDetails() {
    accountPersonalDetails.classList.remove('d-none');
    accountBillingAddress.classList.add('d-none');
    accountHistory.classList.add('d-none');
}

//This will show the Billing Details section
function ShowBillingDetails() {
    accountPersonalDetails.classList.add('d-none');
    accountBillingAddress.classList.remove('d-none');
    accountHistory.classList.add('d-none');
}

//This will show the History section
function ShowHistory() {
    accountPersonalDetails.classList.add('d-none');
    accountBillingAddress.classList.add('d-none');
    accountHistory.classList.remove('d-none');
}


//Get the Details from local storage for the Personal Details
//.innerHTML=`${localStorage.getItem("")}`;
accName.innerHTML=`${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`;
accUsername.innerHTML=`${localStorage.getItem("username")}`;
accEmail.innerHTML=`${localStorage.getItem("email")}`;

//Get the Details from local storage for the Billing Address
accAddress1.innerHTML=`${localStorage.getItem("address")}`;
accAddress2.innerHTML=`${localStorage.getItem("address2")}`;
accZip.innerHTML=`${localStorage.getItem("zip")}`;
accState.innerHTML=`${localStorage.getItem("state")}`;
accCountry.innerHTML=`${localStorage.getItem("country")}`;


//
accTotAmount.innerHTML=`${localStorage.getItem("TotalAmounPaid")}`;
accNumOfOrderd.innerHTML=`${localStorage.getItem("attempts")}`;