import { objOfConst } from "./constant.js";
import { disabledFunction } from "./disable.js"; 
import { fetchPostAndErrors } from "./api.js";

// Добавление нового комментария с валидацией

export function addCommentByClick() {
    objOfConst.buttonElement.addEventListener("click", () => {
    const clearInput = () => {
      objOfConst.nameInputElement.classList.remove("error");
      objOfConst.commentInputElement.classList.remove("error");
      objOfConst.buttonElement.disabled = false;
    };
  
    objOfConst.nameInputElement.addEventListener("click", clearInput);
    objOfConst.commentInputElement.addEventListener("click", clearInput);
  
    if (objOfConst.nameInputElement.value === "") {
      objOfConst.nameInputElement.classList.add("error");
      objOfConst.buttonElement.disabled = true;
      return;
    }
  
    if (objOfConst.commentInputElement.value === "") {
      objOfConst.commentInputElement.classList.add("error");
      objOfConst.buttonElement.disabled = true;
      return (objOfConst.commentInputElement.value = "");
    }
  
    disabledFunction(true);
    objOfConst.addingText.style.opacity = "1";
  
    return fetchPostAndErrors();
  
  });
}
  
  // Добавление через клавишу Enter
  
  export function addCommentByEnter() {document.addEventListener("keypress", function (e) {
    const key = e.which || e.keyCode;
    if (key === 13) {
      objOfConst.buttonElement.click();
    }
  });
}