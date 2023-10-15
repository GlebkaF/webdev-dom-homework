import { container } from "./main.js";
import { addComment } from "./main.js";

export function formForComments() {
  const appForm = `<div class="add-form" id="formUser">
  <div class="input-block">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
  <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea></div>
    <div class="add-form-row">
    <button class="add-form-button">Написать</button>
    </div>
  </div>`;
  container.innerHTML += appForm;

  const button = document.querySelector(".add-form-button");
  const addName = document.querySelector(".add-form-name");
  const addText = document.querySelector(".add-form-text");

  function validation() {
    if (!addName.value || !addText.value) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }
  addName.addEventListener("input", validation);
  addText.addEventListener("input", validation);

  addComment(button, addName, addText);
}
