import { replaceValue } from "/supportFunc.js";

const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");

const host = "https://webdev-hw-api.vercel.app/api/v2/marina-obruch/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login";

const fetchAndRenderTasks = () => {
    return fetch(host, {
        method: "GET"
    })
        .then((responseStart) => {
            return responseStart.json();
        })
};


// Добавляем новый комментарий в ленту с помощью POST
function postComment() {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            forceError: false,
            name: replaceValue(nameInputElement.value),
            text: replaceValue(commentInputElement.value)
                .replaceAll('START_QUOTE', '<div class="comment-quote">')
                .replaceAll('END_QUOTE', '</div>')
        })
    })
        .then((response) => {
            if (response.status === 201) { // Если всё работает
                comments = response;
            }
            else if (response.status === 400) { // Если введено меньше 3х символов
                throw new Error("Ошибка 400");
            }
            else if (response.status === 500) {
                throw new Error("Ошибка 500");
            }
            else { // Если падает API
                throw new Error("Сервер сломался");
            }
        })
}

function fetchLogin(login, password) {
    return fetch(loginHost, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    })
}

export { fetchAndRenderTasks, postComment, fetchLogin }