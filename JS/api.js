import { renderComments } from "./renderComments.js";
import { getCommentsList } from "./CommentsList.js";

const listElem = document.getElementById('list-comments');
const commentAddedElem = document.querySelector('.comment-added');
const addFormElem = document.querySelector('.add-form');


function getFromApiFirstTime(data, loadingElem) {
    loadingElem.style.display = 'block';

    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "GET",
    }).then((responce) => {
        loadingElem.style.display = 'none';

        if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return responce.json();
        }
    }).then((responceData) => {
        data = responceData.comments;
        renderComments(data, listElem, getCommentsList);
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            console.log("Сервер сломался, попробуй позже"); // ВЕРНУТЬ ОБРАТНО НА АЛЕРТ!!!
        } else {
            console.log(error);
            console.log("Кажется, у вас сломался интернет, попробуйте позже"); // ВЕРНУТЬ ОБРАТНО НА АЛЕРТ!!!
        };
    })
};


function getFromApi(data) {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "GET",
    }).then((responce) => {
        if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return responce.json();
        }
    }).then((responceData) => {
        data = responceData.comments;
        renderComments(data, listElem, getCommentsList);
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            alert("Сервер сломался, попробуй позже");
        } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};


function changeMessageToAddForm() {
    addFormElem.style.display = 'block';
    commentAddedElem.style.display = 'none';
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
    addFormElem.style.display = 'none';
    commentAddedElem.style.display = 'block';

    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "POST",
        body: JSON.stringify({
            text: escapeHtml(addCommentElem.value.trim()),
            name: escapeHtml(addNameElem.value.trim()),
            forceError: true,
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
        return getFromApi(data);
    }).then(() => {
        changeMessageToAddForm();
        addNameElem.value = '';
        addCommentElem.value = '';
    }).catch((error) => {
        if (error.message === "Ошибка 400") {
            console.log(error);
            changeMessageToAddForm();
            alert("Имя и комментарий должны быть не короче 3 символов");
        } else if (error.message === "Ошибка 500") {
            console.log(error);
            changeMessageToAddForm();
            // alert("Сервер сломался, попробуй позже");
            postToApi();
        } else {
            changeMessageToAddForm();
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};



export { getFromApiFirstTime, getFromApi, postToApi };