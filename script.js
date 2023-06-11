import { getFetch, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";
export { delay } from "./supportFunc.js";

const app = document.getElementById("app");

let comments = [];

let isInitialLoading = true;
let isWaitingComment = false;


const getInitFetch = () => {
    return getTodos({ token })
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
};

export function handlePostClick(user) {

    const addButton = document.getElementById('add-form-button');
    const nameInputElement = document.querySelector('.add-form-name');
    const commentInputElement = document.querySelector('.add-form-text');

    addButton.disabled = true;
    addButton.textContent = 'Отправление...';

    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');


    postComment(commentInputElement, user.token)
        .then(() => {
            return startFetch(user);
        })
        .then(() => {
            addButton.disabled = false;
            addButton.textContent = 'Написать';

            nameInputElement.value = '';
            commentInputElement.value = '';
        })
        .catch((error) => {
            addButton.disabled = false;
            addButton.textContent = 'Написать';

            if (error.message === "Ошибка 400") {
                console.log("Ошибка 400");
                alert("Имя и комментарий должны быть не короче 3 символов");
                return startFetch(user);
            }
            if (error.message === "Ошибка 500") {
                console.log("Ошибка 500");
                alert("Сервер сломался, попробуй позже");
                return startFetch(user);
            }
        });
    renderComments(app, isInitialLoading, isWaitingComment, comments, initAddButton, user);
}


function initAddButton(user) {
    let addButton = document.getElementById('add-form-button');
    isWaitingComment = true;
    addButton.addEventListener('click', function () {
        handlePostClick(user)
    });
}

export function startFetch(user) {
    getFetch().then((startJson) => {
        comments = startJson.comments;
        isWaitingComment = false;
        isInitialLoading = false;
        renderComments(app, isInitialLoading, isWaitingComment, comments, initAddButton, user);
    })
}
startFetch();

