
"use strict";

import { takeDate } from "./Date.js";
import renderComments from "./render.js";
import { getListComments } from "./listComments.js";
//import { getArr } from "./fetch.js";

//  Поиск элментов
const nameInputElement = document.getElementById("name-input");
const comentInputElement = document.getElementById("coment-input");
const addButtonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const endDeleteButtonElement = document.getElementById("end-delete-button");
const addFormElement = document.getElementById("add-form");
const loadingElement = document.querySelector(".loading");

let comments = [];

function getArr() {    
    return fetch("https://wedev-api.sky.pro/api/v1/:sofia-iakovleva/comments", {
        method: "GET"
    })
        // Подписываемся на успешное завершение запроса с помощью then
        .then((response) => {
            // Запускаем преобразовываем "сырые" данные от API в json формат и 
            //подписываемся на успешное завершение запроса с помощью then:
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    eachDate: takeDate(new Date(comment.date)),
                    like: comment.likes,
                    currentLike: false,
                    classLike: 'like-button -no-active-like',
                    isEdit: false,
                };
            });
            comments = appComments;
            return renderComments(listElement, getListComments)
        })
        .then((data) => {
            document.body.classList.add('loaded');
        });
}

getArr(comments);

// Добавление возможности редактирования на каждый комент
const initiateRedact = () => {
    const redactButtons = document.querySelectorAll(".redact-button");
    for (const redactButton of redactButtons) {
        redactButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = redactButton.dataset.index;
            comments[index].isEdit = !comments[index].isEdit;
            renderComments(listElement, getListComments);
        });

    }
    const saveButtons = document.querySelectorAll(".save-button");
    for (const saveButton of saveButtons) {
        saveButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = saveButton.dataset.index;
            comments[index].isEdit = !comments[index].isEdit;
            comments[index].text = saveButton.closest('.comment').querySelector('textarea').value
            renderComments(listElement, getListComments);
        });

    }

};
// Добавление кликабельностm лайка и счётчика лайков
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
const initlikeButtonsListeners = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            comments[index].currentLike = !comments[index].currentLike;
            likeButtonElement.classList.add('-loading-like');
            delay(2000).then(() => {
                if (comments[index].currentLike) {
                    ++comments[index].like;
                    comments[index].classLike = 'like-button -active-like';
                } else {
                    --comments[index].like;
                    comments[index].classLike = 'like-button -no-active-like';
                }
                renderComments(listElement, getListComments);
            })
                .then((data) => {
                    likeButtonElement.classList.remove('-loading-like');
                });
        });
    }
};

//Функция редактирования коментов
const redactComments = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            console.log(comments[index].text);
            comentInputElement.value = `QUOTE_BEGIN${comments[index].name}:\n${comments[index].text}QUOTE_END`;

        })
    }
}
redactComments();

// Рендерим из массива разметку
renderComments(listElement, getListComments);

loadingElement.classList.add("display-none");

// Добавить обработчик клика для добавления элемента
function clickButton() {
    addButtonElement.addEventListener("click", () => {

        //Добавляем валидацию
        if ((nameInputElement.value === "") || (comentInputElement.value === "")) {
            return;
        }
        addFormElement.classList.add("display-none");
        loadingElement.classList.remove("display-none");
        let answer = "Кажется, у вас сломался интернет, попробуйте позже";
        fetch("https://wedev-api.sky.pro/api/v1/:sofia-iakovleva/comments", {
            method: "POST",
            body: JSON.stringify({
                name: nameInputElement.value
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;"),
                text: comentInputElement.value
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")
                    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                    .replaceAll("QUOTE_END", "</div><br><br>,"),
                eachDate: takeDate(new Date),
                likes: 0,
                currentLike: false,
                classLike: 'like-button -no-active-like',
                isEdit: false,
                forceError: true,
            }),
        })
            // Подписываемся на успешное завершение запроса с помощью then
            .then((response) => {
                if (response.status === 500) {
                    throw new Error("Сервер сломался");
                } else if (response.status === 400) {
                    throw new Error("Плохой запрос");
                } else {
                    return response.json();
                }

            })
            .then(() => {
                return getArr(comments);
            })
            .then(() => {
                addFormElement.classList.remove("display-none");
                loadingElement.classList.add("display-none");
                nameInputElement.value = "";
                comentInputElement.value = "";
            })
            .catch((error) => {
                if (error.message === "Сервер сломался") {
                    alert("Сервер сломался, попробуйте позже");
                    clickButton()
                } else if (error.message === "Плохой запрос") {
                    alert("Имя и комментарий должны быть не короче 3 символов");
                } else {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                    console.log(error);
                }
                addFormElement.classList.remove("display-none");
                loadingElement.classList.add("display-none");
            });

        renderComments(listElement, getListComments);

    })
};
clickButton();


// Добавление обработчика ввода для input
addEventListener("input", () => {
    addButtonElement.classList.add("error");
    if ((nameInputElement.value !== "") && (comentInputElement.value !== "")) {
        addButtonElement.classList.remove("error");
    }
});

// Добавление элемента в список по нажатию Enter
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addButtonElement.click();
    }
});

// Удаление последнего комментари
endDeleteButtonElement.addEventListener("click", () => {

    const lastElement = listElement.lastElementChild;
    lastElement.remove();
});

console.log("It works!");
