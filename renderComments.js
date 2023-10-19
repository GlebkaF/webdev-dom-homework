import { initEventlikes } from "./Initialization.js";
import { token } from "./api.js";
//import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js"
import { format } from "date-fns";
import { renderFormComments } from "./renderFormComments.js";
import {comments} from "./main.js";
import { renderLogin } from "./loginPage.js";

export const renderComments = () => {
  const appElement = document.getElementById("app");
    console.log(comments);
    //const country = "ru";
    const commentsHtml = comments
      .map((comment, index) => {
        const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss');
        return ` <li class="comment">
            <div class="comment-header">
              <div class="comment-name" data-index="${index}">${comment.name}</div>
              <div>${createDate}</div>
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

    const now = new Date();
    format(now, "dd/MM/yyyy hh:mm"); // 26/03/2023 10:33
    format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33
    format(now, "dd.MM.yyyy hh:mm:ss"); // 26.03.2023 10:33:41*/



    




answerText();
initEventlikes();

}