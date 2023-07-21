const commentURL = "https://wedev-api.sky.pro/api/v2/Volkov_Pavel/comments";
const loginURL = "https://wedev-api.sky.pro/api/user/login";
const userURL = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function getComments() {
    return fetch(commentURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался, попробуй позже");
            }
            else {
                return response.json();
            }
        })
}

export function postComment({ text, name }) {
    return fetch(commentURL, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: true,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Имя и комментарий должны быть не короче 3 символов');
        }
        else if (response.status === 500) {
            throw new Error('Сервер сломался, попробуй позже');
        }
        else {
            return response.json();
        }
    })

}

export function deleteComment({ id }) {
    return fetch(`${commentURL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (response.status === 201) {
            return response.json();
        }
        else {
            throw new Error('Неавторизованные пользователи не могут удалять комментарии');
        }
    })
}

export function likeComment({ id }) {
    return fetch(`${commentURL}/${id}/toggle-like`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        else {
            throw new Error('Неавторизованные пользователи не могут ставить лайки');
        }
    })
}

export function login({ login, password }) {
    return fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Введен неправильный логин или пароль');
            }
            else {
                return response.json();
            }
        })

}

export function registration({ name, login, password }) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Пользователь с таким логином уже сущетсвует');
            }
            else {
                return response.json();
            }
        })
}