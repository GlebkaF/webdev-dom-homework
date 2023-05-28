import { textElement } from "./data.js";
import { delay, correctDate } from "./handleFunctions.js";

const renderComments = (element, comments) => {
    element.innerHTML = comments.map(comment => {
      return `
      <li class="comment">
          <div class="comment-header">
              <div>${comment.author.name}</div>
              <div>${correctDate(comment.date)}</div>
          </div>
          <div class="comment-body">
              <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
              <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}"></button>
              </div>
          </div>
      </li>`;
    }).join('');
  
    [...document.querySelectorAll('.like-button')]
    .forEach((like, index) => {
        like.addEventListener('click', event => {
            event.stopPropagation();
  
            comments[index].isLikeLoading = true;
  
            renderComments(element, comments);
  
            delay(2000)
            .then(() => {
                comments[index].isLiked ? comments[index].likes-- : comments[index].likes++;
  
                comments[index].isLiked = !comments[index].isLiked;
                comments[index].isLikeLoading = false;
  
                renderComments(element, comments);
            });
        });
    });
    [...document.querySelectorAll('.comment')]
    .forEach((comment, index) => {
        comment.addEventListener('click', () => {
            textElement.value = `START_QUOTE${comments[index].author.name}:\n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
        });
    });
}

export default renderComments;