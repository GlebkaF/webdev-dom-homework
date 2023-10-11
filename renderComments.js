import { initDeliteButtonsListeners, initEventlikes } from "./Initialization.js";
import { answerText } from "./answer.js";
import { postComment } from "./api.js";

const commentsElement = document.getElementById("comments");

export const renderComments = (comments) => {
  const appElement = document.getElementById("app");

    const commentsHtml = comments
      .map((comment, index) => {
        return ` <li class="comment">
            <div class="comment-header">
              <div class="comment-name" data-index="${index}">${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text" data-index="${index}">
              ${comment.text}
              </div>
            </div>  
            
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button"></button>
              </div>
            </div>
          </li> `;
      })
      .join("");

      const appHtml = `
      <div class="container">
      <ul class="comments" id="comments">${commentsHtml}
       <!-- Список рендерится из JS-->
      </ul>
      <button class="delete-button">Удалить последний элемент</button>
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
       </div>
      </div>`
  
    appElement.innerHTML = appHtml;

const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.querySelector(".add-form-text");
const textareaInputElement = document.getElementById("textarea-input");
    
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
    
      renderComments(comments);
    };
    
    // Добавили отправку коммента по нажатию на Enter
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        onSubmit();
      }
    });
    
    renderComments(comments);
    
    // Вынесли код обработчика в отдельную функцию onSubmit - (enterPress)
    buttonElement.addEventListener("click", onSubmit);
    

    answerText();
    initEventlikes();
    initDeliteButtonsListeners(comments);
    
  };