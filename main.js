import { getTodos, postTodo } from "./API.js";
import {commentsHtml} from "./render.js";
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

    renderComments();
    loadingElement.classList.add("hidden");
  });
};
apiGet();

let commentsArray = [];

const answerComment = () => {
  const commentAnswers = document.querySelectorAll(".comment");
  for (const commentAnswer of commentAnswers) {
    commentAnswer.addEventListener("click", () => {
      textElement.value = `QUOTE_BEGIN 
          ${commentAnswer.dataset.text}${commentAnswer.dataset.userName} 
          QUOTE_END 
          Ответ:  `;
    });
  }
};

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

const likes = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      likeButton.classList.add("loadingLike");
      delay(2000).then(() => {
        likeButton.classList.remove("loadingLike");
        const index = likeButton.dataset.index;
        if (commentsArray[index].userLike === false) {
          commentsArray[index].paint = "-active-like";
          commentsArray[index].like += 1;
          commentsArray[index].userLike = true;
        } else {
          commentsArray[index].paint = "";
          commentsArray[index].like -= 1;
          commentsArray[index].userLike = false;
        }

        renderComments();
      });
    });
  }
};

const deleteButtonsUser = () => {
  const deleteButtons = document.querySelectorAll(".remove-button");
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      const index = deleteButton.dataset.index;
      commentsArray.splice(index, 1);
      renderComments();
    });
  }
};
const renderComments = () => {
 
  commentsHtml
    .join("");
  ulElement.innerHTML = commentsHtml;
  deleteButtonsUser();
  answerComment();
  likes();
};
renderComments();

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
    postTodo({text: textElement.value,
             name: nameElement.value})
              
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
        alert(error.message);
        if ((error = "Failed to fetch")) {
          alert("Нет соединения с интернетом");
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
