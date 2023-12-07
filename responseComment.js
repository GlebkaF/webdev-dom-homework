export function responseComment(nameInputElement, textInputElement, comments) {
    const formComments = document.querySelectorAll(".comment");
    for (const formComment of formComments) {
        formComment.addEventListener("click", () => {
            const index = formComment.dataset.index;
            nameInputElement.value = '';
            textInputElement.value = `> ${comments[index].name} : ${comments[index].text}`;
        });
    }
};