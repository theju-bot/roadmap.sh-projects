comment = document.querySelector("textarea");
count = document.querySelector(".count");

const maxLength = 250;
comment.maxLength = maxLength;

comment.addEventListener("input", () => {
    const currentLength = comment.value.length;
    const remaining = maxLength - currentLength;

    count.innerHTML = `${currentLength} / ${maxLength}`;

    if (remaining <= 0) {
        count.style.color = "red";
    } else {
        count.style.color = "purple";
    }
});