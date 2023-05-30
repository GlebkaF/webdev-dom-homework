import { renderComments } from "./render.js";
import { getData } from "./api.js";
import { addToList } from "./api.js";
import { appComments } from "./api.js";

export const addButton = document.querySelector('.add-form-button');
export const commentName = document.querySelector('.add-form-name');
export const commentText = document.querySelector('.add-form-text');
export const commentsList = document.querySelector('.comments');
export const addForm = document.querySelector('.add-form');
const container = document.querySelector('.container');

export const loadingMessage = document.createElement('h3');
loadingMessage.classList.add('hidden');
loadingMessage.textContent = 'Список комментариев загружается...';
container.prepend(loadingMessage);

const postMessage = document.createElement('h3');
postMessage.classList.add('hidden');
postMessage.textContent = 'Комментарий публикуется...';
container.appendChild(postMessage);

// let comments = [];

// function getData() {

//     fetch("https://webdev-hw-api.vercel.app/api/v1/daria/comments", {
//         method: "GET",
//     })
//         .then((response) => {
//             return response.json();
//         })
// getData().then((responseData) => {
//     const appComments = responseData.comments.map((comment) => {
//         return {
//             name: comment.author.name,
//             date: new Date(comment.date).toLocaleString().slice(0, -3),
//             text: comment.text,
//             likes: comment.likes,
//             likeStatus: false,
//         }
//     })
    // getData();
    // renderComments(comments);
    // comments = appComments;
    // console.log('comments');
    // console.log(comments);
    // renderComments(comments);

    // loadingMessage.classList.add('hidden');
    // addForm.classList.remove('hidden');
    // postMessage.classList.add('hidden');

startPage();

function startPage() {
    commentsList.classList.add('hidden');
    loadingMessage.classList.add('message');
    loadingMessage.classList.remove('hidden');

    getData().then((comments => renderComments(comments)));
    
    // comments = appComments;
    // console.log('comments');
    // console.log(comments);

    loadingMessage.classList.add('hidden');
    addForm.classList.remove('hidden');
    postMessage.classList.add('hidden');

    commentsList.classList.remove('hidden');

}



// const initLikesButton = () => {
//     const likesButtons = document.querySelectorAll('.like-button');

//     for (const likesButton of likesButtons) {
//         likesButton.addEventListener('click', (event) => {
//             event.stopPropagation();

//             const index = likesButton.dataset.index;
//             const status = comments[index].likeStatus;
//             const value = +comments[index].likes;

//             if (status === '-active-like') {
//                 comments[index].likes = value - 1;
//                 comments[index].likes
//                 comments[index].likeStatus = '';
//                 likesButton.classList.remove('-active-like');
//             } else {
//                 comments[index].likes = value + 1;
//                 console.log(comments[index].likes)
//                 comments[index].likeStatus = '-active-like';
//                 likesButton.classList.add('-active-like');
//             }

//             renderComments();
//         })
//     }
// }

// const addReply = () => {
//     const commentsElements = document.querySelectorAll('.comment');

//     for (const commentsElement of commentsElements) {

//         commentsElement.addEventListener('click', () => {

//             const index = commentsElement.dataset.index;
//             const mentionText = comments[index].text;
//             const mentionName = comments[index].name;
//             const newCommentText = `QUOTE_BEGIN ${mentionText} \n ${mentionName} QUOTE_END \n`;
//             commentText.value = newCommentText;

//             renderComments();
//         })
//     }
// }

// function formatDate() {
//     const commentDate = new Date();
//     const year = commentDate.getFullYear() % 100;

//     let month = commentDate.getMonth() + 1;
//     if (month < 10) {
//         month = '0' + month;
//     }

//     let day = commentDate.getDate();
//     if (day < 10) {
//         day = '0' + day;
//     }

//     let hours = commentDate.getHours();
//     if (hours < 10) {
//         hours = '0' + hours;
//     }

//     let minutes = commentDate.getMinutes();
//     if (minutes < 10) {
//         minutes = '0' + minutes;
//     }

//     const currentDate = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
//     return currentDate;
// }

// const renderComments = () => {
//     const commentsHtml = comments.map((comment, index) => {

