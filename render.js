import { commentsList } from "./script.js";
import { initLikesButton } from "./like-button.js";
import { addReply } from "./add-reply.js";
import { container } from "./script.js";
import { appComments, token } from "./api.js";

export const renderComments = (comm) => {
    if (!token) {
        const appHtml = 
        `<div class="login-form">
            <input
            type="text"
            class="login-input"
            placeholder="Логин"
            />
            <input
            type="password"
            class="password-input"
            placeholder="Пароль"
            />
            <button class="login-button">Войти</button>
            </div>`
    
        container.innerHTML = appHtml;

        const loginButton = document.querySelector('.login-button');
        console.log(loginButton);
        loginButton.addEventListener('click', () => {
            
            token = 'token';
            renderComments(appComments);
        })

        return;
    }

    const commentsHtml = comm.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
            <div>${comment.name.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")} </div>
            <div>${comment.date} </div>
        </div>
        <div class="comment-body"> 
            <div class="comment-text">
            ${comment.text.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
                .replaceAll('QUOTE_END', "</div>")
            }
        <button class="edit-button" data-index="${index}">Редактировать</button>
            </div>
        </div>
        <div class="comment-footer"> 
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.likeStatus}" data-index="${index}"</button>
            </div>
        </div> 
    </li>`
    }).join("");

    const appHtml = 
    `<div class="login-form">
        <input
        type="text"
        class="login-input"
        placeholder="Логин"
        />
        <input
        type="password"
        class="password-input"
        placeholder="Пароль"
        />
        <button class="login-button">Войти</button>
        </div>

        <ul class="comments">
        ${commentsHtml}
        </ul>

        <div class="add-form">
        <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        />
        <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
        ></textarea>
        <div class="add-form-row">
        <button class="remove-form-button">Удалить последний комментарий</button>
        <button class="add-form-button">Написать</button>
        </div>
    </div>`

    container.innerHTML = appHtml;

    initLikesButton();
    addReply();
}