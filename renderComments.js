import { sanitize } from "./sanitize.js";
import { initLikeButtonListener } from "./likebutton.js";
import { initReplayListener } from "./reply.js";
import { renderLogin, userLogin, setLogin } from "./renderLogin.js";
import { fetchGetAndRenderComments } from "./main.js";
import { setLoading } from "./api.js";
import { userInput1, userInput2 } from "./userinput.js";
import { fetchPost } from "./api.js";
import { formLoader } from "./renderLoader.js";

export let textValue;

export const textEl = document.getElementById("add-form-text");

export function renderComments(comments) {
  console.log("renderComments");
  const appElement = document.getElementById("app");

  const formHTML = `${userLogin
      ? `
      <div id="add-form" class="add-form">
    <input id="add-form-name" readonly type="text" class="add-form-name" value="${userLogin}" />
    ${textValue ? `<textarea id="add-form-text" type="textarea" class="add-form-text" rows="4" placeholder="Введите ваш коментарий">${textValue}</textarea>` : '<textarea id="add-form-text" type="textarea" class="add-form-text" rows="4" placeholder="Введите ваш коментарий"></textarea>'}
     <div class="add-form-row">
      <button id="add-form-button" class="add-form-button">Написать</button>
    </div>`
      : `<div id="login-text" class="loader">Чтобы добавить комментарий, <span class="login-link"  id="login-link">авторизуйтесь</span></div>`
    }`;

  const commentsHtml = comments
    .map((comment, index) => {
      let editComment = () => {
        if (comment.isEdit) {
          return `<textarea data-index="${index}" id="add-form-edit-text" type="textarea" class="add-form-edit-text" placeholder=""
  rows="4" > ${sanitize(comment.text)}</textarea>`;
        } else {
          return `${sanitize(comment.text)} `;
        }
      };
      return `<li class="comment">
        <div class="comment-header">
          <div>${sanitize(comment.name)}</div>
          <div id="add-form-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div data-index="${index}" class="comment-text" style="white-space:pre-line">
            <a class="replay-form-link" ${comment.isEdit ? "" : 'href="#add-form"'
        }> ${editComment()}</a>
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span data-index="${index}" class="likes-counter">${comment.like_count
        }</span>
            <button data-index="${index}" class="like-button ${comment.like_active ? "-active-like" : ""
        }"></button>
          </div>
        </div >
      </li>`;
    })
    .join("");

  appElement.innerHTML = `
  <ul id="list" class="comments">
    ${commentsHtml}
  </ul>
  ${formHTML}
  </div>`;

  setLoading(true);

  authAction();
  formAction();
  initReplayListener({ comments });
  initLikeButtonListener(comments);
}

function authAction() {
  if (userLogin) return;
  const loginLinkEl = document.getElementById("login-link");
  loginLinkEl.addEventListener("click", () => {
    renderLogin({ fetchGetAndRenderComments });
  });
}

export function formAction() {
  if (!userLogin) return;
  const nameEl = document.getElementById("add-form-name");
  const textEl = document.getElementById("add-form-text");
  const buttonEl = document.getElementById("add-form-button");
  const formEl = document.getElementById("add-form");

  textEl.addEventListener("input", ev);
  function ev(event) {
    textValue = event.target.value;
  }

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
          textValue = "";
          setLoading(true);
          formLoader();
        })
        .catch((error) => {
          // debugger
          if (error.message === "Неправильный запрос") {
            alert("Длина имени и комментария должна быть более 3 символов");
            console.warn(error);
            textValue = textEl.value;
            setLoading(true);
            formLoader();
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
            const appElement = document.getElementById("app")
            appElement.textContent =
              "Комментарии не загружены. Пожалуйста, проверьте подключение и повторите отправку.";
            return;
          }
        });
    };
    fetchPostAndRenderComments();
  });
}
