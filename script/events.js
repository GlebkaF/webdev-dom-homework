import { arrComments } from "./script.js";
import { renderComments } from "./renderComment.js";

function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

const eventLike = () => {
    document.querySelectorAll(".like-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
  
        const objComment = arrComments[button.dataset.index];
        button.classList.add("-loading-like");
        delay(2000).then(() => {
          if (objComment.isLiked) {
            objComment.likes -= 1;
            objComment.isLiked = false;
          } else {
            objComment.likes += 1;
            objComment.isLiked = true;
          }
          renderComments();
          getEvent();
        });
      });
    });
  };

  const eventEdit = () => {
    document.querySelectorAll(".edit-button").forEach((button, key) => {
      button.addEventListener("click", (event) => {
        // отменяем всплытие
        event.stopPropagation();
  
        const objComment = arrComments[button.dataset.index];
        if (objComment.isEdit) {
          if (objComment.text.trim() === "") return; // в случае, если человек сотрет полностью комментарий кнопка сохранить станет неактивна;
          button.innerHTML = "Редактировать";
          objComment.isEdit = false;
        } else {
          button.innerHTML = "Сохранить";
          objComment.isEdit = true;
        }
        renderComments();
        getEvent();
      });
    });
  };

  const eventReply = () => {
    const inputText = document.querySelector(".add-form-text")
    document.querySelectorAll(".comment").forEach((item) => {
      item.addEventListener("click", () => {
        const objComment = arrComments[item.dataset.index];
        let str = objComment.text;
  
        // в случае если у нас будет реплай на реплай, мы оставим только ответ
        // цикл на случай, если будет несколько реплаев
        while (str.indexOf("<div class='quote'>") !== -1) {
          const substr = str.substring(
            0,
            str.indexOf("</div>") + "</div>".length
          );
          str = str.replace(substr, "");
        }
  
        inputText.value += `[BEGIN_QUOTE]${str} - ${objComment.author.name}[END_QUOTE]\n\n`;
  
        // переносим пользователя в поле ввода текста
        inputText.focus();
      });
    });
  };

  const evenEditInput = () => {
    document.querySelectorAll(".input-text").forEach((input) => {
      input.addEventListener("keyup", (key) => {
        const objComment = arrComments[input.dataset.index];
        objComment.text = input.value;
      });
  
      // В случае редактирования, при клики мыши срабатывало событие реплая
      input.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  };
  
  export function getEvent() {
    eventLike();
    eventEdit();
    evenEditInput();
    eventReply();
  };