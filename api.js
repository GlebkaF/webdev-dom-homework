import { renderComments } from '/script.js';

import { replaceValue } from '/supportFunc.js';

let host = "https://webdev-hw-api.vercel.app/api/v2/marina-obruch/comments";


const fetchAndRenderTasks = (token, isWaitingComment, comments) => {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((responseStart) => {
            return responseStart.json();
        })
        .then((startJson) => {
            comments = startJson.comments;
            isWaitingComment = false;

            renderComments();
        })
};

// Добавляем новый комментарий в ленту
const postComment = (token, nameInputElement, commentInputElement, addCommentForm, constWaitingComment) => {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name: replaceValue(nameInputElement.value),
            text: replaceValue(commentInputElement.value),
            // .replaceAll('START_QUOTE', '<div class="comment-quote">')
            // .replaceAll('END_QUOTE', '</div>'),
            headers: {
                Authorization: token,
            },
        })
    })
        .then((response) => {
            if (response.status === 400) throw new Error('Ошибка 400');
            if (response.status === 500) throw new Error('Ошибка 500');

            return response.json();
        })
        .then(() => {
            nameInputElement.value = "";
            commentInputElement.value = "";
            addCommentForm.classList.remove('hidden');
            constWaitingComment.classList.add('hidden');

            return fetchAndRenderTasks(token, isWaitingComment, comments);
        })
        .catch((error) => {
            if (error.message === "Ошибка 400") {
                alert("Неправильный логин или пароль");
                addCommentForm.classList.remove('hidden');
                constWaitingComment.classList.add('hidden');
            }
            else if (error.message === "Ошибка 500") {
                alert("Сервер сломался, попробуй позже");
            }
            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                addCommentForm.classList.remove('hidden');
                constWaitingComment.classList.add('hidden');
            }
        });
};

export { fetchAndRenderTasks, postComment }