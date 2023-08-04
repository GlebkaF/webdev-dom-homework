"use strict";
import { formString, API_LINK, postTodo, getTodos } from "./modules/API_mod.js";
import { addDate } from "./modules/addDate.js";
import { takeCommentText } from "./modules/take_comment.js";
import { addLike, getLike } from "./modules/add_like.js";
import { delCommentElement } from "./modules/delete_comment.js";

const listComments = document.querySelector(".comments");

let PEOPLE = [];

const appPromise = () => {
    const formItem = document.querySelector(".add-form");
    getTodos(API_LINK)
        .then((response) => {
            formItem.innerHTML = `Загрузка...`;
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            PEOPLE = responseData.comments;
            formItem.innerHTML = formString;
            renderPeople();
            addComment();
            // promiseSend();
        });
};

function addComment() {
    const inputName = document.getElementById("add-form-name");
    const inputText = document.getElementById("add-form-text");
    const buttonSend = document.querySelector(".add-form-button");
    const formItem = document.querySelector(".add-form");
    buttonSend.addEventListener("click", (event) => {
        inputName.classList.remove("error");
        inputText.classList.remove("error");
        if (inputName.value.length === 0 && inputText.value.length === 0) {
            inputName.classList.add("error");
            return;
        }
        if (inputName.value.length === 0) {
            inputName.classList.add("error");
            return;
        }
        if (inputText.value.length === 0 && inputText.value.length === 0) {
            inputText.classList.add("error");
            return;
        }
        event.stopPropagation();

        postTodo(inputText.value, inputName.value, API_LINK)
            .then((response) => {
                if (response.status === 400) {
                    let inputSaveName = inputName.value;
                    let inputSaveText = inputText.value;
                    formItem.innerHTML = `<input
                type="text"
                id="add-form-name"
                class="add-form-name"
                placeholder="Введите ваше имя"
                value="${inputSaveName}"
                />
                <textarea
                type="textarea"
                id="add-form-text"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                rows="4"
                wrap="soft"
                maxlength="100"
                
                >${inputSaveText}</textarea>
                <div class="add-form-row">
                <button class="add-form-button">Написать</button>
                </div>`;
                    addComment();
                    throw new Error("Имя или текст короче 3х символов");
                }
                if (response.status === 500) {
                    let inputSaveName = inputName.value;
                    let inputSaveText = inputText.value;
                    formItem.innerHTML = `<input
                type="text"
                id="add-form-name"
                class="add-form-name"
                placeholder="Введите ваше имя"
                value="${inputSaveName}"
                />
                <textarea
                type="textarea"
                id="add-form-text"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                rows="4"
                wrap="soft"
                maxlength="100"
                
                >${inputSaveText}</textarea>
                <div class="add-form-row">
                <button class="add-form-button">Написать</button>
                </div>`;
                    addComment();
                    throw new Error("Сервер не отвечает, попробуйте еще раз.");
                }
                formItem.innerHTML = `Загрузка`;
                appPromise();
                return response;
            })
            .then((responseData) => {
                return getTodos(API_LINK);
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                PEOPLE = responseData.comments;
                formItem.innerHTML = formString;
                renderPeople();
                addComment();
                inputName.value = "";
                inputText.value = "";
            })
            .catch((error) => {
                alert(error);
                //todo: Отправлять в систему сбора ошибка
            });
        // promiseSend();
        // appPromise();
        // renderPeople();
    });
}

const renderPeople = () => {
    let render = PEOPLE.map((el, i) => {
        return `<li class="comment">
    <div class="comment-header">
      <div>${el.author.name}</div>
      <div>${addDate(el.date)}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text"  data-index="${i}">
        ${el.text}
      </div>
    </div>
    <div class="comment-footer">
    <button class="del-form-button" data-index="${i}">Удалить</button>
      <div class="likes">
        <div>
          <span class="likes-counter">${el.likes}</span>
          <button class="${getLike(el.isLiked)}" ></button></div>
      </div>
    </div>
  </li>`;
    }).join("");

    listComments.innerHTML = render;
    addLike(PEOPLE, renderPeople);
    takeCommentText(PEOPLE);
    delCommentElement(renderPeople);
};

appPromise();
addComment();
renderPeople();
