import { isLoading } from "./api.js";
import { fetchGetAndRenderComments } from "./main.js";

export const formLoader = () => {
  const appFormLoader = document.getElementById("add-form");
  if (isLoading) {
    fetchGetAndRenderComments();
  }
  else {
    appFormLoader.innerHTML = `<div class="loader" id="form-loader">
    Комментарий добавляется...
  </div>`;
  }
};
