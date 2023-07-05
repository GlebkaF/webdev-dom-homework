import { renderApp } from "./render.js";
import { getPromise, getPost, regUser, loginUser } from "./api.js";
import { letClearForm } from "./changeElement.js";

export function copyComment() {
  const commentsElement = document.querySelectorAll(".comment");

  const textInputElement = document.getElementById("user-text");

  for (const comment of commentsElement) {
    comment.addEventListener("click", () => {
      textInputElement.value =
        `> ${comment
          .querySelector(".comment-text")
          .innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}` +
        `\n\n${comment
          .querySelector(".comment-header")
          .children[0].innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`;
    });
  }
}

export function initLike(array) {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonElements) {
    const index = likeButton.dataset.index;
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (array[index].isLiked) {
        array[index].likes--;
      } else {
        array[index].likes++;
      }
      array[index].isLiked = !array[index].isLiked;

      renderApp(array);
    });
  }
}

// export const formatDate = (commentDate) => {
//   let date = new Date();
//   const formattedDate =
//     date.getDate().toString().padStart(2, "0") +
//     "." +
//     (date.getMonth() + 1).toString().padStart(2, "0") +
//     "." +
//     date.getFullYear().toString().slice(-2) +
//     " " +
//     date.getHours().toString().padStart(2, "0") +
//     ":" +
//     date.getMinutes().toString().padStart(2, "0");

//   return formattedDate;
// };

export const sendComment = () => {
  const nameInputElement = document.getElementById("user-name");
  const textInputElement = document.getElementById("user-text");

  const loadingListElement = document.querySelector(".loading-text");
  const addFormElement = document.querySelector(".add-form");

  letClearForm(nameInputElement);
  letClearForm(textInputElement);

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    if (textInputElement.value.replaceAll("\n", "") === "") {
      textInputElement.classList.add("error");
    }
    return;
  }
  if (textInputElement.value.replaceAll("\n", "") === "") {
    textInputElement.classList.add("error");
    return;
  }

  addFormElement.classList.add("disnone");
  loadingListElement.classList.remove("disnone");

  getPost();
};

export const authorizationUser = (setToken, setUser) => {
  const login = document.getElementById("inputForRegLogin").value;
  const password = document.getElementById("inputForRegPassword").value;
  if (!login) {
    alert("Введите логин");
    return;
  }
  if (!password) {
    alert("Введите пароль");
    return;
  }
  loginUser(login, password)
    .then((user) => {
      setToken(`Bearer ${user.user.token}`);
      setUser(user.user.name);
      getPromise();
    })
    .catch((error) => {
      alert(error.message);
    });
};

//---функция регистрации:
export const registrationUser = (setToken, setUser) => {
  const login = document.getElementById("inputForRegLogin").value;
  const name = document.getElementById("inputForRegName").value;
  const password = document.getElementById("inputForRegPassword").value;
  if (!name) {
    alert("Введите имя");
    return;
  }
  if (!login) {
    alert("Введите логин");
    return;
  }
  if (!password) {
    alert("Введите пароль");
    return;
  }
  regUser(login, password, name)
    .then((user) => {
      setToken(`Bearer ${user.user.token}`);
      setUser(user.user.name);
      getPromise();
    })
    .catch((error) => {
      alert(error.message);
    });
};
