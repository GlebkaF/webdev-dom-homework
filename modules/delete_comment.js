export const delCommentElement = (renderFunction) => {
    const delColBut = document.querySelectorAll(".del-form-button");
    delColBut.forEach((delButton, id) => {
        delButton.addEventListener("click", (event) => {
            event.stopPropagation();

            renderFunction();
        });
    });
};
