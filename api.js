import { renderComments } from "./renderComments";

const host = "https://webdev-hw-api.vercel.app/api/v2/marina-obruch/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login";
const regHost = "https://wedev-api.sky.pro/api/user";

export function getFetch() {
    return fetch(host, {
        method: "GET"
    })
        .then((responseStart) => {
            return responseStart.json();
        })
};


export function postComment(commentInputElement, token) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: commentInputElement.value,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                console.log("Ошибка 400");
                throw new Error("Ошибка 400");
            }
            if (response.status === 500) {
                console.log("Ошибка 500");
                throw new Error("Ошибка 500");
            }
        })
}

export function fetchLogin(login, password) {
    return fetch(loginHost, {
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
    })
}

export function fetchRegistration(login, password, name) {
    return fetch(regHost, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Пользователь с таким логином уже сущетсвует");
        }
        return response.json();
    })
}

export function deleteComment(id) {
    return fetch("https://webdev-hw-api.vercel.app/api/v2/marina-obruch/comments/" + id, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k`,
        },
    }).then((response) => {
        return response.json();
    });
}