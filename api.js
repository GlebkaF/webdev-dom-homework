import { formatDate } from "./Date.js";
import { renderCommentsMod } from "./main.js";
import { nameInputElement } from "./main.js";
import { commentInputElement } from "./main.js";





export const getAllComments = (comments) => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/max-kyrtimov/comments", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatDate(comment.date),
                    text: comment.text,
                    active: false,
                    like: comment.likes,
                }
            });
            comments = appComments;
            renderCommentsMod();
            // invisibleDivHead.classList.add('hidden');
        });
};

// export {getAllComments};
export const finComments = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/max-kyrtimov/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
            forceError: false,
        }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                // alert("Имя и комментарий должны быть не короче 3 символов");
                throw new Error("Неверный запрос")
                // addFormLoad.classList.add('hidden');
                // return Promise.reject("Имя и комментарий должны быть не короче 3 символов");

            } else if (response.status === 500) {
                // alert('Сервер не доступен, попробуй позже...');
                throw new Error("Ошибка сервера")
                // throw new Error("Сервер совсем упал");
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
            buttonElemtnt.disabled = true;
        })
        .catch((error) => {
            // alert("Кажется, у вас сломался интернет, попробуйте позже");
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