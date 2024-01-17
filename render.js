import { initLikeListener } from "./main.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { quoteCommets, commentList } from "./main.js";
import { setToken, token, loginPost, getComments, setUser } from "./api.js";

// Сохраняем данные об объекте User в localStorage
// Сохраняем данные об объекте User в localStorage


//Рендерим форму входа
export const renderLoginForm = () => {
  const appHtml = document.getElementById("app");
  const loginHtml = `
  <div class="add-form">
    <input 
    type="text"
    id="login-input" 
    class="add-form-name"
    placeholder="Логин"
    />
    <input 
    type="text"
    id="password-input"
    class="add-form-name"
    placeholder="Пароль"
    />
    <button id="login-form-button" class="add-form-button">Войти</button>
  </div>`;
  appHtml.innerHTML = loginHtml;

  //Добавляем действие по клику на "авторизация"
  const buttonLoginElement = document.getElementById("login-form-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonLoginElement.addEventListener("click", (event) => {
    event.preventDefault();
    if (!loginInputElement.value || !passwordInputElement.value) {
      alert("Проверьте оба поля  на заполненность");
      return
    }
    loginPost({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      setToken(responseData.user.token);
      setUser(responseData.user);

    }).then(() => {

    })
  });
};
//Выводим комменты
export const renderComments = () => {
  const appHtml = document.getElementById("app");
  console.log(commentList);
  const commentsHtml = commentList.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div id="">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div id="" class="comment-text" >
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <button id="delete-form-button" class="delete-form-button" data-index="${index}">Удалить</button>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
  }).join("");

  //Форма ввода комментария
  const contentHtml = () => {

    const btnLogin = `
    <p class="render-login-btn">  Чтобы добавить комментарий, 
    <a id="render-login-btn">авторизуйтесь</a> </p>`

    if (!token) return `<ul id="comments" class="comments">${commentsHtml}</ul> ${btnLogin}`;
    return `<ul id="comments" class="comments">${commentsHtml}</ul>
    <div id="add-form" class="add-form">
      <input id="add-name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="add-text" type="textArea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-form-button" class="add-form-button">Написать</button>
      </div>
    </div>`
  }

  initLikeListener();
  initDeleteButtonsListeners();
  quoteCommets();
  appHtml.innerHTML = contentHtml()

  //Переход к форме авторизации по клику
  const buttonElement = document.getElementById("render-login-btn");
  buttonElement.addEventListener("click", (event) => {
    event.preventDefault();
    renderLoginForm();
  });

  const fetchAndRenderComments = (comments) => {
    getComments({ token: setToken() })
      .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            id: comment.id,
            name: comment.author.name,
            date: createDate,
            text: comment.text,
            likes: comment.likes,
            isLiked: comment.isLiked,
          };
        });
        comments = appComments;
        renderComments(comments);
      });
    
  };fetchAndRenderComments(comments);
};


