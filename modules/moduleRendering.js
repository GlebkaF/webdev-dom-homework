// Это блок для импорта функций________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

// Main Elements
import { buttonEvent } from "../main.js";
import { boxComments } from "../main.js";
import { replyBox } from "../main.js";
import { replyComment } from "../main.js";
import { replyBoxUser } from "../main.js";
import { addFormUserName } from "../main.js";
import { addFormUserText } from "../main.js";
import { entranceButtom } from "../main.js";
import { registeredUser } from "./moduleAPI.js";


// Mini Functions
import { letTime } from "./moduleMiniFunctions.js";
import { errorTextChecking } from "./moduleMiniFunctions.js";



// |                                                                                                          |
// Это блок для импорта функций_______________________________________________________________________________|


// Это блок Присваивания имён элементам________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

const container = document.getElementById("container");

// |                                                                                                          |
// Это блок Присваивания имён элементам_______________________________________________________________________|


// Это блок Рендера Контейнера страницы Входа__________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
export const renderEntranceContainer = () => {

  container.innerHTML = `<div class="add-form">
    <h1>Страница входа</h1>
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <div class="likes">
        <input type="text" id="login-input" class="add-form-name" placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="add-form-name"
          placeholder="Пароль"
        />
      </div class="likes">
        <br />
        <button class="add-form-button" id="login-button">Войти</button>
        <button class="add-form-button" id="link-to-tasks">Перейти на страницу задач</button>
      </div>
    </div>`


}

// |                                                                                                          |
// Это блок Рендера Контейнера страницы Входа_________________________________________________________________|


// Это блок Присваивания Имени в Поле Ввода комментария________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

export const userPlaceholderName = () => {

  if (registeredUser === undefined) {

    return "Авторизуйтесь.";

  } else {

    return registeredUser.user.name;
  };

};

// |                                                                                                          |
// Это блок Присваивания Имени в Поле Ввода комментария_______________________________________________________|


// Это блок Рендера Контейнера страницы комментариев___________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
export const renderCommentsContainer = (placeholderName) => {

  if (registeredUser === undefined) {

    container.innerHTML = `<ul id="comments" class="comments">
    </ul>
    <div id="add-form" class="add-form">
    <button id="entrance-button" class="add-form-button">Чтобы добавить комментарий, авторизуйтесь.</button>
    </div>`
    
  } else {

    container.innerHTML = `<ul id="comments" class="comments">
    </ul>
    <div id="add-form" class="add-form">
      <input
        id="add-form-name" 
        type="text"
        class="add-form-name"
        value='${registeredUser.user.name}'
        placeholder= '${placeholderName}'
        readonly
      />
      <div  id="reply-box"> </div>
      <textarea
        id="add-form-text" 
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">

        <button id="add-form-button" class="add-form-button">Написать</button>

      </div>
    </div>`;

  }

}

// |                                                                                                          |
// Это блок Рендера Контейнера страницы комментариев__________________________________________________________|

// Это блок Функции Загруски страницы__________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

export const loadingStartFunctionButton = () => {
  if (registeredUser === undefined) {
    entranceButtom.disabled = true;
    entranceButtom.textContent = "Загрузка данных, подождите";
  } else {
    buttonEvent.disabled = true;
    buttonEvent.textContent = "Загрузка данных, подождите";
  }
};
export const loadingСompleteFunctionButton = () => {
  if (registeredUser === undefined) {
    entranceButtom.disabled = false;
    entranceButtom.textContent = "Чтобы добавить комментарий, авторизуйтесь.";
  } else {
    buttonEvent.disabled = false;
    buttonEvent.textContent = "Написать";
  }

};


// |                                                                                                          |
// Это блок Функции Загруски страницы_________________________________________________________________________|


