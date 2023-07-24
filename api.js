

// Функция GET для API
const host = "https://wedev-api.sky.pro/api/v1/aleks-karmanov/comments";
const host2 = "https://wedev-api.sky.pro/api/v2/:aleks-karmanov/comments";

export let token;

export const setToken = (newToken) => {
    token = newToken;
};

export const getComments = () => {

    return fetch(host2, {
        method: "GET",
    })
        .then((response) => {

            if (response.status === 500) {
                // Код обработки ошибки
                throw response.status;
            }
            else {
                return response.json();
            }
        })


        .catch((error) => {
            if (error === 500) {
                alert("Сервер сломался, попробуй позже");
            }
            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
            console.warn(error);
        });

};

export const postComment = ({ fetchAndRenderComments }) => {

    const nameElement = document.querySelector('.add-form-name');
    const textElement = document.querySelector('.add-form-text');
    const commentLoadElement = document.querySelector('.comment-loader');
    const addFormElement = document.querySelector('.add-form');

    addFormElement.classList.add('disableLoader');
    commentLoadElement.classList.remove('disableLoader');

    return fetch(host2, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: textElement.value,
            name: nameElement.value,
            // forceError: false,
        })
    })
        .then((response) => {
            if ((response.status === 400) || (response.status === 500)) {
                // Код обработки ошибки
                throw response.status;

            }
            else {
                // return response.json();
                commentLoadElement.classList.add('disableLoader');
            }

        })
        .then(() => {

            addFormElement.classList.remove('disableLoader');

        })
        .then(() => {

            fetchAndRenderComments();
            // Очистка формы
            nameElement.value = "";
            textElement.value = "";
        })
        .catch((error) => {
            if (error === 400) {
                alert("Имя или текст содержат менее 3-х символов");
            }
            if (error === 500) {
                alert("Сервер сломался, попробуй позже");
            }
            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
            addFormElement.classList.remove('disableLoader');
            commentLoadElement.classList.add('disableLoader');
            // TODO: Отправлять в систему сбора ошибок
            console.warn(error);
        })
};


export function login({ login, password }) {
    const addFormCommentElement = document.querySelector('.add-form-comment');
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        // Проверка авторицазии
        if (response.status === 201) {
            addFormCommentElement.classList.remove('disableLoader');
            console.log(response);
        };
        if (response.status === 400) {
            alert("Введен не верный логин или пароль, попробуйте еще раз.");
        };

        return response.json();
    })
        .catch(() => {
            alert("Какая-то ошибка");
        })
}