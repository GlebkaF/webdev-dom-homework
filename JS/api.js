import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { getCommentsList } from "./CommentsList.js";


function getFromApiFirstTime(data, loadingElem, render) {
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
        render;
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


function getFromApi() {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "GET",
    }).then((responce) => {
        if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return responce.json();
        }
    }).then((responceData) => {
        comments = responceData.comments;
        renderComments(listElem, getCommentsList);
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            alert("Сервер сломался, попробуй позже");
        } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};


function postToApi() {
    addFormElem.style.display = 'none';
    commentAddedElem.style.display = 'block';

    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "POST",
        body: JSON.stringify({
            text: escapeHtml(addComment.value.trim()),
            name: escapeHtml(addName.value.trim()),
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
        return getFromApi();
    }).then(() => {
        changeMessageToAddForm();
        addName.value = '';
        addComment.value = '';
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