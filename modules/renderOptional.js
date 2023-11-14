import { getUsers } from "../main.js";
import {
  attachLikeButtonListener,
  attachTextButtonListener,
} from "./render.js";

import { postComments } from "./api.js";
// import { buttonElement } from "../main.js";
// import { toggleButton } from "./utils.js";
import { trimValue, setError } from "./validation.js";
import { token } from "./api.js";

// import { showLoadingIndicatorComments } from "./api.js";

// 2
// export function showLoadingIndicatorComments() {
//   const loader = document.querySelector(".comment-loader");
//   loader.classList.remove("hidden");
// }

export function renderUsers(users) {
  console.log("123");
  // listElement remove if not working
  const appElement = document.getElementById("app");
  const usersHTML = users
    .map((user, index) => {
      return `<li class="comment" data-index="${index}" >
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              <a class="comment__link" href="#" id="text-button-${
                user.text
              }"></a>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button data-index="${index}" class="like-button ${
        user.isLiked ? "-active-like" : "-no-active-like"
      }"></button>
            </div>
          </div>
        </li> `;
    })
    .join("");
  // const usersPageHTML = `
  //   <div class="container">
  //   <ul id="list" class="comments">
  //   ${usersHTML}
  //   </ul>
  //   ${(!token)// <input id="name-input" //     ? `<div class="add-form">
  //   //   type="text"
  //   //   value=""
  //   //   class="add-form-name"
  //   //   placeholder="Введите ваше имя"
  //   // />
  //   // <textarea
  //   //   id="comment-input"
  //   //   class="add-form-text"
  //   //   placeholder="Введите ваш комментарий"
  //   //   rows="4"
  //   // ></textarea>
  //   // <div class="add-form-row">
  //   //   <button id="add-button" class="add-form-button">Написать</button>
  //   // </div>
  //   // </div>`
  //   //     :
  //   `<button>Авторизоваться</button>;
  //   <p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>зарегистрируйтесь</а></p>`}
  //   <div class="comment-loader hidden">
  //           <span>Comment is being posted</span>
  //         </div>
  //   </div>
  //   </div>
    
  //   `;
  // appElement.innerHTML = usersPageHTML;

  // listElement ->clarify
  // const list = document.getElementById("list");
  // const buttonElement = document.getElementById("add-button");

  list.innerHTML = usersHTML;
  // const linkToLogin = document.getElementById("login-link");
  // linkToLogin?.addEventListener("click", () => {
  //   renderLogin();
  // });
  getUsers();
  attachLikeButtonListener(user, users, listElement);
  attachTextButtonListener(user);
}
export const buttonElement = document.querySelectorAll("add-form-button");
export const listElement = document.getElementById("list");
export const inputTextElement = document.getElementById("comment-input");
export const inputNameElement = document.querySelectorAll("add-form-name");
console.log(inputNameElement);

// toggleButton(buttonElement, inputNameElement, inputTextElement);
// console.log(buttonElement);
// buttonElement.disabled = false;
// buttonElement.textContent = "Написать";
// inputNameElement.addEventListener("input", () =>
//   toggleButton(buttonElement, inputNameElement, inputTextElement)
// );
// inputTextElement.addEventListener("input", () =>
//   toggleButton(buttonElement, inputNameElement, inputTextElement)
// );

// buttonElement.addEventListener("click", () => {
//   inputNameElement.classList.remove("error");
//   inputTextElement.classList.remove("error");

//   if (!trimValue(inputNameElement)) {
//     inputNameElement.classList.add("error");
//     return;
//   }

//   if (!trimValue(inputTextElement)) {
//     inputTextElement.classList.add("error");
//     return;
//   }
//   console.log(trimValue);

//   if (trimValue(inputNameElement).trim().length < 3) {
//     return setError(inputNameElement, "Введенное имя слишком короткое");
//   }

//   if (trimValue(inputTextElement).trim().length < 3) {
//     return setError(inputTextElement, "Ваш комментарий слишком короткий");
//   }
// });
// 1.
// postComments(commentInfo);
