const body = document.body;
const overlay = document.querySelector(".overlay");
const cartBtn = document.querySelector(".header__iconbox");
const slider = document.querySelector(".slider");
const closeBtn = document.querySelector(".btn__close");

const showSlider = function () {
  slider.classList.toggle("slider--active");
  overlay.classList.toggle("overlay--active");
  body.classList.toggle("body--scroll-lock");
};

cartBtn.addEventListener("click", showSlider);
overlay.addEventListener("click", showSlider);
closeBtn.addEventListener("click", showSlider);
