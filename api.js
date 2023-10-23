import { sanitizeHtml } from "./helper.js";

export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/tanya-zakharova/comments", {
        method: "GET"
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Кажется, что-то пошло не так, попробуйте позже`);
            }
        })
}

export function postComment({ text, name }) {
    return fetch("https://wedev-api.sky.pro/api/v1/tanya-zakharova/comments", {
        method: "POST",
        body: JSON.stringify({
            text: sanitizeHtml(text),
            name: sanitizeHtml(name),
            forceError: true,
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error(`Ошибка сервера`);
            } else if (response.status === 400) {
                throw new Error(`Имя и комментарий должны быть не короче 3х символов`);
            } else {
                return response.json();
            }
        })
}