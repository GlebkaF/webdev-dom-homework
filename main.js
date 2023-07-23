// Это корневой модуль JS
import { getTodo } from "./api.js";
import { renderUserComments } from './renderComments.js';

export let users = []; // Массив с комментариями
export function updateUsers(comments) {
    users = comments;
}

export const fetchTodosAndRender = () => {
    return getTodo().then((responseData) => {
        // console.log(responseData);
        // users = responseData.todos;
        // renderUserComments();
    });
};

// Закрашиваем кнопку лайка
export const initLikeButton = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const likeButtonIndex = likeButtonElement.dataset.index;
            const listElement = users[likeButtonIndex];

            if (listElement.isLiked) {
                listElement.likes -= 1;
                listElement.isLiked = false;
                listElement.colorLike = 'no-active-like';
            } else {
                listElement.likes += 1;
                listElement.isLiked = true;
                listElement.colorLike = '-active-like';
            }
            renderComments();
        });
    };
};
initLikeButton();

// Получаем список комментов с помощью функции fetch и метода запросов GET и 
// после получения комментов отрисовываем страницу с помощью рендер функции renderUserComments()
getTodo().then(() => renderUserComments()); // Сначала идет запрос комментов и после получения данных из API происходит рендер, реализовано через then чтоб рендер не срабатывал раньше GET запроса

// Добавляем ответ цитатой
const commentText = () => {
    const commentTextElements = document.querySelectorAll('.comment');
    for (const commentTextElement of commentTextElements) {
        commentTextElement.addEventListener("click", () => {
            const commTextElem = commentTextElement.querySelector('.comment-text')
            const nameTextElem = commentTextElement.querySelector('.comment-name')
            enterCommentElement.value = (` ${commTextElem.innerHTML} ${nameTextElem.innerHTML}`);
            renderComments();
        });
    };
};
commentText();