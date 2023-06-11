import { form, newName, newComment, addButton} from "./comments.js";
import {allComments } from "./api.js";
import { AddLikeOrDelLike } from "./utilis.js";
import { addNewComment } from "./utilis.js";

let commentClickListener = () => {
  
  let boxOfCommentsTexts = document.querySelectorAll('.comment')

  for (let comment of boxOfCommentsTexts) {
    comment.addEventListener('click', () => {
      newComment.setAttribute('style', 'white-space: pre-line;');
      let replace = `${allComments[comment.dataset.id].text} \r\n \r\n ${allComments[comment.dataset.id].name}`
      newComment.value = `| ${replace} \r\n\|`
    })
  }
}


let initEventListeners = () => {

let likeButtons = document.querySelectorAll('.likes');

  for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', (e) => {
      e.stopPropagation()
      AddLikeOrDelLike(e)
    })  
  } 
}

export {commentClickListener, initEventListeners}

newName.addEventListener('input', function () {
    if (newName.value.length < 3 || newComment.value.length < 3) {
        addButton.setAttribute('disabled', 'disabled')
    }
    else{
        addButton.removeAttribute('disabled')
    }
});

newComment.addEventListener('input', function () {
    if (newName.value.length < 3 || newComment.value.length < 3) {
        addButton.setAttribute('disabled', 'disabled')
    }
    else{
        addButton.removeAttribute('disabled')
    }
});


addButton.addEventListener('click', addNewComment)

form.addEventListener('keyup', function (event) {
    if (!addButton.attributes.disabled && event.code == 'Enter') {
       addNewComment()
    }
    else{
        return
    }
})


let comments = document.querySelector('.comments');
let delButton = form.querySelector('.del-form-button');

delButton.addEventListener('click', function () {
    comments.removeChild(comments.lastChild)
    allComments.pop()
})

