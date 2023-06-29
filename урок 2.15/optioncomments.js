import { sentDataServer } from "./api.js";
import { renderComments } from "./render.js";
import { letClearForm } from "./changeelement.js";
import { nameElement, textElement, formComment, messageComment} from "./variables.js";

export const protectionHtml = (string) => {
    return string 
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
  };

    const initUpdateLike = (commentArray) => {
      const likeButtonsElements = document.querySelectorAll('.like-button');

      for (const likeButtonsElement of likeButtonsElements) {
        likeButtonsElement.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = likeButtonsElement.dataset.index; 
          if (likeButtonsElement.classList.contains('-active-like')) {
            commentArray[index].likes = Number(commentArray[index].likes)-1;
          } else {
            commentArray[index].likes = Number(commentArray[index].likes)+1;
          }
          commentArray[index].isActiveLike = !commentArray[index].isActiveLike;
          renderComments(commentArray);
        })
      }
    };

    const initAnswerComment = () => {
      const oldComments = document.querySelectorAll('.comment')
      for (const oldComment of oldComments) {
        oldComment.addEventListener('click', () => {
          textElement.value = `> ${oldComment.querySelector('.comment-text').innerHTML
          .replaceAll("&amp;" , "&")
          .replaceAll("&lt;" , "<")
          .replaceAll("&gt;" , ">")
          .replaceAll("&quot;" , '"')}`
          + `\n\n${oldComment.querySelector('.comment-header').children[0].innerHTML
          .replaceAll("&amp;" , "&")
          .replaceAll("&lt;" , "<")
          .replaceAll("&gt;" , ">")
          .replaceAll("&quot;" , '"')}`
        })
      }
    }

    export const sentComment = () => {
        letClearForm(nameElement);
        letClearForm(textElement);
    
          if (nameElement.value === '') {
            nameElement.classList.add('error');
            if (textElement.value === '' || textElement.value === '\n') {
              textElement.classList.add('error');
            }
            return;
          }
          if (textElement.value === '' || textElement.value === '\n') {
            textElement.classList.add('error');
            return;
        }
    
        formComment.classList.add('dpnone');
        messageComment.classList.remove('dpnone');

        sentDataServer()

      };

    export {initUpdateLike, initAnswerComment} 