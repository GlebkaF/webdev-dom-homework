import { sanitizeHtml } from './sanitizeHtml.js';

export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
        method: "GET",
    })
    .then((response) => {
        if (response.status === 500) {
            throw new Error('Ошибка сервера');
        }        

        return response.json();
    })
};

export function postComments(text, name) {
    return fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
        method: "POST",
        body: JSON.stringify({
            text: sanitizeHtml(text),
            name: sanitizeHtml(name)   
        }),
    })    
};