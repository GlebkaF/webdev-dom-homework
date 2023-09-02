import { postTodo, token } from "./api.js";
import { getDateApi, clickLike } from "./main.js";
import { renderLogin } from "./renderlogin.js";


export const renderComments = ({ comments, clickLike }) => {
  const appElement = document.getElementById("app");
  const commentsHtml = comments
    .map((comment, index) => {
      if (comment.active === true) {
        comment.active = "-active-like";
      }
      return `<li class="comment" id="comment-new" data-test="${index}">
        <div class="comment-header">
          <div id="comment-name">${comment.name}</div>
          <div id="comment-data">${
            comment.date ? new Date(comment.date).toLocaleString() : ""}
            </div>
        </div>
        <div class="comment-body">
          ${
            comment.isEdit
              ? `<textarea type="textarea" class="add-form-text edit-form" rows="4"  data-edit="${index}" >
            ${comment.text}</textarea>`
              : `<div class="comment-text" style="white-space:pre-line" id="comment-text" data-text=${index}>
            ${comment.text}</div>`
          }
        </div>
        <button class="add-form-button" data-edit="${index}">${
        comment.isEdit ? "Сохранить" : "Редактировать"
      }</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" id="like-text" value="">${
              comment.like
            }</span>
            <button class="like-button ${
              comment.active
            }" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

  const appHtml = `<div class="container">
      <div class="loader">
        <p>Подождите, комментарии загружаются...</p>
      </div>
        <ul class="comments" id="comments-list">${commentsHtml}</ul>
        <div class="preloader">
          <p>Ждём, комментарий добавляется...</p>
        </div>
        ${ token ? `<div class="add-form" id="input-list">
          <input
            id="name-input"
            value=""
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
          />
          <textarea
            id="comment-input"
            value=""
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="add-button">Написать</button>
            <button class="new-form-button" id="new-button">
              Удалить последний комментарий
            </button>
          </div>
        </div>` : `<div class="add-form-auto">Чтобы добавить комментарий, <a href="#" class="link-auto" id="link-auto"> авторизуйтесь</a></div>`}
      </div>`;

  appElement.innerHTML = appHtml;

  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const newButton = document.getElementById("new-button");
  const inputList = document.getElementById("input-list");
  const preloader = document.querySelector(".preloader");
  const loader = document.querySelector(".loader");
  const autoRegistration = document.getElementById("link-auto");

  loader.style.display = "none";

  const buttonLikes = document.querySelectorAll(".like-button");

  buttonLikes.forEach((button) => {
    button.addEventListener("click", clickLike);

  autoRegistration.addEventListener("click", ()=> {
renderLogin({ getDateApi });
  })
  });

  const commentElements = document.querySelectorAll(".comment");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.test;
      commentInputElement.value =
        ">" + comments[index].text + "\n" + "\n" + comments[index].name + ",";
      renderComments({ comments, clickLike });
    });
  }
  // const buttonEdit = document.querySelectorAll(".add-form-button");
  // buttonEdit.forEach((button) => {
  //   button.addEventListener("click", clickEdit);
  // });
  const getElement = () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value === "") {
      buttonElement.disabled = true;
      buttonElement.style.backgroundColor = "gray";
      nameInputElement.classList.add("error");
      return;
    }
    if (commentInputElement.value === "") {
      buttonElement.disabled = true;
      buttonElement.style.backgroundColor = "gray";
      commentInputElement.classList.add("error");
      return;
    }

    preloader.style.display = "block";
    inputList.style.display = "none";

    postTodo({
      name: nameInputElement.value,
      text: commentInputElement.value,
    })
      .then((responseData) => {
        return getDateApi();
      })
      .then((getDate) => {
        preloader.style.display = "none";
        inputList.style.display = "flex";

        nameInputElement.value = "";
        commentInputElement.value = "";
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");
      })
      .catch((error) => {
        preloader.style.display = "none";
        inputList.style.display = "flex";

        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуй позже");
          return;
        }
        if (error.message === "Плохой запрос") {
          alert("Имя и комментарий должны быть не короче 3 символов");
          return;
        }

        alert("Кажется, у вас сломался интернет, попробуйте позже");
      });
      
      buttonElement.addEventListener("click", () => {
        getElement();
      });
    
      nameInputElement.addEventListener("input", () => {
        buttonElement.disabled = false;
        buttonElement.style.backgroundColor = "";
        nameInputElement.classList.remove("error");
      });
    
      commentInputElement.addEventListener("input", () => {
        buttonElement.disabled = false;
        buttonElement.style.backgroundColor = "";
        commentInputElement.classList.remove("error");
      });
    
      newButton.addEventListener("click", () => {
        comments.pop();
        renderComments({ comments, clickLike });
      });
    
      document.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          getElement();
        }
      });
  };
};
