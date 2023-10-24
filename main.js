import { getComments, postComment } from "./api.js";
import { renderComments } from "./render.js";
import { dateFormat } from "./helper.js";

const nameInputElement = document.querySelector(".add-form-name");
const textInputElement = document.querySelector(".add-form-text");
const btnAddCommentElement = document.querySelector(".add-form-button");
const btnDelCommentElement = document.querySelector(".delete-form-button");
const addFormElement = document.querySelector(".add-form");
const loadingCommentElement = document.querySelector(".loading-comment");

let comments = [];

function fetchAndRenderComments() {

    loadingCommentElement.textContent = "Загрузка комментариев"

    getComments()
        .then((responseDate) => {
            const appComments = responseDate.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    date: dateFormat(comment.date),
                    likesCounter: comment.likes,
                    isLiked: false,
                    isLikeLoading: false,
                    isEdited: false,
                };
            });

            comments = appComments;

            addFormElement.classList.remove("displayHidden");
            loadingCommentElement.classList.add("displayHidden");

            renderComments(comments);

        })
        .catch((error) => {
            alert(error.message);
            console.warn(error);
        })
}

function addComment() {
    addFormElement.classList.add("displayHidden");
    loadingCommentElement.classList.remove("displayHidden");

    postComment({ text: textInputElement.value, name: nameInputElement.value })
        .then(() => {

            fetchAndRenderComments();

        })
        .then(() => {
            nameInputElement.value = '';
            textInputElement.value = '';

            btnAddCommentElement.disabled = true;
        })
        .catch((error) => {
            addFormElement.classList.remove("displayHidden");
            loadingCommentElement.classList.add("displayHidden");

            console.warn(error);

            if (error.message === "Ошибка сервера") {

                addComment();

            } else if (error.message === "Имя и комментарий должны быть не короче 3х символов") {

                alert(error.message);

            } else {

                alert(`Кажется что-то пошло не так, попробуй позже`);

            }
        })

}

document.addEventListener("keyup", (event) => {

    if (
        event.code === 'Enter' &&
        nameInputElement.value.trim() !== '' &&
        textInputElement.value.trim() !== '') {

        addComment();
    }
})

document.addEventListener("input", () => {

    if (
        nameInputElement.value.trim() !== '' &&
        textInputElement.value.trim() !== ''
    ) {

        btnAddCommentElement.disabled = false;

    } else {

        btnAddCommentElement.disabled = true;
    }
})

btnAddCommentElement.addEventListener("click", addComment);

btnDelCommentElement.addEventListener("click", () => {

    comments.pop();

    renderComments(comments);

})

fetchAndRenderComments();