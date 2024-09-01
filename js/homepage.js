var login_p=document.querySelector(".login_p")
var sign_p=document.querySelector(".sign_p")
var wel_p=document.querySelector(".wel_name")
var cart=document.querySelector(".p4")
var logout=document.querySelector(".logout")
var car_num=document.querySelector(".car_num")
var cart_p=document.querySelector(".p5")
var arr_d=document.querySelector("#arrow_down")
var arr_u=document.querySelector("#arrow_up")
var products_menu=document.querySelector(".products_menu")
var bought_item=document.querySelector(".bought_item")
var allproducts=document.querySelector(".container1")
var searchbar = document.querySelector(".search_bar");
var drop_down = document.querySelector(".drop_down");
var counter=0

login_p.style.display = "none";
sign_p.style.display = "none";
logout.style.display = "block";
cart.style.display = "block";
car_num.style.display = "block";
cart_p.style.display = "block";
arr_d.style.display = "block";
var firstname = localStorage.getItem("firstname");

//header
if (firstname) {
    wel_p.textContent = "WELCOME " + firstname.toUpperCase();
}

arr_d.addEventListener("click",function(){
  products_menu.style.display="block"
  arr_d.style.display = "none";
  arr_u.style.display = "block";
})
arr_u.addEventListener("click", function() {
  products_menu.style.display = "none";
  arr_d.style.display = "block";
  arr_u.style.display = "none"; 

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//products

let products=[
{
  id:1,
  title:"T-shirt",
  price:40,
  category:"fashion",
  img:"images/CREWNECKSBlack_737x980-removebg-preview.png"
},
{
  id:2,
  title:"airpods",
  price:100,
  category:"electronics",
  img:"images/Screen_Shot_2017_01_30_at_2.38.03_PM-removebg-preview.png"
},
{
  id:3,
  title:"hoodie",
  price:80,
  category:"fashion",
  img:"images/s-l500-removebg-preview.png"
},
{
  id:4,
  title:"water bottle",
  price:20,
  category:"sport",
  img:"images/bottle-removebg-preview.png"
},
{
  id:5,
  title:"glasses",
  price:30,
  category:"accessories",
  img:"images/glasses-removebg-preview.png"
},
{
  id:6,
  title:"cap",
  price:15,
  category:"accessories",
  img:"images/Plain-Black-Cap-removebg-preview.png"
},
{
  id:7,
  title:"shoes",
  price:90,
  category:"sport",
  img:"images/shoes-removebg-preview.png"
},
{
  id:8,
  title:"laptop",
  price:1000,
  category:"electronics",
  img:"images/laptop.png"
},
{
  id:9,
  title:"bag",
  price:200,
  category:"fashion",
  img:"images/bag-removebg-preview.png"
}
]

function drawItems2(filteredProducts) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let y = filteredProducts.map((item) => {
      let inCart = cartItems.some(cartItem => cartItem.id === item.id);
      let isFavorite = favorites.some(favItem => favItem.id === item.id);
      return `<div class="item">
              <div class="img_div">
                  <img src=${item.img} alt="image" class="img${item.id}">
              </div>
              <h3 class="product">Product : ${item.title} </h3>
              <h3 class="price">Price : ${item.price}$ </h3>
              <h3 class="Category">Category : ${item.category} </h3>
              <button class="btn" data-id="${item.id}" style="width: ${inCart ? '130px' : ''}; background-color: ${inCart ? '#D0B8A8' : ''};">
                ${inCart ? 'Remove from cart' : 'Add to Cart'}
              </button>
              <i class="fa-solid fa-heart" data-id="${item.id}" style="color: ${isFavorite ? '#760c0c' : ''};"></i>
          </div>`;
  });
  allproducts.innerHTML = y.join(" ");
  addEventListenersToButtons();
}

  
  function filterProducts() {
    let searchValue = searchbar.value.toLowerCase();
    let filteredProducts = products.filter(item => {
      return item.title.toLowerCase().includes(searchValue);
    });
    drawItems2(filteredProducts);
  }
  
  function filterProducts2() {
    let searchValue = searchbar.value.toLowerCase();
    let filteredProducts = products.filter(item => {
      return item.category.toLowerCase().includes(searchValue);
    });
    drawItems2(filteredProducts);
  }
  
  
  function updateEventListener() {
    searchbar.removeEventListener("input", filterProducts);
    searchbar.removeEventListener("input", filterProducts2);
  
    if (drop_down.value === "Search by Name") {
      searchbar.addEventListener("input", filterProducts);
    } else {
      searchbar.addEventListener("input", filterProducts2);
    }
  }
 
  drawItems2(products);
  

  updateEventListener();
  
  drop_down.addEventListener("change", updateEventListener);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // add to cart

  function addtocart(id) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let itemInCart = cartItems.find(item => item.id === id);

    if (itemInCart) {
        // Remove the item if it is already in the cart
        cartItems = cartItems.filter(item => item.id !== id);
    } else {
        // Add the item to the cart if it is not already there
        let choosen_item = products.find((item) => item.id === id);
        cartItems.push({
            id: choosen_item.id,
            title: choosen_item.title,
            price: choosen_item.price,
            quantity: 1,
            img: choosen_item.img,
            category: choosen_item.category
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartUI();
}

function updateCartUI() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  bought_item.innerHTML = cartItems.map(item => `
      <div class="item-in-cart" data-id="${item.id}">
          <h3>${item.title}</h3>
          <p class="item_counter">${item.quantity}</p>
          <i class="fa-solid fa-plus" data-id="${item.id}"></i>
          <i class="fa-solid fa-minus" data-id="${item.id}"></i>
      </div>
  `).join('');

  car_num.textContent = cartItems.length;
  addEventListenersToButtons();
}




function addEventListenersToButtons() {
  var btns = document.getElementsByClassName("btn");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
  for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function() {
          let id = parseInt(this.getAttribute("data-id"));
          let itemInCart = cartItems.find(item => item.id === id);

          if (itemInCart) {
              // If the item is already in the cart, remove it
              cartItems = cartItems.filter(item => item.id !== id);
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              this.style.width = "";
              this.innerHTML = "Add to Cart";
              this.style.backgroundColor = "";
              counter--; 
          } else {
              // If the item is not in the cart, add it
              addtocart(id);
              this.style.width = "130px";
              this.innerHTML = "Remove from cart"; 
              this.style.backgroundColor = "#D0B8A8";
              counter++;
          }
          car_num.innerHTML = counter;
          updateCartUI();
      };
  }

  var icons = document.getElementsByClassName("fa-heart");
  for (var i = 0; i < icons.length; i++) {
      icons[i].onclick = function() {
          let id = parseInt(this.getAttribute("data-id"));
          let item = products.find(item => item.id === id);
          let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          let itemInFavorites = favorites.find(favItem => favItem.id === id);

          if (itemInFavorites) {
              // Remove from favorites
              favorites = favorites.filter(favItem => favItem.id !== id);
              this.style.color = ""; 
          } else {
              // Add to favorites
              favorites.push({
                  id: item.id,
                  title: item.title,
                  img: item.img,
                  category: item.category
              });
              this.style.color = "#760c0c"; 
          }

          localStorage.setItem("favorites", JSON.stringify(favorites));
      };
  }

  var plusBtns = document.getElementsByClassName("fa-plus");
  var minusBtns = document.getElementsByClassName("fa-minus");
  for (var i = 0; i < plusBtns.length; i++) {
      plusBtns[i].onclick = function() {
          let id = parseInt(this.getAttribute("data-id"));
          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          let itemInCart = cartItems.find(item => item.id === id);
          if (itemInCart) {
              itemInCart.quantity += 1;
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              updateCartUI();
          }
      };
  }
  for (var i = 0; i < minusBtns.length; i++) {
      minusBtns[i].onclick = function() {
          let id = parseInt(this.getAttribute("data-id"));
          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          let itemInCart = cartItems.find(item => item.id === id);
          if (itemInCart && itemInCart.quantity > 1) {
              itemInCart.quantity -= 1;
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              updateCartUI();
          }
      };
  }
}


logout.addEventListener("click",function(){
  localStorage.clear()
})

document.addEventListener("DOMContentLoaded", updateCartUI);












