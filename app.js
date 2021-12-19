
// variables and constants
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
var cartList = document.querySelector('.cart-list');
const cartList2 = document.getElementById('checkoutCartList');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
const checkoutList = document.getElementById('checkoutList');
const checkoutCartNum = document.querySelector('checkoutCartNum');

//This will give each item a uniqu id 
let cartItemID = 1;

eventListeners();

// all event listeners
function eventListeners() {

    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });
    // toggle navbar when toggle button is clicked
    document.querySelector('.navbar-toggler').addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    });

    // show/hide cart container
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // add to cart
    productList.addEventListener('click', purchaseProduct);


    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}

// update cart info
function updateCartInfo() {
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;

localStorage.setItem("TotalCartInCheckOut",cartInfo.total);
document.getElementById('checkoutTotal').innerHTML=`${localStorage.getItem("TotalCartInCheckOut")}`;
    localStorage.setItem('countNum', cartInfo.productCount);
}

// load product items content form JSON file
async function loadJSON() {
    if (document.querySelector('.cart-list') != null) {
        fetch('items.json')
            .then(response => response.json())
            .then(data => {
                //let html = '';
                data.forEach(product => {
                    productList.innerHTML += `
                 
<div class="col">
<div class="product-item">
<div class="card">
    <div class="product-img ">
        <img src = "${product.imgSrc}" alt = "product image">
    </div>
    <div class = "product-content">
    <h3 class = "product-name">${product.name}</h3>
    <span class = "product-category">${product.category}</span>
    <p class = "product-price">$${product.price}</p>
    <button type = "button" class = "add-to-cart-btn">
    <i class = "fas fa-shopping-cart"></i>Add To Cart
</button>
<button type = "button"  onclick="processProduct(${product.no})" value="" id="myBtn" class="desc-btn  btn  btn-outline-danger mb-2">Description</button>
<input class="d-none"  value="${product.no}">

</div>
</div>
    
</div>
</div>

            `;
                });
                
            })
        // .catch(error => {
        //     alert(error);
        //     //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
        // })
    }

}




// purchase product and will send them to the get info product 1 and 2 to disply them in the cart and the checkout page
function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let product = e.target.parentElement.parentElement;
    
        getProductInfo(product);
        getProductInfo2(product);
    }
}

// get product info after add to cart button click and will display the products selected in the cart list
function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

//this will display the products purchased in the checkout page
function getProductInfo2(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList2(productInfo);
    saveProductInStorage(productInfo);
}



// add the selected product to the cart list 
function addToCartList(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
 
    <img src = "${product.imgSrc}" alt = "product image">
    <div class = "cart-item-info">
        <h3 class = "cart-item-name">${product.name}</h3>
        <span class = "cart-item-category">${product.category}</span>
        <span class = "cart-item-price">${product.price}</span>
    </div>
    
    <button type = "button" class = "cart-item-del-btn">
        <i class = "fas fa-times"></i>
    </button>
        `;


    cartList.appendChild(cartItem);
}
// add the selected produts to the checkout page
function addToCartList2(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
    <div class="card " style="width:200%">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${product.imgSrc}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.category}</p>
          <p class="card-text"><small class="text-muted">${product.price}</small></p>
        </div>
      </div>
    </div>
  </div>

        `;

        cartList2.append(cartItem);
}



// save the product in the local storage
function saveProductInStorage(item) {
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// get all the products info if there is any in the local storage
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
}

// load carts product
function loadCart() {
    let products = getProductFromStorage();
    if (products.length < 1) {
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));
    products.forEach(product => addToCartList2(product));


    // calculate and update UI of cart info 
    updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo() {
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removing dollar sign
        return acc += price;
    }, 0); // adding all the prices

    return {
        total: total.toFixed(2),
        productCount: products.length
    }
   
}

// delete product from cart list and local storage
function deleteProduct(e) {
    let cartItem;
    if (e.target.tagName === "BUTTON") {
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if (e.target.tagName === "I") {
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}


// >>>>>>>>>>>>>>>>>>>>
// check if user is logged in or logged out..
checkLoginStatus();

function checkLoginStatus() {

    var loggedin = localStorage.getItem('loggedIn');
    var element = document.getElementById("userdetails");
    if (loggedin == 1) {
        // change the text from Login to Logout
        document.querySelector('#loginlogout').innerHTML = "Logout";
        element.classList.remove("d-none");
        element.classList.add("d-show");
    } else {
        // use add to hide the display of User Details
        element.classList.add("d-none");
        element.classList.remove("d-show");
        document.querySelector('#loginlogout').innerHTML = "Login";
        element = document.getElementById("loginlogout");
        element.setAttribute("href", "login.html");
    }

}




//   >>>>>>>>>>>>>>>>>>>
// run to update login/
var logout = document.getElementById('loginlogout');
// add a listener for add to cart if such a button id is pressed
logout.addEventListener("click", Logout);

function Logout() {
    // if user is logged in them log them out and redirect to home page
    var loggedin = localStorage.getItem('loggedIn');
    if (loggedin == 1) {
        localStorage.setItem('loggedIn', 0);
        window.location.href = "home.html";
    } else {
        window.location.href = "login.html";
    }
}
