var logout = document.querySelector(".log_prod");
logout.addEventListener("click", function () {
    localStorage.clear();
});

// Update cart items and total price
document.addEventListener("DOMContentLoaded", function () {
    // Update Cart Items
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
    let roundedTotalPrice = Math.round(totalPrice);

    document.querySelector(".total-price-display").textContent = `Total Price : ${roundedTotalPrice}$`;

    
    let cartContainer = document.querySelector(".chosen_product_container");
    cartContainer.innerHTML = cartItems.map(item => `
      <div class="chosen_product" data-id="${item.id}">
          <div class="img_div_prod">
          <img src=${item.img} alt="image" class="img_prod">
          </div>
          <div class="prod_content">
          <h3>Product : ${item.title}</h3>
          <h3 class="cat">Category : ${item.category}</h3>
          <h3>Price : ${item.price} $</h3>
          </div>
          <div class="quantity_div">
          <i class="fa-solid fa-plus" data-id="${item.id}"></i>
          <i class="fa-solid fa-minus" data-id="${item.id}"></i>
          <h3 class="item_counter">${item.quantity}</h3>
          <button class="remove" data-id="${item.id}">Remove</button>
          </div>
      </div>
    `).join('');

    addEventListenersToButtons(cartItems);

    // Update Favorites
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favoritesContainer = document.querySelector(".favorites-container");

    favoritesContainer.innerHTML = favorites.map(item => `
        <div class="favorite-item">
           <div class="fav_img">
          <img src=${item.img} alt="image" class="img_prod">
          </div>
          <div class="fav_content">
            <p>Product : ${item.title}</p>
            <p>Category : ${item.category}</p>
            <i class="fa-solid fa-heart scroll-to-start"></i>
          </div>
        </div>
    `).join('');
    
    const heartIcons = document.querySelectorAll('.scroll-to-start');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Scroll the container to the start
            document.querySelector('.favorites-container').scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        });
    });



});

function addEventListenersToButtons(cartItems) {
    const plusButtons = document.querySelectorAll(".fa-plus");
    const minusButtons = document.querySelectorAll(".fa-minus");
    const removeButtons = document.querySelectorAll(".remove");

    plusButtons.forEach(button => {
        button.addEventListener("click", function () {
            let itemId = this.getAttribute("data-id");
            updateQuantity(cartItems, itemId, 1);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener("click", function () {
            let itemId = this.getAttribute("data-id");
            updateQuantity(cartItems, itemId, -1);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            let itemId = this.getAttribute("data-id");
            removeItem(cartItems, itemId);
        });
    });
}

function updateQuantity(cartItems, itemId, change) {
    cartItems = cartItems.map(item => {
        if (item.id == itemId) {
            item.quantity += change;
            if (item.quantity < 1) item.quantity = 1;
        }
        return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateTotalPrice(cartItems);
    document.querySelector(".chosen_product_container").innerHTML = '';
    document.dispatchEvent(new Event("DOMContentLoaded"));
}

function removeItem(cartItems, itemId) {
    cartItems = cartItems.filter(item => item.id != itemId);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateTotalPrice(cartItems);
    document.querySelector(".chosen_product_container").innerHTML = '';
    document.dispatchEvent(new Event("DOMContentLoaded"));
}

function updateTotalPrice(cartItems) {
    let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let roundedTotalPrice = Math.round(totalPrice);

    // Store the total price in localStorage
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));

    // Update the displayed total price on the page
    document.querySelector(".total-price-display").textContent = `Total Price : ${roundedTotalPrice}$`;
}

const heartIcons = document.querySelectorAll('#scroll-to-start');
  











