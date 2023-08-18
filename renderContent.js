import { token } from "./api.js";
import { authorization } from "./loginPage.js";
import { addLike, answer, getLikeClass } from "./renderApp.js";
import { users, name } from "./users.js"


export const renderApp = () => {
    const appElement = document.getElementById("app");
    const userHtml = users.map((user) => {
        return `<li id="last-element" class="comment">
        <div class="comment-header">
            <div>${user.author.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button class="${getLikeClass(user.isLiked)}"></button>
            </div>
          </div>
        </li>
        `
      }).join("");

      const appHtml = `
    <div class="container">
      <ul id="comments" class="comments">
        ${userHtml}
      </ul>
      ${token ? `
      <div class="add-form">
        <input
          id="name-input"
          type="text"
          class="add-form-name"
          placeholder="${name}" readonly
        />
        <textarea
          id="comment-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
      </div>
        ` : `
        <div class="authorization">
          <p>Чтобы добавить комментарий, <a class="authorization-link" href="#">авторизуйтесь</a></p>
        </div>
        `} 
    </div>
    `
      appElement.innerHTML = appHtml;

      if(!token) {
        const linkLogin = document.querySelector(".authorization-link");
        linkLogin.addEventListener("click", () => {
          authorization();
        })
      }
    addLike();
    answer();
}

