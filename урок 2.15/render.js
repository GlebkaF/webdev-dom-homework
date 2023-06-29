import {listElement} from './variables.js';
import { initAnswerComment, initUpdateLike } from './optioncomments.js';

// let currentDate = new Date();

const formattedDate = (dateObject) => {
    let minutes = dateObject.getMinutes();
    let months = dateObject.getMonth() + 1;
    let years = dateObject.getFullYear() - 2000;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (months < 10) {
      months = "0" + months;
    }
    const outDate = dateObject.getDate() + '.' + months + '.' + years + '  ' + dateObject.getHours() + ':' + minutes;
    return outDate;
  }

  export  const renderComments = (commentArray) => {
    const commentHtml = commentArray.map((item, index) => {
      let activeLike = '';
      if (commentArray[index].isActiveLike) {
        activeLike = '-active-like'
      }
      return `  
      <li class="comment">
        <div class="comment-header">
          <div> ${item.name} </div>
          <div> ${formattedDate(item.date)} </div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${item.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              ${item.likes}
            </span>
            <button class="like-button ${activeLike}" data-id="${item.id}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
    }).join('');
    listElement.innerHTML = commentHtml;
    initUpdateLike(commentArray);
    initAnswerComment();
  }

 