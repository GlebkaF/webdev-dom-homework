// "use strict";

import { getTodos, postTodo } from './api.js';
import { now } from './date.js';
import { renderComments } from './render.js';

const loading = document.getElementById("loading");
const loadingForm = document.getElementById("loadingForm");
const addFormButtonElement = document.getElementById("add-form-button");
// const nameInputElement = document.getElementById("add-form-name");
// const textInputElement = document.getElementById("add-form-text");
// const form = document.getElementById("add-form");
// const deleteCommentButton = document.getElementById("delete-comment-button");
let quote = "";
let currentDate = new Date();

now(currentDate);

let comments = [
];

loading.textContent = "Комментарии загружаются...";

 export const fetchGet = () => {
  getTodos().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: now(new Date(comment.date)),
        text: comment.text,
        likes: 0,
        isLiked: false,
        changeButton: false,
      }
    })
    loading.textContent = "";
    comments = appComments;
    renderAllComments();
  });
};

fetchGet();

const clickLike = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      likeButton.classList.add('-loading-like');
      function delay(interval = 300) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, interval);
        });
      };
      delay(2000).then(() => {
        const newLike = comments[likeButton.dataset.index];
        newLike.likes = newLike.isLiked
          ? newLike.likes - 1
          : newLike.likes + 1;
        newLike.isLiked = !newLike.isLiked;
        // newLike.isLikeLoading = false;
        renderAllComments();
      });
    })
  }
};

const replyToComment = () => {
  const commentBodys = document.querySelectorAll(".comment-body");
  for (const commentBody of commentBodys) {
    commentBody.addEventListener('click', () => {
      const oldComment = commentBody.dataset.text;
      const oldName = commentBody.dataset.name;
      const quote = `${oldComment}\n${oldName}: `;
      textInputElement.value += `"${quote}"\n`;

    })
  }
};

 export const renderAllComments = () => {
  renderComments({ comments });
  clickLike();
  replyToComment();
}

renderAllComments();


// addFormButtonElement.classList.add("empty");
// addFormButtonElement.disabled = true;

// const check = (elem) => {
//   elem.addEventListener('input', () => {
//     if (textInputElement.value === "" || nameInputElement.value === "") {
//       addFormButtonElement.classList.add("empty");
//       addFormButtonElement.disabled = true;
//     } else {
//       addFormButtonElement.classList.remove("empty");
//       addFormButtonElement.disabled = false;
//     }
//   });
// }

// check(textInputElement)
// check(nameInputElement)



// nameInputElement.addEventListener('input', () => {
//   if (nameInputElement.value !== "") {
//     nameInputElement.classList.remove("emptyTextName");
//   }
// });

// textInputElement.addEventListener('input', () => {
//   if (textInputElement.value !== "") {
//     textInputElement.classList.remove("emptyTextName");
//   }
// });



// export const addNewComment = () => {


//   textInputElement.classList.remove("emptyTextName");
//   nameInputElement.classList.remove("emptyTextName");
//   const validation = () => {
//     if (nameInputElement.value.length < 3) {
//       nameInputElement.classList.add("emptyTextName");
//     };
//     if (textInputElement.value.length < 3) {
//       textInputElement.classList.add("emptyTextName");
//     };
//   }

//   validation();
//   form.disabled = true;
//   form.classList.add('none');
//   loadingForm.textContent = 'Комментарий добавляется...';

//   const post = (text) => {
//     postTodo({
//       name: nameInputElement.value,
//       text: textInputElement.value
//     })
//       .then((responseData) => {
//         return fetchGet();
//       })
//       .then(() => {
//         loadingForm.textContent = '';
//         form.classList.remove('none');
//         textInputElement.value = "";
//         nameInputElement.value = "";
//       }).catch((error) => {
//         if (error.message === "Сервер упал") {
//           // Пробуем снова, если сервер сломался
//           post(text);
//         };
//         if (window.navigator.onLine === false) {
//           alert('Проблемы с интернетом, проверьте подключение')
//         };

//         console.warn(error);
//         loadingForm.textContent = '';
//         form.classList.remove('none');
//       });
//   }

//   post();

//   renderAllComments();
// }


// addFormButtonElement.addEventListener("click", addNewComment);

// form.addEventListener("keyup", (e) => {
//   if (e.code === "Enter") addNewComment();
// });

// deleteCommentButton.addEventListener('click', () => {
//   comments.pop();
//   renderAllComments();
// });


