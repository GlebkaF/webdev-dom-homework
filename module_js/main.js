import { renderComments } from "./render.js";
import { getPromise, getPost } from "./api.js";
import {
  textInputElement,
  nameInputElement,
  buttonElement,
} from "./variables.js";

getPromise();



// buttonElement.addEventListener("click", () => {
//   buttonElement.classList.remove("add-form-button-error");
//   buttonElement.classList.add("add-form-button");
//   nameInputElement.classList.remove("error");
//   textInputElement.classList.remove("error");

//   if (nameInputElement.value === "" || textInputElement.value === "") {
//     buttonElement.classList.remove("add-form-button");
//     buttonElement.classList.add("add-form-button-error");

//     if (nameInputElement.value === "") {
//       nameInputElement.classList.add("error");
//     }
//     if (textInputElement.value === "") {
//       textInputElement.classList.add("error");
//     }

//     return;
//   }

//   buttonElement.disabled = true;
//   buttonElement.textContent = "Элемент добавлятся...";

//   getPost();
// });

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});

console.log("It works!");
