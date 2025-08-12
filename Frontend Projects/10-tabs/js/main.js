const tabs = document.querySelectorAll(".nav p");
const contents = document.querySelectorAll(".content div");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach((tab) =>{
            tab.classList.remove("active");
        });
        contents.forEach((content) => {
            content.classList.remove("active");
        });
        tabs[index].classList.add("active");
        contents[index].classList.add("active");
    });
});