"use strict";
const form = document.querySelector('.add-form');
const newName = form.querySelector('.add-form-name');
const newComment = form.querySelector('.add-form-text');
const addButton = form.querySelector('.add-form-button');
const comments = document.querySelector('.comments');
const boxOfComments = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');
const button = document.querySelector('.add-form-button');
const textComment = document.querySelector('.add-form-text');


function prov() {
addButton.disabled = true;
if (newName.lenght===0 && newComment.lenght===0) {
addButton.disabled = true;
}
}
prov();

newName.addEventListener('input', function () {
if (newName.value==='' || newComment.value==='') {
    addButton.setAttribute('disabled', 'disabled')
}
else{
    addButton.removeAttribute('disabled')
}
});
newComment.addEventListener('input', function () {
if (newName.value==='' || newComment.value==='') {
    addButton.setAttribute('disabled', 'disabled')
}
else{
    addButton.removeAttribute('disabled')
}
});

addButton.addEventListener('click', () => {

let oldComments = comments.innerHTML
const dateNow = new Date();
let newComments = `<li class="comment">
<div class="comment-header">
  <div>${newName.value}</div>
  <div>${formatDate(dateNow)}</div>
</div>
<div class="comment-body">
  <div class="comment-text">
    ${newComment.value}
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="">0</span>
    <button class="like-button"></button>
  </div>
</div>
</li>`
comments.innerHTML = oldComments + newComments
newName.value='';
newComment.value='';
});

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

// likes
const usersComments = [
{
name: "Глеб Фокин",
date: "12.02.22 12:18",
comment: "Это будет первый комментарий на этой странице",
likes: "3",
Iliked: false
},
{
name: "Варвара Н.",
date: "13.02.22 19:22",
comment: "Мне нравится как оформлена эта страница! ❤",
likes: "75",
Iliked: false
}
]
const addLikes = (e) => {
const comment = usersComments[e.target.dataset.id];
comment.likes++;
comment.Iliked = true;
}

const delLikes = (e) => {
const comment = usersComments[e.target.dataset.id];
comment.likes--;
comment.Iliked = false;
}

const initEventListeners = () => {
const likeButtons = document.querySelectorAll('.likes');

for (const likeButton of likeButtons) {
likeButton.addEventListener('click', (e) => {
(usersComments[e.target.dataset.id].Iliked) ? delLikes(e) : addLikes(e);
renderComments()
})
}
}

const renderComments = () => {

const commentsHtml = usersComments.
map((user, index) => {
  (user.Iliked) ? (user.Iliked = '-active-like') : (user.Iliked = '');
  return `<li class="comment">
  <div class="comment-header">
    <div class="comment-name">${user.name}</div>
    <div>${user.date}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text">
      ${user.comment}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${user.likes}</span>
      <button class="like-button ${user.Iliked}" data-id="${index}"></button>
    </div>
  </div>
</li>`;
})
.join("");
boxOfComments.innerHTML = commentsHtml;  
initEventListeners();
};
renderComments()

// comment

const addComment = () => {
    const date = new Date();
    if (validate()) {
      commentsListArray.push({
        //Убираем уязвимость, запрещаем вводить теги в поле ввода имени
        name: newName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear().toString().slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`,
        //Убираем уязвимость, запрещаем вводить теги в поле ввода текста
        comment: textComment.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        likes: 0,
      });
      renderComments();
      textComment.value = "";
      newName.value = "";
      button.setAttribute('disabled', '');
    }
  };
  button.addEventListener('click', (event) => {
    addComment();
  });
  addForm.addEventListener('input', (event) => {
    if (validate) {
      button.removeAttribute('disabled');
      button.classList.remove('add-form-button-disabled');
    }
  });
  addForm.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      addComment();
    }
  });
  renderComments();

function addCommentListener() {
    const comments = document.querySelectorAll('.comment');

comments.forEach((comment) => {
comment.addEventListener('click', () => {
const answer = comment.querySelector('.comment-body').textContent;
const nameUser = comment.querySelector('.comment-name').textContent;
textComment.value = `>${answer}${nameUser}.,`;
})})}
addCommentListener()