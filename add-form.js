import { sanitizeHtml } from "./sanitizeHtml.js";
import { checkInputs } from "./checkInputs.js";
import { postCommentAPI, getComments } from "./api.js";

const buttonElement = document.getElementById("add-form-button");
const addForm = document.querySelector(".add-form");
export const addFormText = document.getElementById("add-form-text");
const loaderText = document.querySelector(".loader-text");

export const renderAddForm = (name) => {
  const appElem = document.getElementById("app");
  const addFormHTML = `
    <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          id="add-form-name"
          value = ${name}
          disabled
        />
        <textarea
          type="textarea"
          class="add-form-text"
          id="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-form-button" class="add-form-button">Написать</button>
        </div>
      </div>
      
      <p class="loader-text hidden">Загрузка комментария..</p>
    `;

  appElem.innerHTML = addFormHTML;

  // buttonElement.disabled = true;

  // addFormName.addEventListener("input", () => {
  //       checkInputs([addFormName.value, addFormText.value], buttonElement)
  // });

  addFormText.addEventListener("input", () => {
    checkInputs([addFormText.value], buttonElement);
  });

  buttonElement.addEventListener("click", () => {
    // addFormName.classList.remove("error");
    addFormText.classList.remove("error");
    // if(addFormName.value === "") {
    //   addFormName.classList.add("error");
    //   buttonElement.setAttribute('disabled', "");
    //   return;
    // }
    if (addFormText.value === "") {
      addFormText.classList.add("error");
      buttonElement.setAttribute("disabled", "");
      return;
    }
    buttonElement.disabled = true;
    addForm.classList.add("hidden");
    loaderText.classList.remove("hidden");
    postCommentAPI({ text: sanitizeHtml(addFormText.value) })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Плохой запрос");
        }
        if (response.status === 500) {
          throw new Error("Сервер сломался");
        }
      })
      .then(() => {
        return getComments();
      })
      .then(() => {
        buttonElement.disabled = false;
        addForm.classList.remove("hidden");
        loaderText.classList.add("hidden");
        addFormText.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        addForm.classList.remove("hidden");
        loaderText.classList.add("hidden");
        if (error.message === "Сервер сломался") {
          postCommentAPI({ text: sanitizeHtml(addFormText.value) });
          return;
        } else if (error.message === "Плохой запрос") {
          alert(
            "Имя или текст не должны быть короче 3 символов, попробуй снова"
          );
          return;
        } else {
          alert("Что-то пошло не так, проверьте интернет");
        }
        console.log(error);
      });
  });
};
