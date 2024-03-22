import { isLoading } from "./api.js";
import { fetchGetAndRenderComments } from "./main.js";
import { textValue } from "./renderComments.js";


export const formLoader = () => {
  const appFormLoader = document.getElementById("add-form");
  if (isLoading) {
    debugger
    fetchGetAndRenderComments();
    const textEl = document.getElementById("add-form-text");
    textEl.value = textValue;
  }
  else {
    appFormLoader.innerHTML = `<div class="loader" id="form-loader">
    Комментарий добавляется...
  </div>`;
  }
};
