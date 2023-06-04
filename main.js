import { renderComments } from "./render.js";
"use strict";

import { getAllComments, finComments } from "./api.js";
// Код писать здесь

const buttonElemtnt = document.getElementById('add-button');
export const listElement = document.getElementById('list');
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
const deletElement = document.getElementById("delet-button");
const likeButtonElements = document.querySelectorAll('.like-button');
const addFormLoad = document.getElementById('block-form');
const invisibleDiv = document.getElementById('invizDiv');
const invisibleDivHead = document.getElementById('invizDivHeader');

invisibleDivHead.classList.add('hidden');
invisibleDiv.classList.add('hidden');
export let comments = [
];

//Функция для обработчика клика для лайка
export const initlikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            let countInLike = Number(comments[index].like);
            if (likeButtonElement.classList.contains("-active-like")) {
                countInLike -= 1;
                comments[index].isLiked = false;
            } else {
                countInLike += 1;
                comments[index].isLiked = true;
            }
            comments[index].like = countInLike;
            renderCommentsMod();
        });
    };

};

export const initAnswerComment = () => {
    const oldComments = document.querySelectorAll('.comment')
    for (const oldComment of oldComments) {
        oldComment.addEventListener('click', () => {
            commentInputElement.value = `> ${oldComment.querySelector('.comment-text').innerHTML
                .replaceAll("&amp;", "&")
                .replaceAll("&lt;", "<")
                .replaceAll("&gt;", ">")
                .replaceAll("&quot;", '"')}`
                + `\n\n${oldComment.querySelector('.comment-header').children[0].innerHTML
                    .replaceAll("&amp;", "&")
                    .replaceAll("&lt;", "<")
                    .replaceAll("&gt;", ">")
                    .replaceAll("&quot;", '"')},`
        })
    }
}
initAnswerComment();
initlikeButtonListeners();
getAllComments();

nameInputElement.addEventListener('input', () => {
    if (nameInputElement.value.trim() !== '') {
        buttonElemtnt.disabled = false;
        return;
    } else (buttonElemtnt.disabled = true);
    return;
});

buttonElemtnt.addEventListener('click', () => {
    let countInLike;
    nameInputElement.classList.remove('error');
    if (nameInputElement.value === '') {
        nameInputElement.classList.add('error');
        return;
    }

    commentInputElement.classList.remove('error');
    if (commentInputElement.value === '') {
        commentInputElement.classList.add('error');
        return;
    }                                                            
    invisibleDiv.classList.remove('hidden');
    invisibleDiv.classList.add('hidden');
    finComments();

    countInLike = 0;
    deletElement.value;

});



document.addEventListener('kayup', (event) => {
    if (event.key === 'Enter') {
        buttonElemtnt.click();
    }
});

deletElement.addEventListener("click", () => {
    const lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class="comment">');
    if (lastCommentIndex !== -1) {
        listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex);
    }

    comments.pop();
    renderComments();
});

