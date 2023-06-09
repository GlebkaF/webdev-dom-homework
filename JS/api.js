import { renderApp } from "./renderApp.js";
import { getCommentsList } from "./CommentsList.js";

const listElem = document.getElementById('list-comments');

export let newComments = [];
export let isInitialLoading = true;
export let isPosting = false;

const baseHost = "https://wedev-api.sky.pro/api/v2/freddy-krugliy/comments";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";


function getFromApi(data) {
    return fetch(baseHost, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    }).then((responce) => {
        if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return responce.json();
        }
    }).then((responceData) => {
        data = responceData.comments;
        isInitialLoading = false;
        renderApp(data, listElem, getCommentsList);
        newComments = data;
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            alert("Сервер сломался, попробуй позже");
        } else {
            console.log(error);
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};


function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("$", "&#36");
};


function postToApi(data, addCommentElem, addNameElem) {

    return fetch(baseHost, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            text: escapeHtml(addCommentElem.value.trim()),
            name: escapeHtml(addNameElem.value.trim()),
            // forceError: true,
        })
    }).then((responce) => {
        if (responce.status === 400) {
            throw new Error("Ошибка 400");
        } else if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            console.log(responce.status);
            return responce.json();
        }
    }).then((responceData) => {
        getFromApi(data);
    }).then(() => {
        isPosting = true;
        renderApp(data, listElem, getCommentsList);
        addNameElem.value = '';
        addCommentElem.value = '';
        isPosting = false;
    }).catch((error) => {
        if (error.message === "Ошибка 400") {
            console.log(error);
            alert("Имя и комментарий должны быть не короче 3 символов");
        } else if (error.message === "Ошибка 500") {
            console.log(error);
            postToApi(data, addCommentElem, addNameElem);
        } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};



export { getFromApi, postToApi };