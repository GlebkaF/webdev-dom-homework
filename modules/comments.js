import { addCommentText } from "./addForm.js";
import { getApiComments } from "./api.js";
import { getComments, setComments } from "./store.js";
import { format } from "date-fns";

let waiter;
let listComments;

const options = {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

const getUnsafeString = (str) => str.trim()
  .replaceAll("&amp;", "&")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&quot;", '"')

export const init = () => {
  listComments = document.querySelector('.comments');
  waiter = document.querySelector('.waiter');
  listComments.addEventListener('click', switcher);
}

export const renderComments = () => {
  const comments = getComments();
  if (!comments) return;

  const commentsHTML = comments.map((comment) => {
    const createDate = format(new Date(comment.created_at), 'yyyy-MM-dd hh.mm.ss');
    return `<li class="comment" data-id="${comment.id}" data-name="${comment.author.name}">
            <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${createDate}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${comment.text}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button" data-like="${comment.isLiked}"></button>
            </div>
            </div>
            </li>`
  }).join('');
  listComments.innerHTML = commentsHTML;
}

const addLikesElements = (target) => {
  const commentBlock = target.closest('.comment');
  const commentId = commentBlock.dataset.id;
  const likes = commentBlock.querySelector('.like-button');
  const comments = getComments();
  const comment = comments.find(c => c.id == commentId);
  if (!comment) return;

  likes.classList.add('-loading-like');

  delay(2000).then(() => {
    if (comment.isLiked) {
      comment.likes--;
    } else {
      comment.likes++;
    }
    comment.isLiked = !comment.isLiked;
    comment.isLikeLoading = false;
    renderComments();
  });
}

export const switcher = (event) => {
  if (!event || !event.target) return;
  const target = event.target;

  if (target.classList.contains('like-button')) {
    addLikesElements(target);
    return;
  }

  if (target.classList.contains('comment-text')) {
    areaFunction(target);
    return;
  }
}

const areaFunction = (target) => {
  const commentBlock = target.closest('.comment');
  const commentId = commentBlock.dataset.name;
  const text = getUnsafeString(target.innerHTML) + ' \n' + commentId;
  addCommentText(text);
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export const loadComments = () => {
  getApiComments().then((data) => {
    waiter.style.display = 'none';
    var res = data.comments;
    setComments(res);
    renderComments();
  })
    .catch(() => {
      alert('Сервер сломался, попробуй позже');
      return;
    })
}
