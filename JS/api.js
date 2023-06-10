import { renderApp, token } from "./renderApp.js";
import { getCommentsList } from "./CommentsList.js";

const listElem = document.getElementById('list-comments');

export let newComments = [];
export let isInitialLoading = true;
export let isPosting = false;

const baseHost = "https://wedev-api.sky.pro/api/v2/freddy-krugliy/comments";

function getFromApi(data) {
    return fetch(baseHost, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return response.json();
        }
    }).then((responseData) => {
        data = responseData.comments;
        isInitialLoading = false;
        renderApp(data, listElem, getCommentsList);
        newComments = data;
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            alert("Сервер сломался, попробуйте позже");
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
        })
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Ошибка 400");
        } else if (response.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return response.json();
        }
    }).then((responseData) => {
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