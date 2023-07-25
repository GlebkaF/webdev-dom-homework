//import { clickForAnswer } from "./clickForAnswer.js";
import { checkFields } from "./checkFields.js";
import { getLikes } from "./getLikes.js";
import { getCorrectComments } from "./getCorrectComments.js";
import { addTodo, getTodo } from "./main.js";
import { deleteComment, token, userName } from "./api.js";
import { renderLogin } from "./renderLogin.js";

export function isUserLogIn() {
  //console.log(token);
  if (token === undefined) {
    return false;
  } else {
    return true;
  }
}

//Ренден функция
export const renderComments = ({ comments }) => {
  const appElement = document.getElementById("login-app");

  const commentsHTML = comments
    .map((comment, index) => {
      return ` <li id="comment-list" class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="">
          ${
            comment.isEdit
              ? `<textarea
          data-index="${index}
          id="correct-textarea"
          type="textarea"
          class="add-form-text correct-form-text"
          rows="4"
        >${comment.text}</textarea>`
              : `${comment.text}`
          }
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
         <span class="likes-counter">${comment.counter}</span>
          <button data-index="${index}" 
          data-id="${comment.id}"
          class="like-button${comment.isLiked ? " -active-like" : ""}">
          </button>
        </div>
      </div>
      <div class="buttons-box">
        <div>
          <button data-index="${index}" data-id="${
        comment.id
      }" class="delete-button">&times</button>
        </div>
        <div class="add-form-row">
          <button data-index="${index}" class="add-correct-button">${
        comment.isEdit ? "Сохранить" : "Редактировать"
      }</button>
        </div>
      </div>
    </li>`;
    })
    .join("");

  let appHtml = `
    <ul id="comment-list" class="comments">${commentsHTML}</ul>
    <div class="comment-body comment-body-input">
    <div class="add-form">
      <input
        id="name-input"
        type="text"
        class="add-form-name"
        value=${userName} readonly
      />
      <textarea
        id="comment-input"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="write-button" class="add-form-button">Написать</button>
      </div>
    </div>
  </div>
  <div class="login-for-comment"><p>Чтобы оставить комментарий, <a class="comment-link">авторизуйтесь</a></p></div>
    `;

  appElement.innerHTML = appHtml;

  const buttonElement = document.getElementById("write-button");
  const nameElement = document.getElementById("name-input");
  const commentElement = document.getElementById("comment-input");
  const commentBodyElement = document.querySelector(".comment-body-input");
  const loadBodyElement = document.querySelector(".comment-body-text");
  const loginForCommentElement = document.querySelector(".login-for-comment");
  const commentLink = document.querySelector(".comment-link");
  const deleteButtons = document.querySelectorAll(".delete-button");

  //удаляем комментарий
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", () => {
      // const index = deleteButton.dataset.index;
      // const id = index;
      const id = deleteButton.dataset.id;
      console.log(id);

      deleteComment({ id }).then(() => {
        console.log(id);
        getTodo();
      });
    });
  }

  //если пользователь не зарегистрирован, он не может добавлять комментарии
  if (isUserLogIn() === false) {
    commentBodyElement.style.display = "none";
    loginForCommentElement.style.display = "block";
    // correctButtons.disabled = true;
    // likeButtons.disabled = true;
  } else {
    commentBodyElement.style.display = "block";
    loginForCommentElement.style.display = "none";
    nameElement.disabled = true;
    //   correctButtons.disabled = false;
    //   likeButtons.disabled = false;
  }

  //по ссылке пользователь переходит на страницу авторизации
  commentLink.addEventListener("click", () => {
    console.log("click");
    renderLogin({ getTodo });
  });

  //Добавляем новый комментарий
  buttonElement.addEventListener("click", () => {
    //Поля ввода подкрашиваются красным, если одно из полей не заполнено
    nameElement.classList.remove("error");
    commentElement.classList.remove("error");
    if (nameElement.value === "" || commentElement.value === "") {
      nameElement.classList.add("error");
      commentElement.classList.add("error");
      alert("Заполните оба поля (имя и комментарий)!");
      return;
    }
    addTodo({
      commentElement,
      nameElement,
      commentBodyElement,
      loadBodyElement,
      buttonElement,
    });
  });

  //clickForAnswer({ comments, renderComments });
  checkFields();
  nameElement.addEventListener("input", checkFields);
  commentElement.addEventListener("input", checkFields);

  getLikes({ comments, renderComments });
  getCorrectComments({ comments, renderComments });
};
