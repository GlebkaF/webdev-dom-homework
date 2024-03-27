import {getCurrentDate} from "./date.js";
import {textareaInputElement, nameInputElement} from "./main.js";

export function fetchGet() {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/sergey-syomin/comments",
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
};

export function fetchPost  () {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/sergey-syomin/comments",
    {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        date: getCurrentDate(new Date()),
        text: textareaInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("QUOTE_BEGIN", "<div class='comment-quote'><b>")
          .replaceAll("QUOTE_END", "</b></div>"),
        currentLike: false,
        likes: 0,
        // проверка обработки ошибок
        forceError: false,
      }),
    }
  ).then((response) => {
    if (response.status === 500) {
      // код обработки ошибки
      throw Error("Server error");
    } else if (response.status === 400) {
      throw Error("Wrong request");
    } else {
      return response.json();
    }
  });
};
