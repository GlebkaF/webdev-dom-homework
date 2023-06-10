import { now } from "./data.js";

const baseHost = "https://wedev-api.sky.pro/api/v2/ramzil-khalimov/comments"

export const getAllComments = () => {
    const token = localStorage.getItem('token');
    return fetch(baseHost, {
        method: "GET",
        forceError: false,
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: now(comment.date),
                    text: comment.text,
                    like: comment.likes,
                    isLiked: false,
                };
            })
            return appComments;
        });
};

export const newComment = (text) => {
    const token = localStorage.getItem('token');
    return fetch(baseHost, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            forceError: false,
        }),
        headers: {
            Authorization: token,
        }
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Ошибка сервера");
        }
        if (response.status === 400) {
            throw new Error("Неверный запрос");
        }
        return response.json();
    })
};
export function registerUser({ login, password, name }) {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Такой пользователь уже существует");
        }
        return response.json();
    });
}

export function loginUser({ login, password }) {
    return fetch(" https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
        }
        return response.json();
    }).then((user) => {
        localStorage.setItem('token', `Bearer ${user.user.token}`);
        localStorage.setItem('user', user.user.name);
    });

}
export const isUserAuthorization = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}