import {initDeliteButtonsListeners} from "./Initialization.js";
import {postComment} from "./api.js";
import { fetchAndRenderComments } from "./main.js";

export const renderFormComments = () => {
    
    const formCommentsHtml = document.querySelector(".formComments")
    const formComments = `<button class="delete-button">Удалить последний элемент</button>
    <div class="add-form">
      <input
        type="text" id="name-input"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea
        type="textarea" id="textarea-input"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
     </div>`
     formCommentsHtml.innerHTML = formComments;

    const buttonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.querySelector(".add-form-text");
    const textareaInputElement = document.getElementById("textarea-input");


     initDeliteButtonsListeners();

     const onSubmit = () => {
        nameInputElement.classList.remove("error");
        if (nameInputElement.value === "") {
          nameInputElement.classList.add("error");
          return;
        }
        textareaInputElement.classList.remove("error");
        if (textareaInputElement.value === "") {
          textareaInputElement.classList.add("error");
          return;
        }
      
        // Кнопка написать не активна при пустых значениях //
        buttonElement.setAttribute("disabled", true);
        nameInputElement.oninput = function () {
          if (nameInputElement.value === "" && textareaInputElement.value === "") {
            buttonElement.setAttribute("disabled", true);
            return;
          } else {
            buttonElement.removeAttribute("disabled");
            return;
          }
        };
      
        // Добавляем изменение кнопки на Элемент добавляется
       const startAt = Date.now();
      
        buttonElement.disabled = true;
        buttonElement.textContent = "Элемент добавляется...";
      
        // POST
        postComment({
          name: nameInputElement.value,
          text: textInputElement.value,
        })
          .then((response) => {
            console.log("Время: " + (Date.now() - startAt));
            return response;
          })
          .then(() => {
            fetchAndRenderComments();
          })
          .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            nameInputElement.value = "";
            textareaInputElement.value = "";
          })
          // Интернет отключили
          .catch((response) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            if (response.status === 400) {
              alert("Пропал интернет, попробуй позже");
            } else {
              return response;
            }
          });
      
      };
      
      // Добавили отправку коммента по нажатию на Enter
      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          onSubmit();
        }
        buttonElement.addEventListener("click", onSubmit);
      });
}