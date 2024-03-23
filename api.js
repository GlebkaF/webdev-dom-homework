import { sanitizeHtml } from './sanitizeHtml.js';

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

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
        headers: {
            Authorization: `Bearer ${token}`,
        },       
        body: JSON.stringify({
            text: sanitizeHtml(text),
            name: sanitizeHtml(name)   
        }),
    })    
};

export function login({login, password}) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,  
        }),

    }).then((response) => {
        return response.json();
    })   
};