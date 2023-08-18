import { postComment, token } from "./api.js";
import { fetchAndRenderComments } from "./fetch.js";
import { renderApp } from "./renderContent.js";
import { users } from "./users.js";

// import { renderUsers } from "./render.js";
// import { date } from "./date.js";
// // import { renderLogin } from "./loginPage.js";
// import { users } from "./users.js"

// // export const renderApp = (flag) => {
// //     if (flag) {
// const formElement = document.querySelector(".add-form");
// const addFormHtml = `<input
//           id="name-input"
//           type="text"
//           class="add-form-name"
//           placeholder="Введите ваше имя"
//         />
//         <textarea
//           id="comment-input"
//           type="textarea"
//           class="add-form-text"
//           placeholder="Введите ваш коментарий"
//           rows="4"
//         ></textarea>
//         <div class="add-form-row">
//           <button id="add-button" class="add-form-button">Написать</button>
//         </div>`;

// // renderLogin()

// // Загрузка
// formElement.innerHTML = 'Комметарии загружаются...';

// // Получение данных из API
// const getApi = (users) => {
//   const formElement = document.querySelector(".add-form");
//   const commentsElement = document.querySelector(".comments");

//   getComments().then((responseData) => {
//     users = responseData.comments;
//     formElement.innerHTML = addFormHtml;
//     renderUsers({ addLike, answer, commentsElement, date, getLikeClass });
//     addEventButton();
//   })
// }

const postApi = () => {

  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");


  postComment({
    text: commentInputElement.value,
    name: nameInputElement.value,
  }).then(() => {
    fetchAndRenderComments()
    // addEventButton()

  })
  // .catch((error) => {

  //   alert(error);

  // })
}

// // Добавление комментрия клавишей Enter
// document.addEventListener("keyup", (event) => {
//   if (event.code === 'Enter') {
//     document.getElementById("add-button").click();
//     return;
//   }
// });

// // Кнопка лайка
export const getLikeClass = (element) => {
  return element ? "like-button -active-like" : "like-button"
}

// // Добавить лайк
export function addLike() {
  const likeElements = document.querySelectorAll('.like-button');
  // const commentsElement = document.querySelector(".comments");

  likeElements.forEach((element, index) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      const user = users[index];
      if (user.isLiked === true) {
        user.isLiked = false;
        user.likes -= 1;
        renderApp();
      } else {
        user.isLiked = true;
        user.likes += 1;
        renderApp();
      }
    })
  })
}

// // Ответ на комментарий
export const answer = () => {
  const commentAnswers = document.querySelectorAll('.comment');
  commentAnswers.forEach((textElement, index) => {
    textElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const commentInputElement = document.getElementById("comment-input");
      return commentInputElement.value = `${users[index].text} ${users[index].author.name}, `;
    });
  });
};


// getApi();
// console.log("It works!");
// // } else {
// //     // login
// // }
// // } 

// Функция клика, валидация
export function addEventButton() {
  if (token) {
  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");

  buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (commentInputElement.value === "") {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      buttonElement.classList.add("disabled-button");
      return;
    } else {
      buttonElement.classList.remove("disabled-button");
    }

    postApi();
  });
}
}