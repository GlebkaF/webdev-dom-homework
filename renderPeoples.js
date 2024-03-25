// Пишем функцию рендера для создания разметки

import { renderLogin } from "./loginPage.js";
import { user } from "./api.js";

// Определяем элементы input-формы
const textInputElement = document.getElementById('textArea');

export function renderPeoples(peoples) {
    const container = document.querySelector('.container');
    const list = '<ul id="commentList" class="comments"></ul>';

    
    const commentsHtml = peoples
        .map((people, index) => {
            return `
                <li data-index=${index} class="comment">
                    <div class="comment-header">
                        <div>${people.name}</div>
                        <div>${people.time}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${people.text
                            .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                            .replaceAll("END_QUOTE%", "</div>")}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${people.likes}</span>
                            <button data-index=${index} class="like-button ${people.isLiked ? 'active-like' : ''}"></button>
                        </div>
                    </div>
                </li>`;
        })
        .join("");

        const form = `<div id="form-id" class="add-form">
        <input value=${user ? user.name : ""} readonly id="name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
        <textarea id="textArea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
        </div>
        </div>`

        const auth = '<p class="auth">Авторизуйтесь<p>';
        container.innerHTML = `${list} ${user ? form : auth} `;

        

        const commentListElement = document.getElementById('commentList');

        commentListElement.innerHTML = commentsHtml;

        if (!user) {
            const authButton = document.querySelector('.auth');
            authButton.addEventListener('click', () => {
                renderLogin();            
            })
        };





        // Красим кнопку лайка и увеличиваем счетчик
        for (let button of document.querySelectorAll(".like-button")) {
        button.addEventListener("click", (event) => { 
            event.stopPropagation();
            const index = event.currentTarget.dataset.index;    
            const currentPeople = peoples[index];                    

            if (currentPeople.isLiked) {
                currentPeople.likes--;
            } else {
                currentPeople.likes++;
            };

            currentPeople.isLiked = !currentPeople.isLiked;

            renderPeoples(peoples);
        });
    };

    // Ответ на комментарий
    for (const commentElement of document.querySelectorAll(".comment")) {
        commentElement.addEventListener("click", (event) => {
            const index = event.currentTarget.dataset.index;
            const currentPost = peoples[index];

            textInputElement.value = `%BEGIN_QUOTE${currentPost.text} : ${currentPost.name}END_QUOTE%`;
            textInputElement.style.whiteSpace = 'pre-line';
        });
    };
};
