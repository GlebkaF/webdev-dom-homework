import { now } from "./data.js";
import { renderComments } from "./render.js";
import { comments } from "./main.js";
import { textElement, nameElement } from "./main.js";

export const getAllComments = (comments) => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/ramzil-khalimov/comments", {
        method: "GET",
        forceError: false,
    })
        .then((response) => {
            if (response.status === 200) {
            };
            if (response.status === 500) {
                throw new Error("Ошибка сервера");
            };
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
            });
            comments = appComments;
            renderComments(comments);
        });
};

export const newComment = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/ramzil-khalimov/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameElement.value,
            text: textElement.value,
            forceError: false,
        })
    }).then((response) => {
        if (response.status === 201) {
        };
        if (response.status === 500) {
            throw new Error("Ошибка сервера");
        }
        if (response.status === 400) {
            throw new Error("Неверный запрос");
        }
        return response.json();
    }).then((responseData) => {
        return getAllComments(comments);
    }).then(() => {
        // buttonElement.disabled = false;
        // buttonElement.textContent = "Написать";
        // addHidden.style.display = "block";
        nameElement.value = "";
        textElement.value = "";
    }).catch((error) => {
        if (error.message === "Ошибка сервера") {
            alert("Сервер сломался, попробуй позже");
            return;
        };
        if (error.message === "Неверный запрос") {
            alert("Имя и комментарий должны быть не короче 3 символов");
            return;
        } else {
            alert("У вас проблемы с интернетом");
            return;
        };

    })
};