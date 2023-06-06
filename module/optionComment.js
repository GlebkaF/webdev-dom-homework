import { elementComment} from './element.js';
import { renderComments } from './render.js';


//обрабочик лайков

const like = (commentArr) => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (e) => {
        e.stopPropagation()
        const index = likeButton.dataset.index;
        if (commentArr[index].isActiveLike) {
            commentArr[index].likes--;
  
        } else {
            commentArr[index].likes++;
        }
        commentArr[index].isActiveLike = !commentArr[index].isActiveLike;
        renderComments(commentArr);
      })
    }
  };
  
  // Добавляю обработчик клика 
  
  const initAnswer = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
      commentElement.addEventListener('click', () => {
        elementComment.value = `> ${commentElement.querySelector('.comment-text').innerHTML
          .replaceAll("&amp", "&;")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`
          + `\n\n${commentElement.querySelector('.comment-header').children[0].innerHTML
            .replaceAll("&amp", "&;")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
            .replaceAll("&quot;", '"')}`
      })
    }
  }

//защищаем код 

  const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

  export {like, initAnswer, protectionHtml }