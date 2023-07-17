import { dataFormat } from "./formatDate.js";
import { getComments, postComment } from "./api.js";
import {renderComments} from "./renderComments.js";


const buttonElement = document.querySelector('.add-form-button');
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const hederLoadElement = document.querySelector('.loader');
let comments = [];

// Функция GET для API

const fetchAndRenderComments = () => {
    getComments()
        .then((responseData) => {
            // Преобразование данных из формата api в формат приложения

            const appComments = responseData.comments.map((comment) => {
                return {
                    // Достаем имя автора
                    name: comment.author.name,
                    // Преобразовываем дату-строку в Date
                    time: dataFormat(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    // Заглушка для признака лайкнутости
                    icon: false,
                };
            });
            comments = appComments;
            hederLoadElement.classList.add('disableLoader');
            renderComments(comments);

        })

};

fetchAndRenderComments();


// Деактивация кнопки если значения не введены
const disableButton = () => {
    if (nameElement.value && textElement.value) {
        buttonElement.disabled = false;
    }
    else {
        buttonElement.disabled = true;
    }
};

nameElement.addEventListener("input", disableButton);
textElement.addEventListener("input", disableButton);


// Форма добавления нового комментария в ленту
buttonElement.addEventListener('click', () => {

    postComment({fetchAndRenderComments});
    
});

