var login_p = document.querySelector(".login_p");
var sign_p = document.querySelector(".sign_p");
var wel_p = document.querySelector(".wel_name");
var cart = document.querySelector(".p4");
var logout = document.querySelector(".logout");
var car_num = document.querySelector(".car_num");
var cart_p = document.querySelector(".p5");
var arr_d = document.querySelector("#arrow_down");
var arr_u = document.querySelector("#arrow_up");
var products_menu = document.querySelector(".products_menu");
var bought_item = document.querySelector(".bought_item");
var allproducts = document.querySelector(".container1");
var searchbar = document.querySelector(".search_bar");
var drop_down = document.querySelector(".drop_down");
var counter = 0;

let products = [
  {
    id: 1,
    title: "T-shirt",
    price: 40,
    category: "fashion",
    img: "images/CREWNECKSBlack_737x980-removebg-preview.png"
  },
  {
    id: 2,
    title: "airpods",
    price: 100,
    category: "electronics",
    img: "images/Screen_Shot_2017_01_30_at_2.38.03_PM-removebg-preview.png"
  },
  {
    id: 3,
    title: "hoodie",
    price: 80,
    category: "fashion",
    img: "images/s-l500-removebg-preview.png"
  },
  {
    id: 4,
    title: "water bottle",
    price: 20,
    category: "sport",
    img: "images/bottle-removebg-preview.png"
  },
  {
    id: 5,
    title: "glasses",
    price: 30,
    category: "accessories",
    img: "images/glasses-removebg-preview.png"
  },
  {
    id: 6,
    title: "cap",
    price: 15,
    category: "accessories",
    img: "images/Plain-Black-Cap-removebg-preview.png"
  },
  {
    id: 7,
    title: "shoes",
    price: 90,
    category: "sport",
    img: "images/shoes-removebg-preview.png"
  },
  {
    id: 8,
    title: "laptop",
    price: 1000,
    category: "electronics",
    img: "images/laptop.png"
  },
  {
    id: 9,
    title: "bag",
    price: 200,
    category: "fashion",
    img: "images/bag-removebg-preview.png"
  }
];

function drawItems(filteredProducts) {
  let y = filteredProducts.map((item) => {
    return `<div class="item">
            <div class="img_div">
                <img src=${item.img} alt="image" class="img${item.id}">
            </div>
            <h3 class="product">Product : ${item.title} </h3>
            <h3 class="price">Price : ${item.price}$ </h3>
            <h3 class="Category">Category : ${item.category} </h3>
            <button class="btn" onClick="addtocart(${item.id})">Add to Cart</button>
            <i class="fa-solid fa-heart"></i>
        </div>`;
  });
  allproducts.innerHTML = y.join(" ");
}

function filterProducts() {
  let searchValue = searchbar.value.toLowerCase();
  let filteredProducts = products.filter(item => {
    return item.title.toLowerCase().includes(searchValue);
  });
  drawItems(filteredProducts);
}

function filterProducts2() {
  let searchValue = searchbar.value.toLowerCase();
  let filteredProducts = products.filter(item => {
    return item.category.toLowerCase().includes(searchValue);
  });
  drawItems(filteredProducts);
}

// Function to update event listener based on dropdown value
function updateEventListener() {
  searchbar.removeEventListener("input", filterProducts);
  searchbar.removeEventListener("input", filterProducts2);

  if (drop_down.value === "Search by Name") {
    searchbar.addEventListener("input", filterProducts);
  } else {
    searchbar.addEventListener("input", filterProducts2);
  }
}

// Initial draw
drawItems(products);

// Set initial event listener
updateEventListener();

// Add event listener to dropdown for changes
drop_down.addEventListener("change", updateEventListener);





// Handle heart icon and button click events
var icons = document.getElementsByClassName("fa-heart");
for (var i = 0; i < icons.length; i++) {
  icons[i].onclick = function() {
    window.location = "login.html";
  };
}

var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    window.location = "login.html";
  };
}