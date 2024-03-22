import { isLoading } from "./api.js";

export const formLoader = () => {
  const appFormLoader = document.getElementById("add-form");
  if (isLoading) return;
  {
    appFormLoader.innerHTML = `<div class="loader" id="form-loader">
    Комментарий добавляется...
  </div>`;
  }
};
