'use strict';

import { comments } from "./api.js";
import { getListComments } from "./listComments.js";
import { renderComments } from "./renderComments.js";
import { getComments, postComments } from "./api.js";


const commentsListElement = document.getElementById('commentsList');
const cancelButtonElement = document.getElementById('cancel-button');
const formElement = document.querySelector('.add-form');


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

export function getDate(currentDate = new Date()) {
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear().toString().substr(-2);
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if (month < 10) {
        month = "0" + month;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (day < 10) {
        day = "0" + day;
    }

    return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;
};



export const initLikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (e) => {
            likeButtonElement.disabled = true;
            likeButtonElement.classList.add('-loading-like');
            e.stopPropagation();
            const index = likeButtonElement.dataset.index;

            delay(2000).then(() => {
                if (comments[index].isLiked === false) {
                    comments[index].likes++;
                    comments[index].isLiked = true;
                }

                else {
                    comments[index].likes = --comments[index].likes;
                    comments[index].isLiked = false;
                }
                renderComments(commentsListElement, getListComments);
            });
        });
    };
};

export const initDisabledButton = () => {
    const buttonElement = document.getElementById('add-button');
    const nameInputElement = document.getElementById('nameInput');
    const textInputElement = document.getElementById('textInput');
    buttonElement.disabled = true;
    buttonElement.classList.add('disabledButton');
    buttonElement.classList.remove('add-form-button:hover');

    nameInputElement.addEventListener('input', () => {
        buttonElement.disabled = false;
        buttonElement.classList.remove('disabledButton');
        if (nameInputElement.value === '' || textInputElement.value === '') {
            buttonElement.disabled = true;
            buttonElement.classList.add('disabledButton');
        }
        return;
    });

    textInputElement.addEventListener('input', () => {
        buttonElement.disabled = false;
        buttonElement.classList.remove('disabledButton');
        if (nameInputElement.value === '' || textInputElement.value === '' || textInputElement.value.endsWith('QUOTE_END ')) {
            buttonElement.disabled = true;
            buttonElement.classList.add('disabledButton');
        }
        return;
    });

    textInputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buttonElement.click();
        }
    });
};


commentsListElement.textContent = 'Загружаю комментарии... еще чуть-чуть';


getComments()
    .then(() => {
        return renderComments(commentsListElement, getListComments);
    });



const textInputElement = document.getElementById('textInput');
const nameInputElement = document.getElementById('nameInput');
const buttonElement = document.getElementById('add-button');

export const toggleForm = (isLoading) => {
    if (isLoading) {
        document.querySelector('.add-form').style.display = 'none';
        document.querySelector('.downloading').style.display = 'flex';
    }
    else {
        document.querySelector('.add-form').style.display = 'flex';
        document.querySelector('.downloading').style.display = 'none';
    }
};


buttonElement.addEventListener('click', () => {
    toggleForm(true);

    postComments()
        .then(() => {
            return renderComments(commentsListElement, getListComments)
        })
        .then(() => {
            toggleForm(false);
            nameInputElement.value = '';
            textInputElement.value = '';
        });
});
