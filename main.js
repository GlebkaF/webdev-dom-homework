
import { getComments, addCommentRequest } from "./api.js";
import { renderComments } from "./render.js";

const nameInput = document.querySelector('#name-input');
const commentInput = document.querySelector('#comment-input');
const addButton = document.querySelector('.add-form-button');
const loadingMessage = document.querySelector('.loading-message');

let isLoading = true;
let comments = [];

function showLoadingMessage() {
    if (isLoading) {
        loadingMessage.textContent = "Пожалуйста, подождите, загружаю комментарии...";
        loadingMessage.style.display = 'block';
    } else {
        loadingMessage.style.display = 'none';
    }
}

function addCommentHandler() {
    addButton.disabled = true;
    addButton.textContent = "Элемент добавляется...";
    loadingMessage.textContent = "Комментарий добавляется...";

    if (nameInput.value.trim().length < 3 || commentInput.value.trim().length < 3) {
        alert("Имя и комментарий должны содержать хотя бы 3 символа!");
        addButton.disabled = false;
        addButton.textContent = "Добавить";
        loadingMessage.style.display = "none";
        return;
    }

    const now = new Date();
    const dateString = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

    const newComment = {
        id: comments.length + 1,
        author: nameInput.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
        date: dateString,
        text: commentInput.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
        likes: "0",
        liked: false,
    };

    // Отправка нового комментария на сервер
    addCommentRequest(newComment)
        .then(() => {
            nameInput.value = "";
            commentInput.value = "";
            nameInput.disabled = false;
            commentInput.disabled = false;
            addButton.disabled = false;
            addButton.textContent = "Добавить";
            loadingMessage.style.display = "none";
            // Перерисовать комментарии после успешного добавления
            renderComments();
        })
        .catch((error) => {
            console.log(error);
            nameInput.disabled = false;
            commentInput.disabled = false;
            addButton.disabled = false;
            addButton.textContent = "Добавить";
            loadingMessage.style.display = "none";

            if (error.message === "Ошибка сервера") {
                alert("Сервер сломался, попробуйте позже");
            } else if (error.message === "Неверный запрос") {
                alert("Имя и комментарий должны быть не короче трех символов");
            } else {
                alert("Отсутствует интернет-соединение");
            }
        });
}

function main() {
    getComments()
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    liked: false,
                };
            });
            comments = appComments;
            isLoading = false;
            renderComments(comments);
            showLoadingMessage();
        })
        .catch((error) => {
            console.error(error);
            alert("Кажется что-то пошло не так, попробуйте позже.");
            isLoading = false;
            showLoadingMessage();
        });
}

// Добавить обработчик события для кнопки 
addButton.addEventListener("click", addCommentHandler);

// Вызвать функцию main для начальной загрузки комментариев
main();

// Добавить обработчики событий для кнопок "Лайк"
const likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const commentId = parseInt(button.dataset.commentId);
        const comment = comments.find((c) => c.id === commentId);

        if (comment.liked) {
            comment.likes--;
        } else {
            comment.likes++;
        }
        comment.liked = !comment.liked;

        renderComments();
    });
});
