import { isLoading } from "./api.js";

export const comLoader = () => {
  const appLoader = document.getElementById("app");
  if (isLoading) {
    appLoader.textContent = "Пожалуйста подождите, комментарии загружаются...";
  } 
};

export const formLoader = () => {
  const appFormLoader = document.getElementById("app");
  if (isLoading) {
    appFormLoader.innerHTML = `<div class="loader" id="form-loader">
    Комментарий добавляется...
  </div>`;
  } else {
    appFormLoader.innerHTML = ``;
  }
};
