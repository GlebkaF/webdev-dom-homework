import { fetchAndRenderTasks, fetchPromise } from './api.js';
import { renderUsersComments } from "./render.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const inputNameElement = document.getElementById("name");
const inputTextElement = document.getElementById("comment-text");
const addForm = document.getElementById("add-form-block");
let currenDate = new Date();


// GET-запрос связка данных с сервером с помощью API


let usersComments = [
    // {
    //   date: "12.02.22 12:18",
    //   likes: 3,
    //   isLiked: false,
    //   text: "Это будет первый комментарий на этой странице",
    //   name: "Глеб Фокин",
    // },
    // {
    //   name: "Варвара Н.",
    //   comment: "Мне нравится как оформлена эта страница! ❤",
    //   time: "13.02.22 19:22",
    //   likes: 75,
    //   isLiked: false,
    // },
];

// Рендер-функция 


fetchAndRenderTasks();
renderUsersComments(usersComments, listElement);

// Плохая функция добавления лайка 

// function toggleLike(event) {
//   const likeHeart = event.target;
//   const likeCount = event.target.previousElementSibling;
//   let count = parseInt(likeCount.innerText);
//   let liked = likeHeart.classList.contains('liked');
//   if (liked) {
//     count--;
//     liked = false;
//     likeHeart.classList.remove('liked');
//   } else {
//     count++;
//     liked = true;
//     likeHeart.classList.add('liked');
//   }
//   likeCount.innerText = count;
// }

// listElement.addEventListener('click', function (event) {
//   if (event.target.matches('.like-button')) {
//     toggleLike(event);
//   }
// });

//Хорошая функция добавления лайка с использованием stopPropagation

function toggleLike() {

    const likeButtons = document.querySelectorAll('.like-button');
    addCommentReplyHandlers();

    for (const button of likeButtons) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            const index = button.dataset.index;
            if (usersComments[index].isLiked) {
                usersComments[index].likes--
            } else {
                usersComments[index].likes++
            }

            usersComments[index].isLiked = !usersComments[index].isLiked;
            renderUsersComments(usersComments, listElement);
        })
    }
};


// Функция отключения кнопки "написать" при незаполненных input

function checkCommentFields() {

    function togglePublishButton(buttonElement) {
        if (inputNameElement.value.trim() === "" || inputTextElement.value.trim() === "") {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }

    inputNameElement.addEventListener('input', togglePublishButton);
    inputTextElement.addEventListener('input', togglePublishButton);
}

// Функция для ответа на комментарий

function addCommentReplyHandlers() {
    const commentElements = document.querySelectorAll(".comment");

    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", (event) => {
            const author = commentElement.querySelector(".comment-header div:first-child").textContent;
            const text = commentElement.querySelector(".comment-text").textContent;

            inputTextElement.value = `>${text.trim()}\n@${author}, `;
            inputTextElement.focus();
        });
    }
}

toggleLike();
checkCommentFields();
addCommentReplyHandlers();

listElement.innerHTML = 'Пожалуйста, подождите, загружаю комментарии...';

// Обработчик клика на кнопку "написать"

buttonElement.addEventListener("click", () => {

    // Условное ветвление для проверки заполненности input

    inputNameElement.classList.remove('error');
    inputTextElement.classList.remove('error');
    buttonElement.classList.remove('error-button');

    if (inputNameElement.value === "" && inputTextElement.value === "") {
        inputNameElement.classList.add('error');
        inputTextElement.classList.add('error');
        buttonElement.classList.add('error-button');
        return;
    } else if (inputNameElement.value === " " || inputTextElement.value === "") {
        inputTextElement.classList.add('error');
        buttonElement.classList.add('error-button');
        return;
    } else if (inputNameElement.value === "" || inputTextElement.value === " ") {
        inputNameElement.classList.add('error');
        buttonElement.classList.add('error-button');
        return;
    }

    // Функция текущей даты и времени

    function formatDateTime(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const timeString = hours + ':' + minutes;
        const formatedDate = `${day}.${month}.${year} ${timeString}`;
        return formatedDate;
    }

    const currentDate = new Date();
    formatDateTime(currentDate);

    // Пуш комментариев пользователя в массив с заменой html символов 

    // usersComments.push({
    //   name: inputNameElement.value
    //     .replaceAll("&", "&amp;")
    //     .replaceAll("<", "&lt;")
    //     .replaceAll(">", "&gt;")
    //     .replaceAll('"', "&quot;"),
    //   comment: inputTextElement.value
    //     .replaceAll("&", "&amp;")
    //     .replaceAll("<", "&lt;")
    //     .replaceAll(">", "&gt;")
    //     .replaceAll('"', "&quot;"),
    //   time: formatDateTime(currentDate),
    //   likes: 0,
    //   isLiked: false,
    // });

    // Получение новых комментов на сервер с помощью API

    checkCommentFields();
});

