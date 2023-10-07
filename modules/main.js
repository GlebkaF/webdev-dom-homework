"use strict";

import { getApiComments, postApiComment } from "./api.js";
import { renderComments } from "./comments.js";

let idCounter = 2;
let comments = [];

const getComments = () => {
    getApiComments().then((responseData) => {
        waiter.style.display = 'none';
        comments = responseData.comments;
        renderComments({ comments });
    })
    .catch(()=> {
        alert('Сервер сломался, попробуй позже');
        return;
    })
}

getComments();

const addForm = document.querySelector('.add-form');
const addFormName = document.querySelector('.add-form-name');
const addFormText = document.querySelector('.add-form-text');
const addFormButton = document.querySelector('.add-form-button');
const removeFormButton = document.querySelector('.remove-form-button')
const listComments = document.querySelector('.comments');
const waiter = document.querySelector('.waiter');
const wait = document.querySelector('.wait');


addFormButton.setAttribute('disabled', true);

renderComments({ comments });

const getSafeString = (str) => str.trim()
.replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;");

const getUnsafeString = (str) => str.trim()
.replaceAll("&amp;", "&")
.replaceAll("&lt;", "<")
.replaceAll("&gt;", ">")
.replaceAll("&quot;", '"')

const AddComment = () => {
    addForm.classList.add('add-form_disabled');
    wait.textContent = 'Комментарий добавляется...';

    postApiComment({
        name: getSafeString(addFormName.value),
        text: getSafeString(addFormText.value),
        date: new Date(),
        forceError: false, 
    }).then(() => {
        addForm.classList.remove('add-form_disabled');
        addFormName.value = '';
        addFormText.value = '';
        addFormName.classList.remove('error');
        addFormText.classList.remove('error');
    })
    .catch((error) => {
        addForm.classList.remove('add-form_disabled');

        if (error.message === 'Bad Request') {
            if (addFormName.value === '' || addFormName.value.length < 3) {
                addFormName.classList.add('error');
            }
            if (addFormText.value === '' || addFormText.value.length < 3) {
                addFormText.classList.add('error');
            }
            alert('Имя и комментарий должны быть не короче 3 символов');
            return;
        }

        if (error.message === 'Сервер упал') {
            alert('Сервер сломался, попробуй позже');
            return;
        }

        alert('Ошибка соединения, попробуй позже');
        return;

        })
        .finally(() => {
            wait.textContent = '';
        });
    
    getComments();
}

addFormName.addEventListener('input', (e) => {
    if (addFormName.value === '') {
        addFormButton.setAttribute('disabled', true);
    } else {
        addFormButton.removeAttribute('disabled')
    }
});

addFormButton.addEventListener('click', () => {
    AddComment();
})

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        AddComment();
    }
});

removeFormButton.addEventListener('click', () => {
    const lastChild = listComments.lastChild;
    lastChild.remove();
    comments.pop();
})

const switcher = (event) => {
    if (!event || !event.target) return;
    const target = event.target;

    if (target.classList.contains('like-button')) {
        addLikesElements(target);
        return;
    }

    if (target.classList.contains('comment-text')) {
        areaFunction(target);
        return;
    }
}

const areaFunction = (target) => {
    const commentBlock = target.closest('.comment');
    const commentId = commentBlock.dataset.name;
    addFormText.value = `${'>'}` + getUnsafeString(target.innerHTML) + ' \n' + commentId;
}

const addLikesElements = (target) => {
    const commentBlock = target.closest('.comment');
    const commentId = commentBlock.dataset.id;
    const likes = commentBlock.querySelector('.like-button');
    const com = comments.find(c => c.id == commentId);
    if (!com) return;

    likes.classList.add('-loading-like');

    delay(2000).then(() => {
        if (com.isLiked) {
        com.likes--;
        } else {
        com.likes++;
        }
        com.isLiked = !com.isLiked;
        com.isLikeLoading = false;
        renderComments();
    });
}

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve();
        }, interval);
    });
}

listComments.addEventListener('click', switcher);

console.log("It works!");