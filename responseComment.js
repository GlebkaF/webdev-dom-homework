export function responseComment(textInputElement, comments) {
    const formComments = document.querySelectorAll(".comment");
    for (const formComment of formComments) {
        formComment.addEventListener("click", () => {
            const index = formComment.dataset.index;
            textInputElement.value = `> ${comments[index].name} : ${comments[index].text}`;
        });
    }
};