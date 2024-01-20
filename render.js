import {commentList} from "./main.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { token, postComment } from "./api.js";
import { renderLoginForm } from "./renderLogin.js";
import { sanitizeHtml } from './sanitizeHtml.js';



//Выводим комменты
export const renderComments = () => {
  const appHtml = document.getElementById("app");
  console.log(commentList);
  const commentsHtml = commentList.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div id="">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div id="" class="comment-text" >
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <button id="delete-form-button" class="delete-form-button" data-index="${index}">Удалить</button>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
  }).join("");

  //Форма ввода комментария
  const contentHtml = () => {
    const btnLogin = `
    <p class="render-login-btn">  Чтобы добавить комментарий, 
    <a id="render-login-btn">авторизуйтесь</a> </p>`

    if (!token) return `<ul id="comments" class="comments">${commentsHtml}</ul>
     ${btnLogin}`;
    return `<ul id="comments" class="comments">${commentsHtml}</ul>
    <div id="add-form" class="add-form">
      <input id="add-name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="add-text" type="textArea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-form-button" class="add-form-button">Написать</button>
      </div>
    </div>`
  }

  /* initLikeListener();
  initDeleteButtonsListeners();
  quoteCommets(); */
  appHtml.innerHTML = contentHtml()

  //Переход к форме авторизации по клику
  setLoginBtn = () => {
    const buttonLoginElement = document.getElementById("render-login-btn");
    buttonLoginElement.addEventListener("click", (event) => {
      event.preventDefault();
      renderLoginForm();
    });
  };

  setLoginBtn();


};
//Активность кнопки лайк
export const initLikeListener = () => {
  const buttonLike = document.querySelectorAll(".like-button");
  for (const iteratorLike of buttonLike) {
    iteratorLike.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = iteratorLike.dataset.index;
      commentList[index].likes += commentList[index].isLiked ? -1 : +1;
      commentList[index].isLiked = !commentList[index].isLiked;
      renderComments(); //перерисовываем форму для лайков с счетчиком
    });
  }
};

//Цитирование
const quoteCommets = () => {
  const textAreaElement = document.getElementById("add-text");
  const commentElements = document.querySelectorAll(".comment");
  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      const commentText = commentList[index].text;
      const commentAuthor = commentList[index].name;
      textAreaElement.value = `${commentText} > ${commentAuthor}`;
    })
  };

};

/* addComment(); */


 addComment = () => {
  const textAreaElement = document.getElementById("add-text");
  const inputElement = document.getElementById("add-name");
  const buttonElement = document.getElementById("add-form-button");
  console.log(inputElement, textAreaElement)
  buttonElement.addEventListener("click", () => {
    inputElement.classList.remove("error");
    if (inputElement.value === "") {
      inputElement.classList.add("error");
    }
    if (textAreaElement.value === "") {
      textAreaElement.classList.add("error");
      return;
    };

    //2.13. надпись о загрузке коммента и блокировка кнопки "добавить".
    postComment(inputElement.value,
      textAreaElement.value, sanitizeHtml(textareaInputElement.value))
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        if (response.status === 400) {
          throw new Error("Некорректный запрос error 400");
        } if (response.status === 500) {
          throw new Error("Ошибка сервера error 500");
        }
      }).then(() => {
        inputElement.value = "";
        textAreaElement.value = "";
        return getComments();
      })
      .catch((error) => {
        buttonElement.disabled = true;
        if (error.message === "Некорректный запрос error 400") {
          alert("Длина имени не может быть меньше 3 символов");
        } else if (error.message === "Ошибка сервера error 500") {
          alert("Ошибка сервера");
        } else if (error.message === "Failed to fetch") {
          alert("Отуствует соединение к интеренету");
        };
        buttonElement.disabled = false;
        renderComments();

      })
  })
  if (token) {
    const buttonElement = document.getElementById('add-button');
    buttonElement.addEventListener('click', addNewComment);
  }
  initLikeListener();
  initDeleteButtonsListeners
  quoteCommets();
};






