import { formatDate } from "./Date.js";
import { renderComments} from "./render.js";
// import { commentInputElement} from "./render.js";
// import {comments} from "./render.js";
// import { nameInputElement  } from "./render.js";
// import { comments, nameInputElement } from "./main.js";
// import { commentInputElement } from "./main.js";

const host = "https://webdev-hw-api.vercel.app/api/v1/max-kyrtimov/comments";
const host2 = "https://wedev-api.sky.pro/api/v2/max-kyrtimov/comments";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export const getAllComments = (comments) => {
    return fetch(host2, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            // if(response.status === 401) {
            //     password = prompt("Введите верный пароль");
            //     throw new Error("Нет авторизации");
            // }
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatDate(new Date(comment.date)),
                    text: comment.text,
                    active: false,
                    like: comment.likes,
                }
            });
            comments = appComments;
            renderComments(comments);
            // invisibleDivHead.classList.add('hidden');
        });
};

export const finComments = () => {
    fetch(host2, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            forceError: false,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error("Неверный запрос")
            } else if (response.status === 500) {
                throw new Error("Ошибка сервера")
            } else {
                alert("отсутствует интернет")
            }
        })
        .then((responseData) => {
            return getAllComments(comments);
        })
        .then((data) => {
            // addFormLoad.classList.remove('hidden');
            // invisibleDiv.classList.add('hidden');
            nameInputElement.value = "";
            commentInputElement.value = "";
            // buttonElemtnt.disabled = true;
        })
        .catch((error) => {
            // addFormLoad.classList.add('hidden');
            //TODO: Отправлять с систему сбора ошибок
            if (error.message === "Ошибка сервера") {
                alert('Сервер не доступен, попробуй позже...');
                return;
            };
            if (error.message === "Неверный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                return;
            } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже")
            }
            console.warn(error);
        })
        .then((data) => {
            // addFormLoad.classList.remove('hidden');
            // invisibleDiv.classList.add('hidden');
        })
};
// // export { getAllComments, finComments };