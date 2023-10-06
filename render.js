import { appComment, appFormElement  } from "./ui.js";
import { initLikeComments, initReplyComment, deleteComment } from "./renderComments.js";




export { renderComments, renderForms };


    function renderComments({ comments }) {  
      const commentsHTML = comments
          .map((comment, ind) => {
          let currentTime = new Date(comment.date);
          let commentTime = `${currentTime.toLocaleDateString('ru-Ru', { day: "2-digit", month: "2-digit", year: "2-digit" })} ${currentTime.toLocaleTimeString('ru-Ru', { hour: "2-digit", minute: "2-digit" })}`;
          return `
              <li data-index="${comment.id}" class="comment">
                  <div class="comment-header">
                      <div>${comment.author.name} (${comment.author.login})</div>
                      <div>${commentTime}</div>
                  </div>
                  <div class="comment-body">
                      <div class="comment-text">
                      ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}
                      </div>
                  </div>
                  <div class="comment-footer">
                      <div class="likes">
                      <span class="likes-counter">${comment.likes}</span>
                      <button data-index="${ind}" class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
                      </div>
                  </div>
              </li> `;
        }).join("");

    
      appComment.innerHTML = `<ul class="comments">${commentsHTML}</ul>
      <div class="delete-form">
      <button class="delete-form-button">Удалить последний комментарий</button>
      </div>`;

      initLikeComments({ comments }); 
      initReplyComment({ comments });
      deleteComment({ comments });
    
    }

    function renderForms(userName, userLogin) {
      appFormElement.innerHTML = `
        <div class="add-form">
          <input type="text" readonly class="add-form-name" id="userNameInput" value="${userLogin ? `${userLogin} (${userName})` : ''}">
          <textarea type="textarea" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button class="add-form-button">Написать</button>
          </div>
        </div>
        <div class="add-form-progress">
          <p>Ваш комментарий добавляется...</p>
        </div>`;
    }