//         return `<li class="comment" data-index="${index}">
//         <div class="comment-header">
//             <div>${comment.name.replaceAll("&", "&amp;")
//                 .replaceAll("<", "&lt;")
//                 .replaceAll(">", "&gt;")
//                 .replaceAll('"', "&quot;")} </div>
//             <div>${comment.date} </div>
//         </div>
//         <div class="comment-body"> 
//             <div class="comment-text">
//             ${comment.text.replaceAll("&", "&amp;")
//                 .replaceAll("<", "&lt;")
//                 .replaceAll(">", "&gt;")
//                 .replaceAll('"', "&quot;")
//                 .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
//                 .replaceAll('QUOTE_END', "</div>")
//             }
//         <button class="edit-button" data-index="${index}">Редактировать</button>
//             </div>
//         </div>
//         <div class="comment-footer"> 
//             <div class="likes">
//                 <span class="likes-counter">${comment.likes}</span>
//                 <button class="like-button ${comment.likeStatus}" data-index="${index}"</button>
//             </div>
//         </div> 
//     </li>`
//     }).join("");

//     commentsList.innerHTML = commentsHtml;

//     initLikesButton();
//     addReply();
// }

renderComments(appComments);

// const addToServer = (comment) => {

//     const savedName = commentName.value;
//     const savedText = commentText.value;

//     fetch("https://webdev-hw-api.vercel.app/api/v1/daria/comments", {
//         method: "POST",
//         body: JSON.stringify({
//             name: commentName.value
//                 .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//             text: commentText.value
//                 .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//             forceError: true,
//         }),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 if (response.status === 500) {
//                     throw new Error('Сервер упал');
//                 }
//                 if (response.status === 400) {
//                     throw new Error('Ошибка ввода');
//                 }  
//             }

//             return response.json();
//         })
//         .then((responseData) => {
//             console.log(responseData);
//             return getData();
//         })
//         .catch((error) => {
//             console.log('Ошибка при отправке комментария на сервер:', error);

//             if (error.message === 'Ошибка ввода') {
//                 alert('Имя и сообщение должны быть не короче 3 символов');
//             } else if (error.message === 'Сервер упал') {
//                 alert('Сервер сломался, попробуйте позже');
//             } else {
//                 alert('Кажется, у вас сломался интернет, попробуйте позже');
//             }

//             commentName.value = savedName;
//             commentText.value = savedText;
//             addForm.classList.remove('hidden');
//             addButton.removeAttribute('disabled')
//             loadingMessage.classList.add('hidden');
//         });
// }

// const addToList = () => {

//     commentName.classList.remove('error');
//     if (commentName.value === '') {
//         commentName.classList.add('error');
//         return;
//     }

//     commentText.classList.remove('error');
//     if (commentText.value === '') {
//         commentText.classList.add('error');
//         return;
//     }

//     const newComment = {
//         name: commentName.value
//             .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//         text: commentText.value
//             .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//         date: formatDate(),
//         like: 0,
//         likeStatus: false,
//     }

//     addToServer(newComment);

//     commentName.value = '';
//     commentText.value = '';
//     addButton.setAttribute('disabled', '');
// }

addButton.setAttribute('disabled', '');

commentName.addEventListener('input', () => {
    if (commentText.value) {
        addButton.removeAttribute('disabled');
    } else
        return;
})

commentText.addEventListener('input', () => {
    if (commentName.value) {
        addButton.removeAttribute('disabled');
    } else
        return;
})

addButton.addEventListener('click', (e) => {

    addForm.classList.add('hidden');
    postMessage.classList.remove('hidden');

    addToList();
        addForm.classList.remove('hidden');
        addButton.removeAttribute('disabled')
        postMessage.classList.add('hidden');
})

addForm.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        addToList();
        addForm.classList.remove('hidden');
        addButton.removeAttribute('disabled')
        postMessage.classList.add('hidden');

        // console.log(appComments);
        // comments = appComments;
        // console.log('comments');
        // console.log(comments);
    }
})

const removeButton = document.querySelector('.remove-form-button');

removeButton.addEventListener('click', () => {
    appComments.pop();
    renderComments(appComments);
});