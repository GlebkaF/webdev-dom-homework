import { initDeliteButtonsListeners, initEventlikes } from "./Initialization.js";
import { answerText } from "./answer.js";
import { token } from "./api.js";
import {renderLogin} from "./loginPage.js";
import { renderFormComments } from "./renderFormComments.js";
import {comments} from "./main.js";

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

   
    
answerText();
initEventlikes();

}