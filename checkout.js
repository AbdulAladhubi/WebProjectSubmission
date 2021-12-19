

//arrays of emails and passwords
var Emails = ["demo1@email.com", "demo2@email.com", "demo2@email.com"];
var Passwords = ["AbdulIs1Amazing", "AbdulIs2Amazing", "AbdulIs3Amazing"];
var CreditCardNumbers = [123456789, 47432456, 08664331];
var ExpirationDates = ["11/23", "11/24", "11/25"];
var CVVcodes = ["123", "456", "789"];

// // Getting the elemnts of the form to check if they are beign filled for more security
// const emailPayPal=document.getElementById('emailPayPal');
// const cvv=document.getElementById('cc-cvv');
// const CreditCardExpiry=document.getElementById('cc-expiration');
// const PayPalPassword=document.getElementById('PayPalPassword');
// const creditCardNum=document.getElementById('cc-number');
// const state=document.getElementById('state');
// const country=document.getElementById('country');
// const address=document.getElementById('emailPayPal');
// const emailPayPal=document.getElementById('emailPayPal');



//Check which raduio button what option is selected (Credit card/PayPal) is selected
var eles = document.getElementsByName('paymentMethod');


//This will keep track of the total checkout and display it in the chekcout page
var checkoutTotal = document.getElementById('checkoutTotal');
checkoutTotal.innerHTML = `${localStorage.getItem("TotalCartInCheckOut")}`;

//This will keep track of the total amount paid by the user and display it in the history section of the user details page
var TotalAmountPaid = localStorage.getItem("TotalAmounPaid");
TotalAmountPaid = parseInt(TotalAmountPaid);//convert string to int 

//here we check is the variable is null or NaN to avoid not calculating the total amount paid 
if (TotalAmountPaid == null || isNaN(TotalAmountPaid)) {
  TotalAmountPaid = 0;
}


// This will keep track of the number of orders the user mad 
var count = localStorage.getItem("attempts");
count = parseInt(count); // because localstorage stores everything in strings

// First time the value does not exist so we give it a value of 0 if it is null or NaN...
if (count == null || isNaN(count)) {
  count = 0;
}



// Get Form and store them in local machine /these details are useful later to use them to disply the user details in the user details page
function StoreFormData() {
  event.preventDefault();//preventing default
  //storing the values of the checkout page form to then store them for the user to check his/her details
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var address2 = document.getElementById('address2').value;
  var country = document.getElementById('country').value;
  var state = document.getElementById('state').value;
  var zip = document.getElementById('zip').value;
  var TotalPrice = document.getElementById('cart-total-value').innerHTML;
  document.getElementById('cart-total-value').innerHTML = TheTotalPrice;
  //we increment every time the user perchase something and the update the number of orders made
  count++;
  localStorage.setItem("attempts", count);

  //Total amount paid and update how much has been spent so far
  TotalAmountPaid += parseInt(TotalPrice);

  //here we are setting the values of the form in the chekcout page and save them in localstorage
  localStorage.setItem("TotalAmounPaid", TotalAmountPaid);
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("address", address);
  localStorage.setItem("address2", address2);
  localStorage.setItem("country", country);
  localStorage.setItem("state", state);
  localStorage.setItem("zip", zip);
  localStorage.setItem("TotalPrice", TotalPrice);

  //Now i put them all in variables to be esier for me to use them later in the feature a
  var TheTotalPrice = localStorage.getItem("TotalPrice");

}


// This will display the radio button optio credit card
function displayRadioValue() {
  var ele = document.querySelector('.form-check-input');

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked == 0) {
      DisplayCreditCard();
    }

  }
}

function DisplayCreditCard() {
  document.getElementById('CreditCardPaymentMethod').classList.remove('d-none');
  document.getElementById('PayPalPaymentMethod').classList.add('d-none');
}

// Pay Pal section will be displayed when the user selects the option PayPal
function DisplayPayPalSection() {
  document.getElementById('CreditCardPaymentMethod').classList.add('d-none');
  document.getElementById('PayPalPaymentMethod').classList.remove('d-none');
}

