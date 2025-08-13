const question = document.querySelectorAll(".q");
const answer = document.querySelectorAll(".a");

question.forEach((e, i) => {
    e.addEventListener("click", () => {
        isHidden = answer[i].classList.contains("none");
        answer.forEach((a) => {
            a.classList.add("none");
        });
        if (isHidden) {
            answer[i].classList.toggle("none");
        }
    });
});