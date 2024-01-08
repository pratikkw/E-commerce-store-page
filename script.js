"use strict";

const body = document.body;

// SLIDER
const overlay = document.querySelector(".overlay");
const slider = document.querySelector(".slider");
const cartBtn = document.querySelector(".icon__box");
const closeCartBtn = document.querySelector(".close__btn");

const itemLists = document.querySelector(".lists");

let allProduct;

// --> SLIDER FUNCTIONALITY
const cartFunc = function () {
  body.classList.toggle("scroll--lock");
  slider.classList.toggle("slider--active");
  overlay.classList.toggle("overlay--active");
};

// --> OPEN & CLOSE QTY BUTTONs
const close_open_qtyBtn = function (ele) {
  const cartBtn = ele.querySelector(".btn-cart");
  const selectQty = ele.querySelector(".choose__qty");

  cartBtn.classList.toggle("btn-cart--hide");
  selectQty.classList.toggle("choose__qty--active");
};

// --> INCREASE AND DECREASE QUANTITY
const incre_And_dec = function (parentEle, currentEle, input) {
  if (input.value !== 0 && input.value > 0) {
    currentEle.classList.contains("plus") === true
      ? input.value++
      : input.value--;
  } else if (input.value === 0) {
    setTimeout(() => {
      close_open_qtyBtn(parentEle);
    }, 500);
  }
};

// --> ADD TO CART
const addTocart = function (currentEle, targetEle) {
  const id = currentEle.dataset.id;
  if (targetEle.className !== "btn-cart") return;
  close_open_qtyBtn(currentEle);
  const input = currentEle.querySelector(".input__qty");
  input.value = 1;

  currentEle.querySelectorAll(".qty_btn").forEach((item) => {
    item.addEventListener("click", function (e) {
      incre_And_dec(currentEle, this, input);
    });
  });
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

  itemLists.querySelectorAll(".item").forEach((item) =>
    item.addEventListener("click", function (e) {
      addTocart(this, e.target);
    })
  );
};

const getItems = async function () {
  const getResult = await fetch("products.json");
  const result = await getResult.json();
  allProduct = result;
  showItems(allProduct);
};
getItems();

cartBtn.addEventListener("click", cartFunc);
closeCartBtn.addEventListener("click", cartFunc);
overlay.addEventListener("click", cartFunc);
