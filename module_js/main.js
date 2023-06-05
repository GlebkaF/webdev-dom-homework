import { renderComments } from "./render.js";
import { getPromise, getPost } from "./api.js";
import { textInputElement, nameInputElement } from "./variables.js";

getPromise();

// const copyComment = () => {
//   const commentsElement = document.querySelectorAll(".comment");

//   for (const comment of commentsElement) {
//     comment.addEventListener("click", () => {
//       textInputElement.value =
//         `> ${comment
//           .querySelector(".comment-text")
//           .innerHTML.replaceAll("&amp;", "&")
//           .replaceAll("&lt;", "<")
//           .replaceAll("&gt;", ">")
//           .replaceAll("&quot;", '"')}` +
//         `\n\n${comment
//           .querySelector(".comment-header")
//           .children[0].innerHTML.replaceAll("&amp;", "&")
//           .replaceAll("&lt;", "<")
//           .replaceAll("&gt;", ">")
//           .replaceAll("&quot;", '"')}`;
//     });
//   }
// };

// const initLike = () => {
//   const likeButtonElements = document.querySelectorAll(".like-button");
//   for (const likeButton of likeButtonElements) {
//     const index = likeButton.dataset.index;
//     likeButton.addEventListener("click", (e) => {
//       e.stopPropagation();

//       if (comments[index].isLiked) {
//         comments[index].likes--;
//       } else {
//         comments[index].likes++;
//       }
//       comments[index].isLiked = !comments[index].isLiked;

//       renderComments();
//     });
//   }
// };

// const renderComments = () => {
//   const commentsHtml = comments
//     .map((comment, index) => {
//       let activeLike = "";
//       if (comments[index].isLiked) {
//         activeLike = "-active-like";
//       }
//       return `
//         <li class="comment">
//             <div class="comment-header">
//             <div id="commentName">${comment.name}</div>
//             <div>${comment.date}</div>
//             </div>
//             <div class="comment-body">
//               <div class="comment-text"  id="commentText">${comment.text}</div>
//             </div>
//             <div class="comment-footer">
//               <div class="likes">
//                 <span class="likes-counter" >${comment.likes}</span>
//                 <button class="like-button ${activeLike}" data-index='${index}'></button>
//               </div>
//             </div>
//           </li>`;
//     })
//     .join("");

//   listElement.innerHTML = commentsHtml;

//   initLike();
//   copyComment();
// };
renderComments();

buttonElement.addEventListener("click", () => {
  buttonElement.classList.remove("add-form-button-error");
  buttonElement.classList.add("add-form-button");
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === "" || textInputElement.value === "") {
    buttonElement.classList.remove("add-form-button");
    buttonElement.classList.add("add-form-button-error");

    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
    }
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
    }

    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавлятся...";

  getPost();
});

// deleteButtonElement.addEventListener("click", () => {
//   const lastCommentIndex = listElement.innerHTML.lastIndexOf(
//     '<li class="comment">'
//   );
//   if (lastCommentIndex !== -1) {
//     listElement.innerHTML = listElement.innerHTML.substring(
//       0,
//       lastCommentIndex
//     );
//   }
//   comments.pop();
//   renderComments();
// });

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});

console.log("It works!");
