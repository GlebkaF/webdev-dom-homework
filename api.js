import { now } from "./data.js";
export const getAllCommentsEdit = () => {
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
            return appComments;
        });
};

export const newComment = (name, text) => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/ramzil-khalimov/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
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
        return getAllCommentsEdit();
    })
};