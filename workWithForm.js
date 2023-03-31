import { renderComments, nameInputElement, commentInputElement, mainForm, addComment } from "./script.js";
import { comments } from "./script.js";

// Функция удаления последнего комментария
export function delComment() {
    comments.pop()
      renderComments();
  }


  // Отчистка данных с поля
export function delValue() {
    nameInputElement.value = "";
    commentInputElement.value = "";
  };
  
// // Ввод по нажатию клавиши Enter

  export function pushCommentwithEnter(){
    mainForm.addEventListener('keyup', (event) => {
  
      if (event.code === "Enter"  ) {
        addComment.click();
       
        delValue();
      }
    });  
  }

  // Блокировка кнопки ввода()
  export const buttonBlock = () => {
    document.querySelectorAll("#name-input,#comment-input").forEach((el) => {
      el.addEventListener("input", () => {
        if (document.getElementById("name-input").value === '' || document.getElementById("comment-input").value === '')
          document.getElementById("add-button").disabled = true;
        else
          document.getElementById("add-button").disabled = false;
      });
    });
  }