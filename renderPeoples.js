import { renderLogin } from "./loginPage.js";
import { user } from "./api.js";
import { showAddingCommentMessage, hideAddingCommentMessage } from "./addingCommentMessage.js";
import { postComments } from './api.js';
import { fetchComments } from "./main.js";

export function renderPeoples(peoples) {
    // commentListElement.textContent = 'Загружаю список комментариев...';
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

        const form = `
        <div id="form-id" class="add-form">
            <input value=${user ? user.name : ""} readonly id="name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
            <textarea id="textArea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button id="add-button" class="add-form-button">Написать</button>
            </div>
        </div>`;

        const auth = '<p class="auth">Чтобы добавить комментарий, авторизуйтесь<p>';
        container.innerHTML = `${list} ${user ? form : auth} `;

        

        const commentListElement = document.getElementById('commentList');
        commentListElement.textContent = 'Загружаю список комментариев...';
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

    // НОВЫЙ КОММЕНТАРИЙ:

    // Определяем элементы input-формы
    const textInputElement = document.getElementById('textArea');
    const buttonElement = document.getElementById('add-button');
    const nameInputElement = document.getElementById('name');

    // Назначаем обработчик клика на кнопку добавления комментария
    buttonElement.addEventListener("click", () => {
        // Удаляем пробелы из значений полей ввода
        const trimmedName = nameInputElement.value.trim();
        const trimmedText = textInputElement.value.trim();

        nameInputElement.classList.remove("error");
        if (trimmedName === "") {
            nameInputElement.classList.add("error");
            return;
        };

        textInputElement.classList.remove("error");
        if (trimmedText === "") {
            textInputElement.classList.add("error");
            return;
        };

        // Показать текст "Добавляю твой комментарий..." и скрыть форму добавления комментария
        showAddingCommentMessage();
        
        // Отправляем POST-запрос для добавления нового комментария    
        postComments(
            trimmedText, 
            trimmedName
        )
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера');
            };

            if (response.status === 400) {
                throw new Error('Неверный запрос')
            };
        })
        .then(() => {
            // Получаем обновленный список комментариев, вызвав функцию fetchComments после успешного POST-запроса
        return fetchComments();               
        })
        .then(() => {
            // Очищаем поля ввода после отправки комментария только при успешном POST
            nameInputElement.value = "";
            textInputElement.value = "";
        })
        .catch((error) => {
            if (error.message === 'Ошибка сервера') {
            alert('Севрвер прилег отдохнуть, пробуй еще раз...');            
            } else if (error.message === 'Неверный запрос') {
                alert('Имя или комментарий короче 3-х символов');
                textInputElement.classList.add("error");
                nameInputElement.classList.add("error");
            } else {
                alert('Кажется, интернет прилег отдохнуть, проверь соединение...');
            };        
        })
        .finally(() => {
            // Скрыть текст "Добавляю твой комментарий..." и показать форму добавления комментария
            hideAddingCommentMessage();
            document.getElementById('form-id').style.display = 'flex'; // Показать форму добавления комментария
        });
    });

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
