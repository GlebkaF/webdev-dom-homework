// Импорты
import { delay, replaceValue, correctDate } from "./supportFunc.js";
import { fetchAndRenderTasks, postComment } from "./api.js";

// Переменные
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

// КОД
let comments = [];
let isWaitingComment = false;

// Функция render
const renderComments = () => {
    const appEl = document.getElementById("app");

    if (!token) {
        const appHtml = `
      <div class="registration">
        <div class="add-form">
          <h3>Форма ввода</h3>
          <div class="reg-input">
            <input type="text" id="add-login" class="add-login" placeholder="Введите логин" />
            <input type="text" id="add-password" class="add-password" placeholder="Введите пароль"></input>
          </div>
          <div class="add-reg-form">
            <button type="button" id="in-button" class="in-button">Войти</button>
            <button class="reg-button">Зарегистрироваться</button>
          </div>
        </div>
      </div>
      `;
        appEl.innerHTML = appHtml;

        document.getElementById("in-button").addEventListener("click", () => {
            token =
                "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
            fetchAndRenderTasks(token, isWaitingComment, comments);
        })
        return;
    }
    // В процессе клик на кнопку ввода
    // document.getElementById("in-button").addEventListener("click", () => {
    //     const login = document.getElementById("add-login").value;
    //     const password = document.getElementById("add-password").value;
    //     if (!login) {
    //         alert("Введите логин");
    //         return;
    //     }

    //     if (!password) {
    //         alert("Введите пароль");
    //         return;
    //     }
    //     loginUser();
    // })

    const commentHTML = comments
        .map(comment => {
            return `
          <li id="comment" class="comment">
          <div class="comment-header">
            <div id="name">${comment.author.name}</div>
            <div id="date">${correctDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button id="like-button" class="like-button
              ${comment.isLiked ? '-active-like' : ''}
              ${comment.isLikeLoading ? '-loading-like' : ''}">
              </button>
            </div>
          </div>
        </li>`
        }).join("");


    const appHtml = `<div class="container">
            <ul id="comments" class="comments">
              ${commentHTML}
            </ul>
            <div class="add-form">
              <input type="text" id="add-form-name" class="add-form-name" placeholder="Введите ваше имя" />
  
              <textarea type="textarea" id="add-form-text" class="add-form-text" placeholder="Введите ваш коментарий"
                rows="4"></textarea>
  
              <div class="add-form-row">
                <button type="button" id="add-form-button" class="add-form-button" disabled>Написать</button>
                <button class="remove-form-button">Удалить последний</button>
              </div>
            </div>
            <p class="add-waiting hidden">Комментарий добавляется...</p>
          </div>
          `

    // initLikeButtons();

    appEl.innerHTML = appHtml;

    // Переменные
    const addCommentForm = document.querySelector(".add-form");
    const buttonElement = document.querySelector(".add-form-button");
    const listOfComments = document.querySelector(".comments");
    const nameInputElement = document.querySelector(".add-form-name");
    const commentInputElement = document.querySelector(".add-form-text");
    const constWaitingComment = document.querySelector('.add-waiting');
    const startingElement = document.querySelector('.starting');

    // валидация на ввод
    buttonElement.addEventListener('click', () => {
        function clickButton() {
            // nameInputElement.classList.remove("error");
            // if (nameInputElement.value === "") {
            //     nameInputElement.classList.add("error");
            //     return;
            // }

            // commentInputElement.classList.remove("error");
            // if (commentInputElement.value === "") {
            //     commentInputElement.classList.add("error");
            //     return;
            // }
            // constWaitingComment.classList.remove('hidden');
            // addCommentForm.classList.add('hidden');
            token =
                "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
            fetchAndRenderTasks(token, isWaitingComment, comments);
        }
        clickButton();

        postComment(token, nameInputElement, commentInputElement, addCommentForm, constWaitingComment);
    });

    // валидация на ввод (неактивная кнопка "Написать")
    nameInputElement.addEventListener('input', () => {
        if (nameInputElement.value) {
            buttonElement.disabled = false;
            return;
        } else {
            buttonElement.disabled = true;
            return;
        }
    });

    commentInputElement.addEventListener('input', () => {
        if (commentInputElement.value) {
            buttonElement.disabled = false;
            return;
        } else {
            buttonElement.disabled = true;
            return;
        }
    });

    // Запрос на авторизацию (в процессе)
    // const loginUser = ({ login, password }) => {
    //     return fetch("https://wedev-api.sky.pro/api/user/login", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             login,
    //             password,
    //         }),
    //     }).then((response) => {
    //         if (response.status === 400) {
    //             throw new Error("Неверный логин или пароль");
    //         }
    //         return response.json();
    //     });
    // };

}

fetchAndRenderTasks(token, isWaitingComment, comments);
renderComments();

export { renderComments };