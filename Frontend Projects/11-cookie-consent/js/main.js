const x = document.querySelector(".x");
const button = document.querySelector("button");
const cookie = document.querySelector(".cookie");

if (localStorage.getItem("cookie") !== "true") {
    button.addEventListener("click", (event) => {
        cookie.classList.add("hide");
        localStorage.setItem("cookie", "true");
    });
    x.addEventListener("click", (event) => {
        cookie.classList.add("hide");
        localStorage.setItem("cookie", "true");
    });
} else {
    cookie.classList.add("hide");
}

// Cookie consent stops hiding on reopening the page

/* if (sessionStorage.getItem("cookie") !== "true") {
    button.addEventListener("click", (event) => {
        cookie.classList.add("hide");
        sessionStorage.setItem("cookie", "true");
    });
    x.addEventListener("click", (event) => {
        cookie.classList.add("hide");
        sessionStorage.setItem("cookie", "true");
    });
} else {
    cookie.classList.add("hide");
} */
