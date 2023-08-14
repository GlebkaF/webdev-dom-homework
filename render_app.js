"use strict";
import { API_LINK, postTodo, getTodos } from "./modules/API_mod.js";
import { addDate } from "./modules/addDate.js";
import { takeCommentText } from "./modules/take_comment.js";
import { addLike, getLike } from "./modules/add_like.js";
import { delCommentElement } from "./modules/delete_comment.js";
import { renderLoging } from "./modules/renderLogin.js";
import { signup, signin } from "./modules/API_mod.js";
import { myName } from "./modules/API_mod.js";




export const renderAll = (login) => {
    function ereaseInput(input) {
        input.addEventListener('input', () => {
            input.classList.remove("error")
        })
    }
    const app = document.querySelector('.app');
    let PEOPLE = [];

    if (login) {
        app.innerHTML = ` <ul class="comments">
        </ul>
        <div class="add-form">Загрузка....</div>
        `

        const listComments = document.querySelector(".comments");



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
                    formItem.innerHTML = `<input
                    type="text"
                    id="add-form-name"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    disabled
                    value="${myName}"
                    />
                    <textarea
                    type="textarea"
                    id="add-form-text"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    wrap="soft"
                    maxlength="100"
                    
                    
                    ></textarea>
                    <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                    </div>`;
                    renderPeople();
                    addComment();
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
                            let inputSaveName = myName;
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
                            let inputSaveName = myName;
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
                        getTodos(API_LINK);
                        return responseData
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseData) => {
                        let inputSaveName = myName;
                        let inputSaveText = inputText.value;
                        PEOPLE = responseData.comments;
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
                        // renderPeople();
                        addComment();
                        // inputName.value = "";
                        // inputText.value = "";
                    })
                    .catch((error) => {
                        let errorMessage = `${error}`;
                        document.body.style.overflow = "hidden";
                        const popup = document.querySelector(".bg-container");

                        popup.innerHTML = `<div class="bg-modal"><div class="modal">
                        <div class="modal__header">
                            <button class="close-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M7.69217 6.28141L13.5161 0.45752L15.1797 2.12115L9.3558 7.94504L15.1797 13.7689L13.5161 15.4326L7.69217 9.60867L1.86828 15.4326L0.204651 13.7689L6.02854 7.94504L0.204651 2.12115L1.86828 0.45752L7.69217 6.28141Z"
                                        fill="#4F4F4F"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="modal__body">
                            <div class="modal__picture">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="43"
                                    height="43"
                                    viewBox="0 0 43 43"
                                    fill="none"
                                >
                                    <path
                                        d="M21.8304 39.3109C26.6548 39.3109 31.0225 37.3554 34.1841 34.1938C37.3457 31.0322 39.3013 26.6644 39.3013 21.84C39.3013 17.0156 37.3457 12.6479 34.1841 9.48624C31.0225 6.32464 26.6548 4.36914 21.8304 4.36914C17.006 4.36914 12.6382 6.32464 9.4766 9.48624C6.31499 12.6479 4.3595 17.0156 4.3595 21.84C4.3595 26.6644 6.31499 31.0322 9.4766 34.1938C12.6382 37.3554 17.006 39.3109 21.8304 39.3109Z"
                                        fill="#F5F5F5"
                                        stroke="#4F4F4F"
                                        stroke-width="2.99501"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M14.842 21.8404L20.0833 27.0816L30.5658 16.5991"
                                        stroke="#4F4F4F"
                                        stroke-width="2.99501"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <div class="modal__wrap-text-content">
                                <div class="modal__text-title">Уведомление!</div>
                                <div class="modal__text-main">
                                    ${errorMessage}
                                </div>
                            </div>
                        </div>
                        <button class="modal__btn-accept">ОК</button>
                    </div></div>`;

                        const btnPopup = document.querySelector(".modal__btn-accept");
                        const btnClosePop = document.querySelector(".close-btn");
                        btnPopup.addEventListener("click", () => {

                            popup.innerHTML = ``;
                            document.body.style.overflow = "overlay";
                        });
                        btnClosePop.addEventListener("click", () => {

                            popup.innerHTML = ``;
                            document.body.style.overflow = "overlay";
                        });
                        //todo: Отправлять в систему сбора ошибка
                    });
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
        // renderLoging();
        appPromise();
    } else {
        const listComments = document.querySelector(".comments");
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

        };
        const appPromise = () => {
            getTodos(API_LINK)
                .then((response) => {
                    return response;
                })
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    PEOPLE = responseData.comments;

                    renderPeople();
                    listComments.innerHTML += `<div class="start-form">Вы можете <span id="sign-in" class="menu">Войти</span></div>
        <div class="bg-container">`;

                    const sign_in = document.getElementById('sign-in');
                    sign_in.addEventListener('click', () => {
                        listComments.innerHTML = `
                    <div class="login-container">
                        <h2 class="login-title">Авторизация</h2>
                        <div class="login-form">
                            <label for="username" class="login-label">Логин:</label>
                            <input type="text" id="username" name="username" class="login-input" required>
                            <label for="password" class="login-label">Пароль:</label>
                            <input type="password" id="password" name="password" class="login-input" required>
                            <button type="submit" class="login-button" id="sign-inn">Войти</button>
                            <div>или</div>
                            <button type="submit" class="login-button" id="sign-upp">Присоединиться</button>
                        </div>
                    </div>`;
                        // ------------------------SIGN   IN ---------------------------------//
                        const signIn = document.getElementById('sign-inn');
                        const passInput = document.getElementById('password');
                        const nameInput = document.getElementById('username');
                        signIn.addEventListener('click', () => {
                            ereaseInput(nameInput);
                            ereaseInput(passInput);
                            signin(nameInput, passInput).then((flag) => {
                                if (flag) {
                                    renderAll(true)
                                }
                            });

                        })

                        const signUp = document.getElementById('sign-upp');
                        signUp.addEventListener('click', () => {
                            listComments.innerHTML = `
                            <div class="login-container">
                                <h2 class="login-title">Зарегистрироваться</h2>
                                <div class="login-form">
                                    <label for="username" class="login-label">Логин:</label>
                                    <input type="text" id="username" name="username" class="login-input" required>

                                    <label for="password" class="login-label">Пароль:</label>
                                    <input type="password" id="password" name="password" class="login-input" required>

                                    <label for="loginame" class="login-label">Имя</label>
                                    <input type="text" id="loginname" name="loginame" class="login-input" required>
                                    <button type="submit" class="login-button" id="sign-upp">Присоединиться</button>
                                </div>
                            </div>`;
                            const loginInput = document.getElementById('username');
                            const passInput = document.getElementById('password');
                            const nameInput = document.getElementById('loginname');
                            const signUp = document.getElementById('sign-upp');
                            signUp.addEventListener('click', () => {
                                signup(passInput.value, nameInput.value, loginInput.value).then((flag) => {
                                    if (flag) {
                                        renderAll(true)
                                    }
                                });

                            })





                        })
                    })

                });


        };

        appPromise()


    }

}