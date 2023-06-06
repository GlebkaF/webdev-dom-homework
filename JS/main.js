"use strict";
import { getFromApiFirstTime, postToApi } from "./api.js";
import { renderComments } from "./renderComments.js";
import { getCommentsList } from "./CommentsList.js";
import { newComments } from "./api.js";

const listElem = document.getElementById('list-comments');
const commentBtn = document.getElementById('form-add-button');
const addName = document.getElementById('add-name');
const addComment = document.getElementById('add-comment');
const loadingComments = document.querySelector('.loading');


getFromApiFirstTime(newComments, loadingComments);
renderComments(newComments, listElem, getCommentsList);


const addNewComment = () => {
    commentBtn.addEventListener("click", () => {
        addName.classList.remove("error");
        addComment.classList.remove("error");

        if (addName.value.trim() === '') {
            return addName.classList.add("error");
        } else if (addComment.value.trim() === '') {
            return addComment.classList.add("error");
        };


        renderComments(newComments, listElem, getCommentsList);
        postToApi(newComments, addComment, addName);
    });
};

addNewComment();


function checkInputs() {
    let isFilled = true;

    if (addName.value.trim() === '' || addComment.value.trim() === '') {
        isFilled = false;
    }

    if (isFilled) {
        commentBtn.disabled = false;
        commentBtn.classList.remove("hidden-button");
    } else {
        commentBtn.disabled = true;
        commentBtn.classList.add("hidden-button");
    }
};


const addNewCommentOnEnter = (event) => {
    if (event.keyCode === 13) {
        addName.classList.remove("error");
        addComment.classList.remove("error");

        if (addName.value.trim() === '') {
            return addName.classList.add("error");
        } else if (addComment.value.trim() === '') {
            return addComment.classList.add("error");
        } else {
            commentBtn.click();
        };
    };
};


addName.addEventListener('input', checkInputs);
addName.addEventListener('keyup', addNewCommentOnEnter);
addComment.addEventListener('input', checkInputs);
addComment.addEventListener('keyup', addNewCommentOnEnter);