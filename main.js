import { getComments, regUser } from "./api.js";
import { postMethod, login, getUsers } from "./api.js";
import {
  renderAddFormComponent,
  renderLoginComponent,
  renderRegFormComponent,
  renderMainRegFormComponent,
} from "./login-company.js";

const containerElement = document.getElementById("container");

let display = "";

let comments = [];

let token = "";
token = false;
getUsers(token);
const getCommentsEdit = (comment, index) => {
  return `<li class="comment" data-like='${
    comment.likes
  }' data-index="${index}" >
      <div class="comment-header">
        <div>${comment.user?.name ?? comment.name}</div>
        <div>${comment.comDate}</div>
      </div>
      <div class="comment-body">
        <div id = "comment-text" class="comment-text" data-index='${index}'>
          ${comment.comText}
        </div>
      </div>
      <div class="comment-footer"> 
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index='${index}' class="like-button  ${
    comment.isLiked ? "-active-like" : ""
  }"></button>
        </div>
      </div>
    </li>`;
};

const renderContainer = (comments) => {
  const commentsHtml = comments
    .map((comment, index) => getCommentsEdit(comment, index))
    .join("");
  if (display === "login") {
    renderLoginComponent(containerElement, commentsHtml);
    const registrElement = document.getElementById("authorization_registr");
    registrElement.addEventListener("click", (event) => {
      display = "registr";
      renderContainer(comments);
    });
  } else if (display === "main") {
    renderAddFormComponent(containerElement, commentsHtml);

    const buttonElement = document.getElementById("add-button");
    const textElement = document.getElementById("add-text");
    const nameElement = document.getElementById("input-name");
    buttonElement.addEventListener("click", () => {
      textElement.classList.remove("error");
      nameElement.classList.remove("error");

      buttonElement.disabled = true;
      buttonElement.textContent = "Отправляем...";
      addComment();
      renderContainer(comments, containerElement);
      initResponseCommentsListeners();

      initEventListeners();
      buttonElement.disabled = true;
    });
  } else if (display === "registr") {
    renderRegFormComponent(containerElement, commentsHtml);
    initRegisterListener();
    const loginElement = document.getElementById("registr__authorization");
    loginElement.addEventListener("click", (event) => {
      display = "login";
      renderContainer(comments, containerElement);
      initLoginListener();
      event.stopPropagation();
    });
  } else {
    renderMainRegFormComponent(containerElement, commentsHtml) 
    const mainAuthorization = document.getElementById("main__authorization");
    mainAuthorization.addEventListener('click', (event) => {
      display = 'login';
      renderContainer(comments, containerElement)
      initLoginListener();
      event.stopPropagation();
    })
  }

  function addComment() {
    const nameElement = document.getElementById("input-name");
    const textElement = document.getElementById("add-text");
    postMethod(nameElement.value, textElement.value)
      .then(() => {
        getPromise();
      })
      .then(() => {
        buttonElement.textContent = "Написать";
        nameElement.value = "";
        textElement.value = "";
      })
      .catch((error) => {
        if (error.message == "Сервер сломался") {
          buttonElement.textContent = "Написать";
          buttonElement.disabled = false;
          addComment();
        } else if (error.message == "Короткое имя или текст") {
          alert("Имя и комментарий должны быть не короче 3 символов");
          buttonElement.textContent = "Написать";
          buttonElement.disabled = false;
        }
      });
    return;
  }
};
renderContainer(comments);
function getPromise() {
  getComments(token).then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        comDate: new Date(comment.date)
          .toLocaleString("ru-RU", options)
          .replace(",", ""),
        comText: comment.text,
        likes: comment.likes,
        isLiked: false,
        isEdit: false,
      };
    });
    comments = appComments;
    renderContainer(comments, containerElement);
    initLoginListener();
    initResponseCommentsListeners();
    initEventListeners();
  });
}
getPromise();
const buttonElement = document.getElementById("add-button");
const textElement = document.getElementById("add-text");

const initResponseCommentsListeners = () => {
  const responseComments = document.querySelectorAll(".comment");
  const textElement = document.getElementById("add-text");
  for (const responseComment of responseComments) {
    const index = responseComment.dataset.index;
    responseComment.addEventListener("click", (event) => {
      textElement.value = `< ${comments[index].comText} \n
${comments[index].name}`;
      event.stopPropagation();
    });
  }
};

const initEventListeners = () => {
  const likeElements = document.querySelectorAll(".like-button");

  for (const likeElement of likeElements) {
    const index = likeElement.dataset.index;
    likeElement.addEventListener("click", (event) => {
      if (comments[index].isLiked === false) {
        comments[index].likes += 1;
        comments[index].isLiked = true;
      } else {
        comments[index].likes -= 1;
        comments[index].isLiked = false;
      }
      renderContainer(comments);
      event.stopPropagation();
      initEventListeners();
    });
  }
};
const initLoginListener = () => {
  const authorizationElement = document.getElementById("authorization__button");

  if (authorizationElement) {
    authorizationElement.addEventListener("click", (event) => {
      const loginElement = document.getElementById(
        "authorization__login"
      ).value;
      const passwordElement = document.getElementById(
        "authorization__password"
      ).value;
      if (!loginElement) {
        alert("Введите логин");
        return;
      }
      if (!passwordElement) {
        alert("Введите логин");
        return;
      }
      login({
        login: loginElement,
        password: passwordElement,
      })
        .then((user) => {
          token = `Bearer ${user.user.token}`;
          getPromise();
          getUsers(token);
          display = "main";
          event.stopPropagation();
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
  getComments();
};
const initRegisterListener = () => {
  const registerElement = document.getElementById("registr__button");

  if (registerElement) {
    registerElement.addEventListener("click", (event) => {
      const loginElement = document.getElementById(
        "authorization__login"
      ).value;
      const passwordElement = document.getElementById(
        "authorization__password"
      ).value;
      const nameRegElement = document.getElementById(
        "authorization__name"
      ).value;
      if (!nameRegElement) {
        alert("Введите имя");
        return;
      }
      if (!loginElement) {
        alert("Введите логин");
        return;
      }
      if (!passwordElement) {
        alert("Введите логин");
        return;
      }
      regUser({
        login: loginElement,
        password: passwordElement,
        name: nameRegElement,
      })
        .then((user) => {
          token = `Bearer ${user.user.token}`;
          getPromise();
          getUsers(token);
          display = "main";
          event.stopPropagation();
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
  getComments();
};
const date = new Date();
const options = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
};

renderContainer(comments, containerElement, token);
