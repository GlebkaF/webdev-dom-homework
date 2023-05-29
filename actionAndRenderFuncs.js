import { listElement, nameInputElement, textInputElement, addForm, commentLoading, } from "./handlers.js";
import { fetchPostRender } from "./api.js";
import { getCommentsList } from "./commentsList.js";

export const renderComments = (element, getCommentsList, comments) => {
    element.innerHTML = comments.map((comment, index) => getCommentsList(comment, index)).join('');
    likeComment(comments);
    newReply(comments);
};


export const addComment = () => {

    if (nameInputElement.value === '') {
      nameInputElement.classList.add('form-error');
      return;
    } else if (textInputElement.value === '') {
      textInputElement.classList.add('form-error');
      return;
    } else {
      addForm.classList.add('hidden');
      commentLoading.classList.remove('hidden');
      
      fetchPostRender()
    
      nameInputElement.classList.remove('form-error');
      textInputElement.classList.remove('form-error');

      textInputElement.value = '';
      nameInputElement.value = '';
  
      return
    }
  };
  
export const likeComment = (comments) => {
    const likeButtons = document.querySelectorAll('.like-button');
  
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (event) => {
        event.stopPropagation();
  
        let index = likeButton.dataset.index;
        let counter = comments[index].likes;
        console.log(counter);
        if (!comments[index].isLiked) {
          counter += 1;
        } else {
          counter -= 1;
        }
        comments[index].isLiked = !comments[index].isLiked;
        comments[index].likes = counter;
        renderComments(listElement, getCommentsList, comments);
      });
    }
  };
  
export const newReply = (comments) => {
    const commentElements = document.querySelectorAll('.comment');
  
    for (const commentElement of commentElements) {
      commentElement.addEventListener('click', () => {
        let index = commentElement.dataset.index;
  
        textInputElement.value = `QUOTE_BEGIN${
          comments[index].author.name
        } : ${comments[index].text
          .replaceAll('<div class="quote">', '')
          .replaceAll('</div>', '')}QUOTE_END`;
      });
    }
  };
