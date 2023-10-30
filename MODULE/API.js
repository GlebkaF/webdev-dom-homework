import { setComments } from "../main.js";
import { renderComments } from "./Render.js";


export const getComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/egor-gorohow/comments',
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал');
            }
            return response.json();
        })
        .then((responseData) => {
            let appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ''),
                    text: comment.text,
                    likeCount: comment.likes,
                    isLike: comment.isLiked
                };
            });
            setComments(appComments);
            renderComments();
            //скрытие лоадера
            loaderHide();
        })
        .catch((error) => {
            if (error.message === "Сервер упал") {
                alert('сервер сломался, попробуй позже');
            };
        });
};

export const postComments = () => {
    const nameElement = document.getElementById('form-name');
    const textElement = document.getElementById('form-text');
    const buttonElement = document.getElementById('add-button');
    const addLoaderComment = document.querySelector(".mask-comment");
    const formLoader = document.querySelector('.add-form');
    const buttonDeleteElement = document.getElementById('add-button-delete');
    fetch('https://wedev-api.sky.pro/api/v1/egor-gorohow/comments',
        {
            method: 'POST',
            body: JSON.stringify({
                name: nameElement.value,
                text: textElement.value,
                forceError: true
                // вышел флаг 500 ошибок
            }),
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал');
            }
            if (response.status === 400) {
                throw new Error('Ошибка ввода');
            }
            return response.json();
        })
        .then(() => {
            return getComments();
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            nameElement.value = ''; //очищаем форму (имя);
            textElement.value = ''; //очищаем форму (текст);
        })
        .catch((error) => {

            if (error.message === "Сервер упал") {
                alert('сервер сломался, попробуй позже');

            }
            else if (error.message === 'Ошибка ввода') {
                alert('Имя и комментарий должны быть не короче 3х символов');

            } else
                alert('кажется что то пошло не так, попробуйте позже');
        })
        .finally(() => {
            addLoaderComment.style.display = 'none';
            formLoader.style.visibility = 'visible';
            buttonDeleteElement.style.visibility = 'visible'

        })
    addLoaderComment.style.display = 'block';
    formLoader.style.visibility = 'hidden';
    buttonDeleteElement.style.visibility = 'hidden'
}

function loaderHide() {
    const buttonDeleteElement = document.getElementById('add-button-delete');
    const addLoader = document.querySelector(".mask");
    const formLoader = document.querySelector('.add-form');
    const addLoaderComment = document.querySelector(".mask-comment");

    addLoader.style.display = 'none';
    addLoaderComment.style.display = 'none';
    formLoader.style.visibility = 'visible';
    buttonDeleteElement.style.visibility = 'visible'
}