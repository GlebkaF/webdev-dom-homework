import { fetchAndRenderTasks, postComment } from "/api.js";
import { renderComments } from "/renderComments.js";


// // ОСТАВИТЬ
//     const appHtml = `<div class="container">
//             <ul id="comments" class="comments">
//               ${commentHTML}
//             </ul>
//             <div class="add-form">
//               <input type="text" id="add-form-name" class="add-form-name" placeholder="Введите ваше имя" />

//               <textarea type="textarea" id="add-form-text" class="add-form-text" placeholder="Введите ваш коментарий"
//                 rows="4"></textarea>

//               <div class="add-form-row">
//                 <button type="button" id="add-form-button" class="add-form-button" disabled>Написать</button>
//                 <button class="remove-form-button">Удалить последний</button>
//               </div>
//             </div>
//             <p class="add-waiting hidden">Комментарий добавляется...</p>
//           </div>

//           <div class="registration">
//           <div class="add-form">
//             <h3>Форма ввода</h3>
//             <div class="reg-input">
//               <input type="text" id="add-login" class="add-login" placeholder="Введите логин" />
//               <input type="text" id="add-password" class="add-password" placeholder="Введите пароль"></input>
//             </div>
//             <div class="add-reg-form">
//               <button type="button" id="in-button" class="in-button">Войти</button>
//               <button class="reg-button">Зарегистрироваться</button>
//             </div>
//           </div>
//         </div>
//           `

//     appEl.innerHTML = appHtml;

// Определение переменных

const buttonElement = document.querySelector(".add-form-button");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");


// Данные о комментариях и маркеры для лоадингов/загрузки
let comments = [];

let isLoading = true;
let isWaitingComment = false;

fetchAndRenderTasks()
    .then((startJson) => {
        comments = startJson.comments;
        isWaitingComment = false;
        isLoading = false;

        renderComments(isLoading, isWaitingComment, comments);
    });

fetchAndRenderTasks();


// функция клик addEventListener на добавление комментария
buttonElement.addEventListener('click', () => {
    // валидация на ввод
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }

    commentInputElement.classList.remove("error");
    if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }

    // Инициализация лоадинга при добавлении комментария
    isWaitingComment = true;
    renderComments(isLoading, isWaitingComment, comments);

    postComment(nameInputElement, commentInputElement)
        .then(() => {
            nameInputElement.value = "";
            commentInputElement.value = "";
            isWaitingComment = false;
            renderComments(isLoading, isWaitingComment, comments);
        })
        .catch((error) => {
            if (error.message === "Ошибка 400") {
                console.log("Ошибка 400");
                alert("Имя и комментарий должны быть не короче 3 символов");
                return fetchAndRenderTasks();
            }
            else if (error.message === "Ошибка 500") {
                console.log("Ошибка 500");
                alert("Сервер сломался, попробуй позже");
                return fetchAndRenderTasks();
            }

            else {
                isWaitingComment = false;
                renderComments(isLoading, isWaitingComment, comments);
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
        });
    renderComments(isLoading, isWaitingComment, comments);
});

renderComments(isLoading, isWaitingComment, comments);