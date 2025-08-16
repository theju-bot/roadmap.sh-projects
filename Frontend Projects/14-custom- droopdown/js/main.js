const selectItem = document.querySelector(".dropdown");
const arrow = selectItem.querySelector(".arrow");
const text = selectItem.querySelector(".text");

const choiceContainer = document.querySelector(".choices");
const choiceItems = choiceContainer.querySelectorAll("div");

selectItem.addEventListener("click", () => {
    choiceContainer.classList.toggle("hidden");
    if (arrow) {
        arrow.style.transform = choiceContainer.classList.contains("hidden")
            ? "rotate(0deg)"
            : "rotate(180deg)";
    }
});

choiceItems.forEach((item, i) => {
    item.addEventListener("click", () => {
        const text2 = item.querySelector(".text2");    
        if (text.textContent !== text2.textContent) {
            text.textContent = text2.textContent;
        } else {
            text.textContent = "Select an Item";
        }  
        choiceContainer.classList.add("hidden");
        arrow.style.transform = "rotate(0deg)";
    });
});