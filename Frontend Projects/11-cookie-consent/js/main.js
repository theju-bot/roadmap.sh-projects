const x = document.querySelector(".x");
const button = document.querySelector("button");
const cookie = document.querySelector(".cookie");

button.addEventListener("click",(event) => cookie.classList.add("hide"));
x.addEventListener("click",(event) => cookie.classList.add("hide"));