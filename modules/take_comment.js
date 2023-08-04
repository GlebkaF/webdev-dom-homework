export const takeCommentText = (LIST) => {
    const comentText = document.querySelectorAll(".comment-text");
    const textArea = document.getElementById("add-form-text");
    comentText.forEach((textElement, index) => {
        textElement.addEventListener("click", (event) => {
            event.stopPropagation();
            let textValue = textElement.textContent;
            return (textArea.value = `>${textValue} ${LIST[index].name}  Ответ - `);
        });
    });
};
