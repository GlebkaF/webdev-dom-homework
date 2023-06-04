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
// const getAllComments = () => {
//   return fetch("https://webdev-hw-api.vercel.app/api/v1/max-kyrtimov/comments", {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseData) => {
//       const appComments = responseData.comments.map((comment) => {
//         return {
//           name: comment.author.name,
//           date: formatDate(comment.date),
//           text: comment.text,
//           active: false,
//           like: comment.likes,
//         }
//       });
//       comments = appComments;
//       renderComments();
//       invisibleDivHead.classList.add('hidden');
//     });
// };




// getAllComments(comments);

export const formatDate = (commentDate) => {
    let date = new Date();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear().toString().substr(-2);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    const resultDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return resultDate;
}

export let comments = [
    // {
    //   name: "Глеб Фокин",
    //   date: "12.02.22 12:18",
    //   text: "Это будет первый комментарий на этой странице",
    //   like: 3,
    //   isLiked: false,
    // },
    // {
    //   name: "Варвара Н",
    //   date: "13.02.22 19:22",
    //   text: "Мне нравится как оформлена эта страница! ❤",
    //   like: 75,
    //   isLiked: false,
    // },
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

// Рендер функция
// export const renderComments = () => {
//   const commentsHtml = comments.map((comment, index) => getListComment(comment, index)).join("");
//   //  {
//   //   let isLike = '';
//   //   if (comments[index].isLiked) {
//   //     isLike = '-active-like'
//   //   }
//   //   return `<li class="comment">
//   //       <div class="comment-header">
//   //         <div>${comment.name}</div>
//   //         <div>${comment.date}</div>
//   //       </div>
//   //       <div class="comment-body">
//   //         <div class="comment-text">
//   //           ${comment.text}
//   //         </div>
//   //       </div>
//   //       <div class="comment-footer">
//   //         <div class="likes">
//   //           <span class="likes-counter ">${comment.like}</span>
//   //           <button class="like-button  ${isLike}" data-index="${index}"></button>
//   //         </div>
//   //       </div>
//   //     </li>`
//   // }).join('');

//   listElement.innerHTML = commentsHtml;

//   initlikeButtonListeners();
//   initAnswerComment();
// };

getAllComments();
//                                                  Закоментил
// export const renderCommentsMod = () => {
//     renderComments(comments);
// };

// renderCommentsMod();



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

    //   addFormLoad.classList.add('hidden');                                                             
    invisibleDiv.classList.remove('hidden');

    // const finComments = () => {
    //   fetch("https://webdev-hw-api.vercel.app/api/v1/max-kyrtimov/comments", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: nameInputElement.value,
    //       text: commentInputElement.value,
    //       forceError: false,
    //     }),
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       if (response.status === 201) {
    //         return response.json();
    //       } else if (response.status === 400) {
    //         // alert("Имя и комментарий должны быть не короче 3 символов");
    //         throw new Error("Неверный запрос")
    //         // addFormLoad.classList.add('hidden');
    //         // return Promise.reject("Имя и комментарий должны быть не короче 3 символов");

    //       } else if (response.status === 500) {
    //         // alert('Сервер не доступен, попробуй позже...');
    //         throw new Error("Ошибка сервера")
    //         // throw new Error("Сервер совсем упал");
    //       } else {
    //         alert("отсутствует интернет")
    //       }
    //     })
    //     .then((responseData) => {
    //       return getAllComments();
    //     })
    //     .then((data) => {
    //       addFormLoad.classList.remove('hidden');
    //       invisibleDiv.classList.add('hidden');
    //       nameInputElement.value = "";
    //       commentInputElement.value = "";
    //       buttonElemtnt.disabled = true;
    //     })
    //     .catch((error) => {
    //       // alert("Кажется, у вас сломался интернет, попробуйте позже");
    //       addFormLoad.classList.add('hidden');
    //       //TODO: Отправлять с систему сбора ошибок
    //       if (error.message === "Ошибка сервера") {
    //         alert('Сервер не доступен, попробуй позже...');
    //         return;
    //       };
    //       if (error.message === "Неверный запрос") {
    //         alert("Имя и комментарий должны быть не короче 3 символов");
    //         return;
    //       } else {
    //         alert("Кажется, у вас сломался интернет, попробуйте позже")
    //       }

    //       console.warn(error);
    //     })
    //     .then((data) => {
    //       addFormLoad.classList.remove('hidden');
    //       invisibleDiv.classList.add('hidden');
    //     })
    // };
    invisibleDiv.classList.add('hidden');
    finComments();

    countInLike = 0;
    // renderComments(comments);
    // nameInputElement.value = "";
    // commentInputElement.value = "";
    // buttonElemtnt.disabled = true;
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

