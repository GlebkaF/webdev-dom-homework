import { getData } from "./utilities.js";

window.addEventListener("load", () => {
  let comments = document.querySelector(".comments");
  let loaderText = document.createElement("p");
  loaderText.className = "startLoader";
  loaderText.textContent = "Пожалуйста подождите, загружаю комментарии...";
  comments.before(loaderText);
  getData().then(() => {
    loaderText.remove();
  });
});
