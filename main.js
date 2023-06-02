"use strict";

import { getFetch } from "./api.js";
import { renderComments } from "./components/renderComments.js";
import { renderRegister } from "./components/renderRegister.js";

const appElement = document.querySelector('#app');

let comments = [];
let token = null;
let isStarting = true;
let isRegister = false;

const startFetch = () => {
    renderApp();

    getFetch()
    .then(responseData => {
        comments = responseData.comments;
        isStarting = false;

        renderApp();
    });
}

const renderApp = () => {
    if (!token && !isRegister) {
        appElement.innerHTML = `
            ${renderComments({ comments, isStarting })}
            <p class="bottom-text">Чтобы добавить комментарий, 
            <a href="" id="reg-link" class="link">авторизуйтесь</a></p>`;
        
        document.querySelector('#reg-link')
        .addEventListener('click', (event) => {
            event.preventDefault();

            isRegister = true;

            renderApp();
        });
    } else if (!token && isRegister) {
        renderRegister({ appElement });
    }
}

startFetch();








// const checkFirstStart = () => {
//     if (isStarting) {
//         startingElement.classList.remove('hidden');
//         commentList.classList.add('hidden');
//     } else {
//         commentList.classList.remove('hidden');
//         startingElement.classList.add('hidden');
//     }
// }
// const checkWaiting = () => {
//     if (isWaiting) {
//         waitingElement.classList.remove('hidden');
//         addFormElement.classList.add('hidden');
//     } else {
//         addFormElement.classList.remove('hidden');
//         waitingElement.classList.add('hidden');
//     }
// }
// const checkAddButton = () => {
//     if (!nameElement.value.trim() || !textElement.value.trim()) {
//     addButton.disabled = true;
//     }
// }
// const activateAddButton = () => {
//     nameElement.addEventListener('input', () => {
//     if (textElement.value.trim()) {
//         addButton.disabled = false;
//     }
//     });
//     textElement.addEventListener('input', () => {
//     if (nameElement.value.trim()) {
//         addButton.disabled = false;
//     }
//     });
// }
// const likeComment = () => {
//     const likeButtons = document.querySelectorAll('.like-button');

//     for (let button of likeButtons) {
//     button.addEventListener('click', (event) => {
//         event.stopPropagation();
        
//         let index = button.dataset.index;
//         comments[index].isLikeLoading = true;

//         renderComments();

//         delay(2000).then(() => {
//         if(comments[index].isLiked) {
//             comments[index].likes--;
//         } else {
//             comments[index].likes++;
//         }

//         comments[index].isLiked = !comments[index].isLiked;
//         comments[index].isLikeLoading = false;

//         renderComments();
//         });
//     });
//     }
// }
// const answerComment = () => {
//     const commentElements = document.querySelectorAll('.comment');

//     for (let element of commentElements) {
//     element.addEventListener('click', () => {
//         let index = element.dataset.index;

//         textElement.value = `START_QUOTE${comments[index].author.name}:\n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
//     });
//     }
// }
// const handlePostClick = () => {
//     return fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
//     method: "POST",
//     body: JSON.stringify({
//         name: replaceValue(nameElement.value),
//         text: replaceValue(textElement.value)
//         .replaceAll('START_QUOTE', '<div class="comment-quote">')
//         .replaceAll('END_QUOTE', '</div>'),
//         forceError: true
//     })
//     })
//     .then(response => {
//     if (response.status === 400) throw new Error('Ошибка 400');
//     if (response.status === 500) throw new Error('Ошибка 500');

//     response.json();
//     })
//     .then(() => {
//     nameElement.value = '';
//     textElement.value = '';

//     return startFetch();
//     })
//     .catch(error => {
//     if (error.message === 'Ошибка 400') {
//         alert('Имя и комментарий должны быть не короче 3 символов');
//     } else if (error.message === 'Ошибка 500') {
//         alert('Сервер сломался, попробуй позже');
//     } else {
//         alert('Кажется, у вас сломался интернет, попробуйте позже');
//     }

//     isWaiting = false;

//     renderComments();
//     });
// }

// const addComment = () => {
//     if (!nameElement.value.trim()) {
//     nameElement.classList.add('form-error');
//     checkAddButton();
//     return;
//     } else if (!textElement.value.trim()) {
//     textElement.classList.add('form-error');
//     checkAddButton();
//     return;
//     } else {
//     isWaiting = true;

//     renderComments();

//     fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
//         method: "POST",
//         body: JSON.stringify({
//         name: replaceValue(nameElement.value),
//         text: replaceValue(textElement.value)
//             .replaceAll('START_QUOTE', '<div class="comment-quote">')
//             .replaceAll('END_QUOTE', '</div>'),
//         forceError: true
//         })
//     })
//     .then(response => {
//         if (response.status === 400) throw new Error('Ошибка 400');
//         if (response.status === 500) throw new Error('Ошибка 500');

//         response.json();
//     })
//     .then(() => {
//         nameElement.value = '';
//         textElement.value = '';

//         return startFetch();
//     })
//     .catch(error => {
//         if (error.message === 'Ошибка 400') {
//         alert('Имя и комментарий должны быть не короче 3 символов');
//         } else if (error.message === 'Ошибка 500') {
//         alert('Сервер сломался, попробуй позже');

//         handlePostClick();
//         } else {
//         alert('Кажется, у вас сломался интернет, попробуйте позже');
//         }

//         isWaiting = false;

//         renderComments();
//     });
//     }

//     nameElement.classList.remove('form-error');
//     textElement.classList.remove('form-error');
// }
// const deleteLastComment = () => {
//     comments.pop();

//     renderComments();
// }


// startFetch();
// renderComments();

// addButton.addEventListener('click', addComment);
// textElement.addEventListener('keyup', (event) => {
//     if (event.key === 'Enter') {
//     addComment();
//     }
// });
// removeButton.addEventListener('click', deleteLastComment);