import { initEventlikes } from "./Initialization.js";
import { token } from "./api.js";

import { renderFormComments } from "./renderFormComments.js";
import {comments} from "./main.js";

import { renderLogin } from "./loginPage.js";
//import { renderRegistration } from "./registrationPage.js";

export const renderComments = () => {
  const appElement = document.getElementById("app");
    console.log(comments);
    const commentsHtml = comments
      .map((comment, index) => {
        return ` <li class="comment">
            <div class="comment-header">
              <div class="comment-name" data-index="${index}">${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text" data-index="${index}">
              ${comment.text}
              </div>
            </div>  
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button"></button>
              </div>
            </div>
          </li> `;
      })
      .join("");

      const appHtml = `
      <div class="container">
      <ul class="comments" id="comments">${commentsHtml}
      </ul>
      <div class="formComments">
  </div>
</div>`

    appElement.innerHTML = appHtml;

  

    token ? renderFormComments(): renderLoginButton();
    function renderLoginButton () {
      const formComments = document.querySelector(".formComments");
      formComments.innerHTML = `<p id="login">Авторизоваться</p>`
      const login = document.getElementById("login");
      login.addEventListener("click", () => {
        renderLogin();
      })
  }




  const textInputElement = document.querySelector(".add-form-text");
  const answerText = () => {
      const textTextElement = document.querySelectorAll(".comment-text");
      const textNameElement = document.querySelectorAll(".comment-name");
      for (const text of textTextElement) {
        text.addEventListener("click", () => {
          const index = text.dataset.index;
          textInputElement.value = `${textTextElement[index].innerHTML} ${textNameElement[index].innerHTML}`;
        });
      }
    };


answerText();
initEventlikes();

}