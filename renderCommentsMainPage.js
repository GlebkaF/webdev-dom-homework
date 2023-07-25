import { renderLogin } from "./renderLogin.js";
import { fetchPromiseFunctionGet } from "./main.js";

const appElement = document.querySelector(".app"); // элемент для отрисовки

// отрисовка главной страницы
export const renderCommentsMainPage = ({ comments }) => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li id="comment-item" class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body" >
        <div class="comment-text">
          ${comment.text} 
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes" >
          <span class="likes-counter" data-count="${comment.likes}">${comment.likes}</span>
          <button class="like-button" data-active-like="${comment.isLiked}"></button>
        </div>
      </div>
      </li>
      `;
    })
    .join("");

  const appHtml = `
    <ul class="comments" id="list">${commentsHtml}</ul>
    <div class="authorization-link">
      <span class="textAuthorization">Что бы оставить комментарий, пожалуйста <button class="button-color">авторизуйтесь</button></span>
    </div> 
  
  `;

  appElement.innerHTML = appHtml;

  // Кнопка "авторизоваться"
  const hideAnElementWhenSwitchingToAuthorization =
    document.querySelector(".button-color");

  // Обработчик события кнопки авторизовать
  hideAnElementWhenSwitchingToAuthorization.addEventListener("click", () => {
    // список комментариев
    const hiddenComments = document.querySelector(".comments");

    // скрыть список комментариев
    hiddenComments.classList.add("hidden"); 

    // вызов появление формы входа
    renderLogin({ fetchPromiseFunctionGet }); 
  });
};
