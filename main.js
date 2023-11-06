import { getTodos, postTodo } from "./API.js";
import { renderData } from "./render.js";

const nameElement = document.getElementById("inputName");
const textElement = document.getElementById("inputText");
const buttonElement = document.getElementById("buttonPush");
const ulElement = document.getElementById("ul");

const loadingElement = document.querySelector(".commentsLoading");
const commentLoadingElement = document.querySelector(".commentLoading");
const formElement = document.querySelector(".add-form");

const apiGet = () => {
  getTodos().then((responseData) => {
    const fromApp = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        userLike: comment.isLiked,
        comment: comment.text,
        like: comment.likes,
        date: new Date(comment.date).toLocaleString(),
      };
    });
    commentsArray = fromApp;

    renderData(ulElement, commentsArray);
    loadingElement.classList.add("hidden");
  });
};
apiGet();

let commentsArray = [];

renderData(ulElement, commentsArray);

function validationInput() {
  if (nameElement.value === "" || textElement.value === "") {
    buttonElement.disabled = true;
    return;
  } else {
    buttonElement.disabled = false;
  }
}

buttonElement.disabled = true;
nameElement.addEventListener("input", validationInput);
textElement.addEventListener("input", validationInput);

buttonElement.addEventListener("click", () => {
  buttonElement.disabled = true;
  commentLoadingElement.classList.add("commentLoadingInvisible");
  formElement.classList.add("add-formInvisible");
  const postCommentsPromise = () => {
    postTodo(textElement, nameElement)
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Неполадки с сервером");
        } else if (response.status === 400) {
          throw new Error("Недопустимое количество символов");
        } else {
          nameElement.value = "";
          textElement.value = "";
        }

        apiGet();
      })
      .catch((error) => {
        if (error === "Failed to fetch") {
          alert("Нет соединения с интернетом");
        } else {
          alert(error.message);
        }
      })
      .finally(() => {
        buttonElement.disabled = false;
        commentLoadingElement.classList.remove("commentLoadingInvisible");
        formElement.classList.remove("add-formInvisible");
      });
  };
  postCommentsPromise();
});

