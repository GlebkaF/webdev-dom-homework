// Это блок для импорта функций________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

// Mini Functions
import { letTime } from "./moduleMiniFunctions.js";
import { errorTextChecking } from "./moduleMiniFunctions.js";

// |                                                                                                          |
// Это блок для импорта функций_______________________________________________________________________________|


// Это блок Присваивания имён элементам________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

const buttonEvent = document.getElementById("add-form-button");
const boxComments = document.getElementById('comments');

const replyBox = document.getElementById('reply-box');
const replyComment = document.getElementById('add-form-reply');

const replyBoxUser = document.getElementById('reply-user-box');

const addFormUserName = document.getElementById('add-form-name');
const addFormUserText = document.getElementById('add-form-text');

// |                                                                                                          |
// Это блок Присваивания имён элементам_______________________________________________________________________|


// Это блок Функции Загруски страницы__________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

export const loadingStartFunctionButton = () => {

  buttonEvent.disabled = true;
  buttonEvent.textContent = "Загрузка данных, подождите";

};
export const loadingСompleteFunctionButton = () => {

  buttonEvent.disabled = false;
  buttonEvent.textContent = "Написать";

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

      event.stopPropagation()


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

      event.stopPropagation()

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

