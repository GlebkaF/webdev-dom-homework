import { commentText } from "./script.js";
import { commentName } from "./script.js";
import { addForm } from "./script.js";
import { addButton } from "./script.js";
import { loadingMessage } from "./script.js";
import { formatDate } from "./format-date.js";
import { renderComments } from "./render.js";

export let appComments = [];

export let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';

export function getData() {

    return fetch("https://wedev-api.sky.pro/api/v2/daria-s/comments", {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status ===401) {
                token = prompt('Введите верный пароль');
                getData();
                throw new Error ("Нет авторизации");
            }
            return response.json();
        })
        .then((responseData) => {
            appComments = responseData.comments.map((comment) => {

                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString().slice(0, -3),
                    text: comment.text,
                    likes: comment.likes,
                    likeStatus: false,
                }
            })
            console.log(appComments);
            return appComments;
        })

}

export const addToServer = (comment) => {

    const savedName = commentName.value;
    const savedText = commentText.value;

    fetch("https://wedev-api.sky.pro/api/v2/daria-s/comments", {
        method: "POST",
        body: JSON.stringify({
            name: commentName.value
                .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            text: commentText.value
                .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            forceError: true,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error('Сервер упал');
                }
                if (response.status === 400) {
                    throw new Error('Ошибка ввода');
                }  
            }

            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            return getData().then((comments => renderComments(comments)));
        })
        .catch((error) => {
            console.log('Ошибка при отправке комментария на сервер:', error);

            if (error.message === 'Ошибка ввода') {
                alert('Имя и сообщение должны быть не короче 3 символов');
            } else if (error.message === 'Сервер упал') {
                alert('Сервер сломался, попробуйте позже');
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            }

            commentName.value = savedName;
            commentText.value = savedText;
            addForm.classList.remove('hidden');
            addButton.removeAttribute('disabled')
            loadingMessage.classList.add('hidden');
        });

}

export const addToList = () => {

    commentName.classList.remove('error');
    if (commentName.value === '') {
        commentName.classList.add('error');
        return;
    }

    commentText.classList.remove('error');
    if (commentText.value === '') {
        commentText.classList.add('error');
        return;
    }

    const newComment = {
        name: commentName.value
            .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        text: commentText.value
            .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: formatDate(),
        like: 0,
        likeStatus: false,
    }

    addToServer(newComment);

    commentName.value = '';
    commentText.value = '';
    addButton.setAttribute('disabled', '');
}