import { options } from "./api.js";
import getApi from "./api.js";
import { postApi } from "./api.js";
import { nameInputElement } from "./api.js";
import { textInputElement } from "./api.js";
import renderComments from "./render.js";

const buttonElement = document.getElementById("add-button");
// const deleteButtonElement = document.getElementById("delete-button");
export const listElement = document.getElementById("list");

const mainForm = document.querySelector(".add-form");

const loaderStartElement = document.getElementById("loader-start");
const loaderPostElement = document.getElementById("loader-post");

export let comments = [];

// Получаем данные из хранилища

loaderStartElement.textContent = 'Пожалуйста, подождите, загружаю комментарии...';

const fetchAndRenderComments = () => {
  // fetch - запускает запрос в api
  return getApi()
    .then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString("ru-RU", options),
          text: comment.text,
          counter: comment.likes,
          liked: false,
        };
      });
      // получили данные и рендерим их в приложении
      renderComments();
    })
    .then(() => {
      loaderStartElement.style.display = "none";
    })
    .catch((error) => {
      alert("Кажется, что-то пошло не так, попробуйте позже");
      // TODO: Отправлять в систему сбора ошибок
      console.warn(error);
    });
};

loaderPostElement.style.display = "none";


// Оживляем кнопку лайков

export const changeLikesListener = () => {
  const buttonLikeElements = document.querySelectorAll(".like-button");

  for (const buttonLikeElement of buttonLikeElements) {
    buttonLikeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = buttonLikeElement.dataset.index;

      if (comments[index].liked === false) {
        comments[index].liked = true;
        comments[index].counter += 1;
      } else if (comments[index].liked === true) {
        comments[index].liked = false;
        comments[index].counter -= 1;
      }
      renderComments();
    });
  }
};

//Добавление комментария

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === "" || textInputElement.value === "") {
    nameInputElement.classList.add("error");
    textInputElement.classList.add("error");
    return;
  }

  postApi()
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        mainForm.style.display = "none";
        loaderPostElement.style.display = "flex";
        nameInputElement.value = "";
        textInputElement.value = "";
        return response.json();
      } else if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        // return Promise.reject("Сервер упал");
      } else if (response.status === 400) {
        alert("Имя и комментарий должны быть не короче 3 символов");
        // return Promise.reject("Сервер упал");
      }
    })
    .then(() => {
      return fetchAndRenderComments();
    })
    .then(() => {
      loaderPostElement.style.display = "none";
      mainForm.style.display = "flex";

    })
    .catch((error) => {
      buttonElement.disabled = false;
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      // TODO: Отправлять в систему сбора ошибок
      console.warn(error);
    });

  renderComments();
});

// кнопка удалить последний комментарий
// function deleteComments() {
//   const deleteButtons = document.querySelectorAll(".delete-button");
//   for (const deleteButton of deleteButtons) {
//     deleteButton.addEventListener("click", (event) => {
//       console.log(deleteButton);
//       event.stopPropagation();
//       const index = deleteButton.dataset.id;
//       comments.splice(index, 1);
//       renderComments
//     })
//   }
// };



// блокировка кнопки написать
const validateInput = () => {
  if (nameInputElement.value === "" || textInputElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};
const buttonBlock = () => {
  validateInput();
  document.querySelectorAll("#name-input,#text-input").forEach((el) => {
    el.addEventListener("input", () => {
      validateInput();
    });
  });
};

// ввод по кнопке enter

mainForm.addEventListener('keydown', (e) => {
  if (!e.shiftKey && e.key === 'Enter') {
    buttonElement.click();
    nameInputElement.value = '';
    textInputElement.value = '';
  }
});


// ответ на комментарии

export const editComment = () => {
  const comments = document.querySelectorAll(".comment");
  const textInputElement = document.getElementById("text-input");
  for (const comment of comments) {
    comment.addEventListener("click", () => {
      const textComment = comment.dataset.text;
      textInputElement.value = textComment;
    });
  }
};


fetchAndRenderComments();
renderComments();
buttonBlock();
