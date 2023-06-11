import { addButton, newComment, newName } from "./comments.js";
import { allComments, postComments} from "./api.js";
import { renderComments, renderForm} from "./renderComments.js";
import { commentClickListener } from "./listeners.js";

function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    let hh = date.getHours() % 100
    if (hh < 10) hh = '0' + hh;

    let mi = date.getMinutes() % 100
    if (mi < 10) mi = '0' + mi;
    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mi;
}

function cleareInputs () {
    newName.value = ''
    newComment.value = ''
    addButton.setAttribute('disabled', 'disabled')
}

function AddLikeOrDelLike (e) {
    e.target.classList.add('loading-like')
      let comment = allComments[e.target.dataset.id];
      delay(2000).then(() => {
        comment.likes = comment.isLiked
          ? comment.likes - 1
          : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        e.target.classList.remove('loading-like')
        renderComments();
      });
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

function addNewComment() {
    let date = new Date();
    let loadedComment = true
    renderForm(loadedComment)
    postComments()
    renderComments()
    commentClickListener()
}

export {formatDate, cleareInputs, AddLikeOrDelLike, addNewComment}