// Это блок Получения Визуалоного Блока комментариев в HTML____________________________________________________
// |                                                                                                          |
// V                                                                                                          V
export const renderComments = (arrComments) => {

    const commentsHtml = arrComments.map((comment, index) => {
  
      return `<li data-index="${index}" id="comment" class="comment -use-reply-comment">
  
          <div data-index="${index}" id="comment-header" class="comment-header -use-reply-comment">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
  
          <div data-index="${index}" id="reply-box-in-comm class="-use-reply-comment"">
            ${comment.replyText}
          </div>
  
          <div data-index="${index}" id="comment-body" class="comment-body -use-reply-comment">
            <div data-index="${index}" id="comment-text" class="comment-text">
              ${comment.commentText}
            </div>
          </div>
  
          <div data-index="${index}" id="comment-footer" class="comment-footer -use-reply-comment">
            <div id="likes" class="likes">
              <span id="likes-counter" class="likes-counter">${comment.numLike}</span>
              <button data-index="${index}" id="like-button" class="like-button ${usedLike(comment.liked)}"></button>
            </div>
          </div>
  
        </li>`;
  
    }).join("");
  
    boxComments.innerHTML = commentsHtml;
  
  
  };
  
// |                                                                                                          |
// Это блок Получения Визуалоного Блока комментариев в HTML___________________________________________________|

// Это блок копируемого комментария____________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

export const replyCommentCondition = (arrComments) => {

  if (replyBox.innerHTML == "" || replyBox.innerHTML == undefined) {

    let replyUserComment = "";

    return replyUserComment;

  } else {

    let replyUserComment = `<div id="reply-box" class="add-form-reply-comments">
    <div class="comment-header">
      <div>${arrComments.name}</div>
      <div>${arrComments.date}</div>
    </div>
      ${arrComments.commentText}
    </div>`;

    return replyUserComment;

  };

};

export const initDeleteReplyUserBox = (arrComments) => {

  let replyUserComment = "";

  replyBox.addEventListener("click", () => {

    event.stopPropagation()

    replyBox.innerHTML = "";

    return replyCommentCondition(arrComments);
  });

  return replyUserComment;

};

export const initReplyClick = (arrComments) => {

  const useReplyClick = document.querySelectorAll(".-use-reply-comment");

  for (const replyClick of useReplyClick) {

    replyClick.addEventListener("click", () => {

      event.stopPropagation();


      const index = replyClick.dataset.index;

      replyBox.innerHTML =
        `<div id="reply-user-box" class="add-form-reply-user">
        <div class="comment-header">
          <div>${arrComments[index].name}</div>
          <div>${arrComments[index].date}</div>
        </div>
        ${arrComments[index].commentText}
      </div>`;

      initDeleteReplyUserBox(arrComments);
      replyCommentCondition(arrComments[index]);
      const replyUserComment = replyCommentCondition(arrComments[index]);
      // console.log(replyUserComment);

      return replyUserComment;

    });


  };

};
// |                                                                                                          |
// Это блок Копируемого Комментария___________________________________________________________________________|



// Это блок Использования Лайка________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
export const initCommentsLiked = (arrComments) => {

  const useCommentsLike = document.querySelectorAll(".like-button");
  for (const useCommentLike of useCommentsLike) {



    useCommentLike.addEventListener("click", () => {

      event.stopPropagation();

      const index = useCommentLike.dataset.index;

      if (arrComments[index].liked === false) {

        arrComments[index].numLike++;
        arrComments[index].liked = true;
        renderComments(arrComments);
        initCommentsLiked(arrComments);
        initReplyClick(arrComments);
        return;

      } else {

        arrComments[index].numLike--;
        arrComments[index].liked = false;
        renderComments(arrComments);
        initCommentsLiked(arrComments);
        initReplyClick(arrComments);
        return;

      };

    });
  };
};

export const usedLike = (comm) => {

  if (comm === true) {
    return `-active-like`;
  };

};
// |                                                                                                          |
// Это блок использования Лайка_______________________________________________________________________________|

