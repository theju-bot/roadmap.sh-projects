comment = document.querySelector("textarea");
count = document.querySelector(".count");

const maxLength = 250;
comment.maxLength = maxLength;

comment.addEventListener("input", () => {
    const currentLength = comment.value.length;
   
    count.innerHTML = `${currentLength} / ${maxLength}`;

    if (currentLength === maxLength) {
        count.style.color = "red";
        comment.style.color = "red";
        comment.style.border = "2px solid red";
    } else {
        count.style.color = "black";
        comment.style.color = "black";
        comment.style.border = "2px solid black";
        
    }
});