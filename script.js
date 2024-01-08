"use strict";

const body = document.body;
const overlay = document.querySelector(".overlay");
const slider = document.querySelector(".slider");
const cartBtn = document.querySelector(".icon__box");
const closeCartBtn = document.querySelector(".close__btn");

const cartFunc = function () {
  body.classList.toggle("scroll--lock");
  slider.classList.toggle("slider--active");
  overlay.classList.toggle("overlay--active");
};

cartBtn.addEventListener("click", cartFunc);
closeCartBtn.addEventListener("click", cartFunc);
overlay.addEventListener("click", cartFunc);