//This will ceheck if the PayPal account details are correct
//<<<<<<<<<<< Cehcking pay pal payment >>>>>>>>>>>>>>
function CheckPayPalPayment() {

  //getting the en=mail and password the user entered 
  var emailPayPal = document.getElementById('emailPayPal');
  var payPalPassword = document.getElementById('PayPalPassword');

  //then checking if they match any details in the system
  for (let i = 0; i < Emails.length; i++) {
    if (emailPayPal.value == Emails[i] && payPalPassword.value == Passwords[i]) {
      localStorage.setItem("ValidCheckout", 1);
      document.getElementById('inValidPayment').classList.add('d-none');

      break;
    } else {
      document.getElementById('inValidPayment').classList.remove('d-none');
      document.getElementById('invalidPayMessage').innerHTML = `PayPal email or password is wrong!`;
      localStorage.setItem("ValidCheckout", 0);
      event.preventDefault();
    }

  }

}
//<<<<<<<<<<< End of Cehcking pay pal payment  >>>>>>>>>>>>>>

//<<<<<<<<<<< Cehcking Credit Card payment  >>>>>>>>>>>>>>
function CheckCreditCardPayment() {
  //getting the values i want to check if are valid
  var CreditNumber = document.getElementById('cc-number');
  var expiryDate = document.getElementById('cc-expiration');
  var cvvCodes = document.getElementById('cc-cvv');

  //loop through the values and see if they match the system
  for (let j = 0; j < CreditCardNumbers.length; j++) {
    if (CreditNumber.value == CreditCardNumbers[j] && expiryDate.value == ExpirationDates[j] & cvvCodes.value == CVVcodes[j]) {
      //we set the valid check to 0 so we know that the details entered are right
      localStorage.setItem("ValidCheckout", 0);
      document.getElementById('inValidPayment').classList.add('d-none');
      //break if there is a matching card :this will avoid changing the value of valid check 
      break;

    } else {
      document.getElementById('inValidPayment').classList.remove('d-none');
      document.getElementById('invalidPayMessage').innerHTML = `Credit card details are invalid!`;
      localStorage.setItem("ValidCheckout", 1);
      event.preventDefault();

    }

  }
}
//<<<<<<<<<<< End of Cehcking Credit Card payment  >>>>>>>>>>>>>>
//To check which radio button is selected

//This will check any click event in the radio buttons and based on the option selected the payment method will be displayed
document.getElementById('paypal').addEventListener('click', () => {
  document.getElementById('cardButton').classList.add('d-none');
  document.getElementById('payPalButton').classList.remove('d-none');
});

var chekcoutStatus = document.getElementById('chekcoutStatus');
// add a listener for add to cart if such a button id is pressed


//This function will validate if te paypal payment is valid or not and if not will display a message that there is something wrong
function ValidatePAyPal() {

  localStorage.setItem("PaymentMethodIndex", 1);
  CheckPayPalPayment();

  if (localStorage.getItem("ValidCheckout") == 1) {

    chekcoutStatus.addEventListener("submit", sweetAlert);
  }
 

}



//If paypal paymnet method is selected then th ebutton for credit card chekc out will be hidden
document.getElementById('credit').addEventListener('click', () => {
  document.getElementById('cardButton').classList.remove('d-none');
  document.getElementById('payPalButton').classList.add('d-none');
});

//Validate credit card
function ValidateCreditCard() {
  localStorage.setItem("PaymentMethodIndex", 0);
  CheckCreditCardPayment();

  if (localStorage.getItem("ValidCheckout") == 0) {

    chekcoutStatus.addEventListener("submit", sweetAlert);
  }

}







// Checking if the inputs are filled 


// The alert function will display the amazing message and then will display the confirmation message

function sweetAlert() {

  event.preventDefault();

  swal({
    title: "Finish Payment",
    text: "Click ok to Complete Your Order!",
    icon: "",
    buttons: true,
    dangerMode: false,
  })
    .then((willDelete) => {
      if (willDelete) {

        swal("Your payment have been succsesfully completed!", {
          icon: "success",


        });

        //if the user made a succesful payment then this code will run and will display your payment has been made succescfully
        window.location.href = "paymentCompleted.html";
        StoreFormData();
        //After  a payment or an oreder has been made this will reset the check out cart to 0
        localStorage.removeItem('products');

      } else {
        //If the user decided to cancel the payment they will be returned to the check out page
        swal("Payment canceled");
        window.location.href = "chekcout2.html";
      }
    });

}


