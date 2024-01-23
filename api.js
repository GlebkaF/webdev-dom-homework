/* import { fetchAndRenderComments, commentList } from "./main.js";
import { addComment, renderComments } from "./render.js"; */
let urlApi = "https://wedev-api.sky.pro/api/v1/zenin-dmitry/comments";
let urlApiLogin = "https://wedev-api.sky.pro/api/user/login";

export let token = localStorage.getItem("token");
console.log(token);
export const setToken = (newToken) => {
     token = newToken;
};


export const getToken = () => {
    return token;
};



//GET запрос авторизации на получение токена
export function getComments() {
    return fetch(urlApi, {
        method: "GET",
        headers: {
            Authorization: setToken(),
        },
    }).then((response) => {
        if (response.status === 401) {
            throw new Error("Вы не авторизованы");
        }
        return response.json();
    })
};


//POST запрос авторизации и токена
export const postComment = (text) => {
    console.log("conslole", text);
    return fetch(urlApi,
        {
            method: 'POST',
            headers: {
                Autorization: setToken(),
            },
            body: JSON.stringify({
                /* name: name, */
                text: text,
                /*       date: formatDateTime(new Date),
                      isLiked: false,
                      likes: 0, */
                /* forceError: true, */
            }),
        })
};

export function loginPost({ login, password}) {
    return fetch(urlApiLogin,
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then((response) => {
            if (response.status === 201) {
                console.log("комменты отрисовались?");
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Некорректные логин\пароль 400");
            }
            if (response.status === 500) {
                return Promise.reject("ошибка сервера");
            }
            return Promise.reject("Отсутствует соединение");
        }).catch((error) => {
            alert(error);
            console.warn(error);
        }) 

};
