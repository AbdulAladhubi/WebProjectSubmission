//Grap the elements we need
var productImage = document.getElementById('productImage');
var prodcutName = document.getElementById('prodcutName');
var productPrice = document.getElementById('productPrice');
var productDescription = document.getElementById('productDescription');
var careInstruc = document.getElementById('careInstruc');
//const productList = document.querySelector('.product-list');


//Updating the info of the description for the product dynamically depending on the product clicked 
productImage.setAttribute('src',localStorage.getItem("productImage"));
prodcutName.innerHTML=`${localStorage.getItem("productName")}`;
productPrice.innerHTML=`${localStorage.getItem("productPrice")}`;
productDescription.innerHTML=`${localStorage.getItem("description")}`;


// This is added in each description button it will cehck what product is selected and based on it it will display the description of the product
function processProduct(productno){

    fetch('items.json')
    .then(response => response.json())
    .then(data => {
//save the product selected details to local storage
localStorage.setItem("description",data[productno-1].description) ;   
localStorage.setItem("productName",data[productno-1].name) ;    
localStorage.setItem("productPrice",data[productno-1].price) ;    
localStorage.setItem("productImage",data[productno-1].imgSrc) ;    

    //direct to the description page where the user can see the product details
    window.location.href ="/description02.html"; 
    })

}//end of Process Product function


























// function getSelectedProduct(e) {
//     alert("event listener working");
//     if (e.target.classList.contains('desc-btn')) {
//         let product = e.target.parentElement.parentElement;
//         alert("alerting");
//     alert(product.no);
//         // getProductInfo(product);
//         // getProductInfo2(product);
//     }
// }
// var elements = document.getElementsByClassName("desc-btn");
// for (var i = 0; i < elements.length; i++) {
//     // elements[i].addEventListener('click', myFunction, false);
//     elements[i].style.color="yellow";
// }

// document.getElementById("myBtn").style.color="green";
// document.getElementById("myBtn").addEventListener("click", myFunction);



// var myFunction = function() {
//    alert("working");
// };

