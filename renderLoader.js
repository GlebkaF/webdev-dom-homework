import { isLoading } from "./api.js";

export const comLoader = () => {
  if (isLoading) {
    const appLoader = document.getElementById("com-loader");
    const loaderHTML = `<div class="loader" id="com-loader">
    Пожалуйста подождите, комментарии загружаются...
  </div>`;

    appLoader.innerHTML = loaderHTML;
  } else {
    const appLoader = document.getElementById("com-loader");
    const loaderHTML = ``;

    appLoader.innerHTML = loaderHTML;
  }
};
