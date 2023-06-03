

export const buttonElement = document.getElementById('add-button');
export const listElement = document.getElementById("list");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
export const comment = document.getElementsByTagName('li');
export const deleteFormButtonElement = document.getElementById("delete-form-button");
export const commentsLoad = document.querySelector(".comments-load");

import { fetchGet, fetchPost, commentaries } from "./api.js";
import renderComments from "./render.js";
import { getComments } from "./comments.js";
import  initLikeButtonListeners  from "./like.js";

fetchGet();


deleteFormButtonElement.addEventListener("click", () => {
    commentaries.pop();
    renderComments(listElement, getComments);
    initLikeButtonListeners();
    
});

buttonElement.addEventListener("click",() => {
    fetchPost();
    initLikeButtonListeners();
    nameInputElement.classList.remove("error");
    buttonElement.classList.remove("disabled");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        buttonElement.classList.add("disabled");
        return;
    };
    commentInputElement.classList.remove("error");
    if (commentInputElement.value === '') {
        commentInputElement.classList.add("error");
        buttonElement.classList.add("disabled");
        return;
    };
});


initLikeButtonListeners();