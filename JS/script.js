// BODY
const body = document.body;

// OVERLAY
const overlay = document.querySelector(".overlay");

// SLIDER
const slider = document.querySelector(".slider");

// PRODUCT CONTAINER
const productContainer = document.querySelector(".products__container");

// CHECKOUT CONTAINER
const checkoutContainer = document.querySelector(".checkout");

// SLIDER OPEN/CLOSE BTN
const cartBtn = document.querySelector(".header__iconbox");
const closeBtn = document.querySelector(".btn__close");
// -----------------------------------

let allProducts;
const cart = [];

// --> Slider Logic
const showSlider = function () {
  slider.classList.toggle("slider--active");
  overlay.classList.toggle("overlay--active");
  body.classList.toggle("body--scroll-lock");
};
// ---------------------------

// --> Display Products
const displayProducts = function (arr) {
  const elements = arr
    .map((item) => {
      return `<li class="item grid" data-p_id=${item.id}>
    <div class="item__container grid">
      <div class="item__img">
        <img src="${item.image}" alt="${item.alt}" />
      </div>
      <div class="item__about grid">
        <h2 class="secondary--title">${item.name}</h2>
        <span class="price">$ ${item.price}</span>
        <div class="item__btnbox item__btnbox--active">
          <div class="item__subBox">
            <button class="item__btn">add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div class="item__selectqty selectqty">
      <div class="selectqty__container flex">
        <button class="btn btn__minus">&minus;</button>
        <input
          type="number"
          readonly
          placeholder="05"
          id="quantity"
        />
        <button class="btn btn__plus">&plus;</button>
      </div>
    </div>
  </li>`;
    })
    .join("");
  productContainer.innerHTML = elements;
};
// ---------------------------

// --> Display Products on Checkout List
const display_Products_On_CheckoutList = function (arr) {
  checkoutContainer.innerHTML = "";

  const element = arr.forEach((item) => {
    const ele = document.createElement("li");
    ele.classList = `checkout__item flex`;
    const attr = document.createAttribute("data-id");
    attr.value = item.id;
    ele.setAttributeNode(attr);

    ele.innerHTML = `<div class="checkout__img">
    <img src="${item.image}" alt="${item.alt}" />
  </div>
  <h4 class="fourth--title">${item.name}</h4>
  <span class="checkout__price">$ ${item.price * item.qty}</span>
  <div class="checkout__btnbox flex">
    <button class="btn__minus">&minus;</button>
    <input type="number" readonly value="${item.qty}" id="quantity" />
    <button class="btn__add">&plus;</button>
  </div>`;

    checkoutContainer.append(ele);
  });
};
// ---------------------------

// --> Get data about our products
const getProducts = async function () {
  try {
    const result = await fetch(`../products.json`);
    const r = await result.json();
    allProducts = r;
    displayProducts(r);
  } catch (err) {}
};
getProducts();
// ---------------------------

// --> UPDATE CART
const updateCart = function (id, qty) {
  const findProduct = allProducts.find((item) => item.id === id);
  const hasCart = cart.find((item) => item.id === id);

  if (!cart.length) {
    cart.push({ ...findProduct, qty });
  } else if (hasCart) {
    hasCart.qty = qty;
  } else {
    cart.push({ ...findProduct, qty });
  }
  display_Products_On_CheckoutList(cart);
};
// ---------------------------

// INCREASE/DECREASE QTY
const quantitySelector = function (id, btnBox, inputBox, target, input) {
  let val = +input.value;

  input.value = target.classList.contains("btn__plus") ? ++val : --val;
  updateCart(+id, +input.value);
};
// ---------------------------

// BUTTONs
cartBtn.addEventListener("click", showSlider);
overlay.addEventListener("click", showSlider);
closeBtn.addEventListener("click", showSlider);

productContainer.addEventListener("click", function (e) {
  // Select Elements:-
  const ourProduct = e.target.closest(".item");
  const ourProductID = ourProduct.dataset.p_id;
  const atc_Box = ourProduct.querySelector(".item__btnbox");
  const atcBtn = ourProduct.querySelector(".item__btn");
  const quantityBox = ourProduct.querySelector(".item__selectqty");
  const quantity = ourProduct.querySelector("#quantity");

  if (e.target.classList.contains("item__btn")) {
    // Modify Elements:-
    atc_Box.classList.toggle("item__btnbox--active");
    quantityBox.classList.toggle("selectqty--active");
    quantity.value = 1;
    updateCart(+ourProductID, +quantity.value);
  } else if (e.target.classList.contains("btn")) {
    quantitySelector(ourProductID, atc_Box, quantityBox, e.target, quantity);
  }
});
