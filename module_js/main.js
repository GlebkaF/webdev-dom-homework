import { renderComments } from "./render.js";
import { getPromise, getPost } from "./api.js";
import {
  textInputElement,
  nameInputElement,
  buttonElement,
} from "./variables.js";

getPromise();







document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});

console.log("It works!");
