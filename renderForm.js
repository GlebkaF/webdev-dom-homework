import { userInput1, userInput2 } from "./userinput.js";
import { fetchGetAndRenderComments } from "./main.js";
import { fetchPost, setLoading } from "./api.js";
import { formLoader } from "./renderLoader.js";

export const renderForm = (userName) => {
  const appElement = document.getElementById("app");
  const formHTML = `
    <div class="container">
    <div id="add-form" class="add-form">
    <input id="add-form-name" readonly type="text" class="add-form-name" value="${userName}" />
    <textarea id="add-form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button id="add-form-button" class="add-form-button">Написать</button>
    </div>
  </div>
    `;
  appElement.innerHTML = formHTML;

  const nameEl = document.getElementById("add-form-name");
  const textEl = document.getElementById("add-form-text");
  const buttonEl = document.getElementById("add-form-button");
  const formEl = document.getElementById("add-form");

  buttonEl.disabled = true;

  userInput1({ nameEl, textEl, formEl, buttonEl });

  buttonEl.addEventListener("click", () => {
    userInput2({ nameEl, textEl });

    const fetchPostAndRenderComments = () => {
      fetchPost({ text: textEl.value, name: nameEl.value })
        .then(() => {
          return fetchGetAndRenderComments();
        })
        .then(() => {
          buttonEl.disabled = true;
          textEl.value = "";
          setLoading(false);
          formLoader();
          formEl.classList.remove("add-form_displayNone");
        })
        .catch((error) => {
          setLoading(false);
          formLoader();
          formEl.classList.remove("add-form_displayNone");

          if (error.message === "Неправильный запрос") {
            alert("Длина имени и комментария должна быть более 3 символов");
            console.warn(error);
            return;
          }
          if (error.message === "Сервер сломался") {
            console.warn(error);
            console.log("Повторная отправка");
            fetchPostAndRenderComments();
            return;
          }
          if (error.message === "Failed to fetch") {
            console.warn(error);
            alert(
              "Сбой подключения! Пожалуйста, проверьте подключение и повторите отправку."
            );
            comLoader.textContent =
              "Комментарии не загружены. Пожалуйста, проверьте подключение и повторите отправку.";
            return;
          }
        });
    };
    fetchPostAndRenderComments();
    
  });
};
