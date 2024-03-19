import { isLoading } from "./api.js";

export const comLoader = () => {
  const appLoader = document.getElementById("app");
  if (isLoading) {
    const loaderHTML = `<div class="loader" id="com-loader">
    Пожалуйста подождите, комментарии загружаются...
  </div>`;
    appLoader.innerHTML = loaderHTML;
  } else {
    appLoader.innerHTML = ``;
  }
};

export const formLoader = () => {
  const appFormLoader = document.getElementById("app");
  if (isLoading) {
    const formLoaderHTML = `<div class="loader" id="form-loader">
    Комментарий добавляется...
  </div>`;
    appFormLoader.innerHTML = formLoaderHTML;
  } else {
    appFormLoader.innerHTML = ``;
  }
};
