import { renderComments } from "./renderComments.js";
import { delay, addComment, getData } from "./utilities.js";
import { commentsArr } from "./globalVariables.js";
import { loginUser, registrateUser, deleteComment, toggleLike } from "./API.js";

const likeButtonsListener = () => {
  let likeBottons = document.querySelectorAll(".like-button");

  for (let likeBotton of likeBottons) {
    likeBotton.addEventListener("click", () => {
      //Почему-то когда добавляю классом не применяется
      likeBotton.style.animation = "rotating 2s linear infinite";
      delay(2000).then(() => {
        toggleLike(likeBotton.dataset.indx).then(() => {
          getData();
        });
      });
    });
  }
};

const commentsListener = () => {
  let comments = document.querySelectorAll(".comment-text");
  let formText = document.querySelector(".add-form-text");

  for (let comment of comments) {
    comment.addEventListener("click", () => {
      formText.value = `QUOTE_BEGIN ${
        comment.dataset.name
      }:\n${comment.dataset.text.replace(
        comment.dataset.text.slice(
          comment.dataset.text.indexOf("QUOTE_BEGIN"),
          comment.dataset.text.lastIndexOf("QUOTE_END") > -1
            ? comment.dataset.text.lastIndexOf("QUOTE_END") + 9
            : -1
        ),
        ""
      )} QUOTE_END\n`;
      formText.focus();
    });
  }
};

const quoteListener = () => {
  let quotes = document.querySelectorAll(".quote");

  for (let quote of quotes) {
    quote.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
};

const editButtonsListener = () => {
  let editBottons = document.querySelectorAll(".edit-button");

  for (let editBotton of editBottons) {
    // if (!token) {
    editBotton.disabled = true;
    //}
    editBotton.addEventListener("click", () => {
      commentsArr[editBotton.dataset.indx].editComment = true;
      renderComments();
    });
  }
};

const saveCommentButtonsListener = () => {
  let saveCommentBottons = document.querySelectorAll(".save-comment-button");

  for (let saveComment of saveCommentBottons) {
    saveComment.addEventListener("click", () => {
      commentsArr[saveComment.dataset.indx].editComment = false;
      commentsArr[saveComment.dataset.indx].comment =
        saveComment.dataset.quote +
        document.getElementsByClassName("edit-comment")[
          saveComment.dataset.indx
        ].value;
      renderComments();
    });
  }
};

const buttonDisable = () => {
  let formName = document.querySelector(".add-form-name");
  let formText = document.querySelector(".add-form-text");
  let formButton = document.querySelector(".add-form-button");

  if (formName.value === "" || formText.value === "")
    formButton.disabled = true;
  else formButton.disabled = false;
};

const deleteLastButtonFunc = () => {
  commentsArr.pop();
  renderComments();
};

const keyEnter = (event) => {
  if (event.code === "Enter") {
    addComment();
  }
};

const login = () => {
  let loginInput = document.querySelector(".login-form__login").value;
  let passwordInput = document.querySelector(".login-form__password").value;
  loginUser({ loginInput, passwordInput }).then((responseJson) => {
    if (responseJson.error) {
      alert(responseJson.error);
    }
    window.localStorage.setItem("Token", responseJson.user.token);
    window.localStorage.setItem("userName", responseJson.user.name);
    window.localStorage.setItem("login", responseJson.user.login);
    getData();
  });
};

const registrate = () => {
  let loginInput = document.querySelector(".reg-form__login").value;
  let passwordInput = document.querySelector(".reg-form__password").value;
  let nameInput = document.querySelector(".reg-form__name").value;

  registrateUser({ loginInput, passwordInput, nameInput }).then(
    (responseJson) => {
      if (responseJson.error) {
        alert(responseJson.error);
      }
      window.localStorage.setItem("Token", responseJson.user.token);
      window.localStorage.setItem("userName", responseJson.user.name);
      window.localStorage.setItem("login", responseJson.user.login);
      getData();
    }
  );
};

const regButtonDisable = () => {
  let formName = document.querySelector(".reg-form__name");
  let formLogin = document.querySelector(".reg-form__login");
  let formPassword = document.querySelector(".reg-form__password");
  let formButton = document.querySelector(".reg-form__button");

  if (
    formName.value === "" ||
    formLogin.value === "" ||
    formPassword.value.length < 5
  )
    formButton.disabled = true;
  else formButton.disabled = false;
};

const loginButtonDisable = () => {
  let formLogin = document.querySelector(".login-form__login");
  let formPassword = document.querySelector(".login-form__password");
  let formButton = document.querySelector(".login-form__button");

  if (formPassword.value === "" || formLogin.value === "")
    formButton.disabled = true;
  else formButton.disabled = false;
};

const deleteButtonsListener = () => {
  let deleteBottons = document.querySelectorAll(".delete-button");

  for (let deleteBotton of deleteBottons) {
    if (!window.localStorage.getItem("Token")) {
      deleteBotton.disabled = true;
    }
    deleteBotton.addEventListener("click", () => {
      deleteComment(deleteBotton.dataset.indx).then(() => {
        getData();
      });
    });
  }
};

export {
  likeButtonsListener,
  commentsListener,
  quoteListener,
  editButtonsListener,
  saveCommentButtonsListener,
  buttonDisable,
  deleteLastButtonFunc,
  keyEnter,
  login,
  registrate,
  regButtonDisable,
  loginButtonDisable,
  deleteButtonsListener,
};
