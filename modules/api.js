export let token;
export const setToken = (newToken) => {
    token = newToken;
};
export let name;
export const setName = (newName) => {
    name = newName;
};
const host = "https://wedev-api.sky.pro/api/v2/elena-bersh/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";
const newUser = "https://wedev-api.sky.pro/api/user";

//2 шаг
export function getTodos() {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            //token = prompt("Введите верный пароль");
            //fetchAndRenderComments();
            throw new Error("Нет авторизации");
        } else if (response.status === 500) {
            alert("Сервер сломался, попробуйте позже");
            throw new Error("Сервер сломался");
        }
    });
}
// 3 шаг
export function postTodo({ text, name }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            // Проверка кода на 500 ошибку. POST-запрос будет в половине случаев отвечать 500-й ошибкой,
            // если в теле запроса передать параметр forceError: true
            //forceError: true,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 500) {
            alert("Сервер сломался, попробуйте позже");
            throw new Error("Сервер сломался");
        } else {
            // alert ставить перед throw, если поменять местами, то алёрт не показывает.
            alert(
                "Вы ввели меньше трёх символов в поле ввода имени или комментария. Введите, пожалуйста, заново.",
            );
            throw new Error("Имя или комментарий короче 3х символов");
        }
    });
}
export function login({ login, password }) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            alert("Введён неверный логин или пароль");
            throw new Error("Сервер сломался");
        }
    });
}
export function registration({ name, login, password }) {
    return fetch(newUser, {
        method: "POST",
        body: JSON.stringify({
            name,
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            alert("Пользователь с таким логином уже существует");
            throw new Error("Сервер сломался");
        }
    });
}
