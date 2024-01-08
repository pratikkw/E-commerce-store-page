"use strict";

const body = document.body;

// SLIDER
const overlay = document.querySelector(".overlay");
const slider = document.querySelector(".slider");
const cartBtn = document.querySelector(".icon__box");
const closeCartBtn = document.querySelector(".close__btn");

const itemLists = document.querySelector(".lists");
const cartItemLists = document.querySelector(".checkout__lists");
const checkOutBox = document.querySelector(".checkout__lists");

let allProduct;
let shoppingCart = [];

// --> SLIDER FUNCTIONALITY
const cartFunc = function () {
  body.classList.toggle("scroll--lock");
  slider.classList.toggle("slider--active");
  overlay.classList.toggle("overlay--active");
};

// --> DISPLAY/HIDE QTY BUTTON
const showQtyButton = function (par) {
  const selectBox = par.querySelector(".choose__qty");
  const qtyBtn = par.querySelector(".btn-cart");

  selectBox.classList.toggle("choose__qty--active");
  qtyBtn.classList.toggle("btn-cart--hide");
};

// --> DISPLAY PRODUCTs
const showItems = function (items) {
  const elements = items
    .map((item, ind) => {
      return `<li class="item grid" data-id="${item.id}">
    <div class="item__container grid">
      <div class="img__box">
        <img src="${item.image}" alt="${item.alt}" />
      </div>

      <h3 class="third--title">${item.name}</h3>

      <div class="qty__box grid">
        <span class="price">$ ${item.price}</span>
        <button class="btn-cart">add to cart</button>
      </div>
    </div>
    <div class="choose__qty">
      <div class="test flex">
        <button class="qty_btn minus">&minus;</button>
        <input
          type="number"
          class="input__qty"
          readonly
          step="1"
          min="0"
        />
        <button class="qty_btn plus">&plus;</button>
      </div>
    </div>
  </li>`;
    })
    .join("");

  itemLists.innerHTML = elements;
};

const showAddedItem = function (items) {
  const elements = items
    .map((item) => {
      return `<li class="checkout__item flex data-cart="${item.ourproductID}">
    <div class="img__box-2">
      <img src="${item.img}" alt="${item.alt}" />
    </div>

    <p class="item__name">${item.name}</p>

    <span class="total__amt">$ ${item.price * item.quantity}</span>

    <div class="increase__qty flex">
      <button class="qty_btn minus">&minus;</button>
      <span class="total__qty">${item.quantity}</span>
      <button class="qty_btn plus">&plus;</button>
    </div>
  </li>`;
    })
    .join("");

  cartItemLists.innerHTML = elements;
};

const getItems = async function () {
  const getResult = await fetch("products.json");
  const result = await getResult.json();
  allProduct = result;
  showItems(allProduct);
};
getItems();

const addToCart = function (idNum, input) {
  const ourproduct = allProduct.find((item) => item.id === +idNum);
  const findProduct = shoppingCart.find((item) => item.ourproductID === +idNum);

  if (shoppingCart.length === 0) {
    shoppingCart.push({
      ourproductID: ourproduct.id,
      name: ourproduct.name,
      price: ourproduct.price,
      img: ourproduct.image,
      alt: ourproduct.alt,
      quantity: +input.value,
    });
  } else if (findProduct) {
    findProduct.quantity = +input.value;
  } else if (findProduct === undefined) {
    shoppingCart.push({
      ourproductID: ourproduct.id,
      name: ourproduct.name,
      price: ourproduct.price,
      img: ourproduct.image,
      alt: ourproduct.alt,
      quantity: +input.value,
    });
  }
  console.log(`Shopping Cart:-`, shoppingCart);

  showAddedItem(shoppingCart);
};

const selectQty = function (parnEle, input, element) {
  if (element.classList.contains("plus")) {
    input.value++;
  } else if (element.classList.contains("minus") && +input.value > 0) {
    input.value--;
  }

  if (+input.value === 0) {
    setTimeout(() => {
      showQtyButton(parnEle);
    }, 500);
  }
  addToCart(parnEle.dataset.id, input);
};

itemLists.addEventListener("click", function (e) {
  const parentEle = e.target.closest(".item");
  const input = parentEle.querySelector(".input__qty");

  if (e.target.classList.contains("btn-cart")) {
    input.value = 1;
    showQtyButton(parentEle);
    addToCart(parentEle.dataset.id, input);
  } else if (e.target.classList.contains("qty_btn")) {
    selectQty(parentEle, input, e.target);
  }
});

cartBtn.addEventListener("click", cartFunc);
closeCartBtn.addEventListener("click", cartFunc);
overlay.addEventListener("click", cartFunc);
