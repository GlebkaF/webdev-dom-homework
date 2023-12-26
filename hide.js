const listElement = document.getElementById("comments");
const buttonElement = document.getElementById("add-form-button");
export const hideSeeAddComment = () => {
    buttonElement.addEventListener("click", () => {
        buttonElement.disabled = true;
        listElement.textContent = "Добавление комментария";
    });
    buttonElement.disabled = false;
    listElement.textContent = "";
}