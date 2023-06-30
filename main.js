
"use strict";

import { takeDate } from "./date.js";
import { fetchGet } from "./api.js";
import { fetchPOST } from "./api.js";
import renderComments from "./render.js";
import { getListComments } from "./listComments.js";



//  Поиск элментов


const listElement = document.getElementById("list");
const addFormElement = document.getElementById("add-form");
const appEL = document.getElementById("app")
let comments = [];

export { nameInputElement, comentInputElement };

function getArr(modulFetch) {
    return modulFetch()
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
                }
            });
            comments = appComments;
            return renderComments(appEL, getListComments, comments)
        })
        .then(() => {
            document.body.classList.add('loaded');
        });
};

getArr(fetchGet);

// Добавление возможности редактирования на каждый комент
const initiateRedact = () => {
    const redactButtons = document.querySelectorAll(".redact-button");
    for (const redactButton of redactButtons) {
        redactButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = redactButton.dataset.index;
            comments[index].isEdit = !comments[index].isEdit;
            renderComments(appEL, getListComments, comments);
        });

    }
    const saveButtons = document.querySelectorAll(".save-button");
    for (const saveButton of saveButtons) {
        saveButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = saveButton.dataset.index;
            comments[index].isEdit = !comments[index].isEdit;
            comments[index].text = saveButton.closest('.comment').querySelector('textarea').value
            renderComments(appEL, getListComments, comments);
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
                renderComments(appEL, getListComments, comments);
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

export { initlikeButtonsListeners, redactComments, initiateRedact };

// Рендерим из массива разметку
renderComments(appEL, getListComments, comments);

const loadingElement = document.querySelector(".loading");
console.log(loadingElement);
loadingElement.classList.add("display-none");

//Добавляем новый коммент на сервер
function postData(modulFetch) {
    return modulFetch()
        .then((response) => {
            return getArr(fetchGet);
        })
        .then(() => {
            addFormElement.classList.add("display-none");
            loadingElement.classList.remove("display-none");
            nameInputElement.value = "";
            comentInputElement.value = "";
        })
        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуйте позже");
                postData(fetchPOST);
            } else if (error.message === "Плохой запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
            } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                console.log(error);
            }
            addFormElement.classList.remove("display-none");
            loadingElement.classList.add("display-none");
        });
};

const addButtonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const comentInputElement = document.getElementById("coment-input");
// Добавить обработчик клика для добавления элемента
    addButtonElement.addEventListener("click", () => {

        //Добавляем валидацию
        if ((nameInputElement.value === "") || (comentInputElement.value === "")) {
            return;
        }
        addFormElement.classList.add("display-none");
        loadingElement.classList.remove("display-none");
        postData(fetchPOST);

        renderComments(appEL, getListComments, comments);

    });


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
const endDeleteButtonElement = document.getElementById("end-delete-button");
endDeleteButtonElement.addEventListener("click", () => {

    const lastElement = listElement.lastElementChild;
    lastElement.remove();
});

console.log("It works!");
