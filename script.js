import { fetchAndRenderTasks, postComment } from "/api.js";
import { renderComments } from "/renderComments.js";

const buttonElement = document.querySelector(".add-form-button");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const app = document.getElementById("app");


let comments = [];

let isLoading = true;
let isWaitingComment = false;

fetchAndRenderTasks()
    .then((startJson) => {
        comments = startJson.comments;
        isWaitingComment = false;
        isLoading = false;

        renderComments(app, isLoading, isWaitingComment, comments);
    });

fetchAndRenderTasks();

renderComments(app, isLoading, isWaitingComment, comments);

const handlePostClick = () => {
    // валидация на ввод
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }

    commentInputElement.classList.remove("error");
    if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }

    // Инициализация лоадинга при добавлении комментария
    isWaitingComment = true;
    renderComments(app, isLoading, isWaitingComment, comments);

    postComment(nameInputElement, commentInputElement)
        .then(() => {
            nameInputElement.value = "";
            commentInputElement.value = "";
            isWaitingComment = false;
            renderComments(app, isLoading, isWaitingComment, comments);
        })
        .catch((error) => {
            if (error.message === "Ошибка 400") {
                console.log("Ошибка 400");
                alert("Имя и комментарий должны быть не короче 3 символов");
                return fetchAndRenderTasks();
            }
            else if (error.message === "Ошибка 500") {
                console.log("Ошибка 500");
                alert("Сервер сломался, попробуй позже");
                return fetchAndRenderTasks();
            }

            else {
                isWaitingComment = false;
                renderComments(app, isLoading, isWaitingComment, comments);
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
        });
    renderComments(app, isLoading, isWaitingComment, comments);
}

buttonElement.addEventListener('click', handlePostClick);


renderComments(app, isLoading, isWaitingComment, comments);