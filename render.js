// import { listElement } from "./main.js";
// import { initlikeButtonListeners } from "./main.js";
// import { initAnswerComment } from "./main.js";



const renderComments = (comments) => {
  const appEl = document.getElementById("app");
  const commentsHtml = comments.map((comment, index) => {



    let isLike = '';
    if (comments[index].isLiked) {
      isLike = '-active-like'
    }
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter ">${comment.like}</span>
            <button class="like-button  ${isLike}" data-index="${index}"></button>
          </div>
        </div>
      </li>`


  }).join('');

  const appHtml = `
      <div class="container">
        <ul id="list" class="comments">
          <!-- Список рендериться в main -->
          ${commentsHtml}
        </ul>
        <div id="block-form-login" class="login-form">
          <input id="login-input" type="text" class="add-form-name" placeholder="Введите ваш логин" />
          <br/>
          <input id="password-input" type="text" class="add-form-name" placeholder="Введите ваш пароль" />
          <div class="login-form-row">
            <button id="login-button" class="login-form-button">Войти</button>
          </div>
        </div>
      </div>

      <div class="container">
        <div>
          <h3 id="invizDivHeader">Идет загрука комментариев...</h3>
        </div>
        <ul id="list" class="comments">
          <!-- Список рендериться в main -->
        </ul>
        <div>
          <h3 id="invizDiv">Загружаю комментарий...</h3>
        </div>
        <div id="block-form" class="add-form">
          <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
          <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
          <div class="add-form-row">
            <button id="add-button" class="add-form-button">Написать</button>
          </div>
          <div class="add-form-row">
            <button id="delet-button" class="add-form-button">Удалить коммент</button>
          </div>
        </div>
      </div>`



  appEl.innerHTML = appHtml;
  const buttonElemtnt = document.getElementById('add-button');
  const listElement = document.getElementById('list');
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const deletElement = document.getElementById("delet-button");
  const likeButtonElements = document.querySelectorAll('.like-button');
  const addFormLoad = document.getElementById('block-form');
  const invisibleDiv = document.getElementById('invizDiv');
  const invisibleDivHead = document.getElementById('invizDivHeader');
  const invizPushComm = document.getElementById('block-form');
  // const nameInputElement = document.getElementById("name-input");

  const initlikeButtonListeners = (comments) => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            let countInLike = Number(comments[index].like);
            if (likeButtonElement.classList.contains("-active-like")) {
                countInLike -= 1;
                comments[index].isLiked = false;
            } else {
                countInLike += 1;
                comments[index].isLiked = true;
            }
            comments[index].like = countInLike;
            renderComments(comments);
        });
    };

};

const initAnswerComment = () => {
    const oldComments = document.querySelectorAll('.comment')
    for (const oldComment of oldComments) {
        oldComment.addEventListener('click', () => {
            commentInputElement.value = `> ${oldComment.querySelector('.comment-text').innerHTML
                .replaceAll("&amp;", "&")
                .replaceAll("&lt;", "<")
                .replaceAll("&gt;", ">")
                .replaceAll("&quot;", '"')}`
                + `\n\n${oldComment.querySelector('.comment-header').children[0].innerHTML
                    .replaceAll("&amp;", "&")
                    .replaceAll("&lt;", "<")
                    .replaceAll("&gt;", ">")
                    .replaceAll("&quot;", '"')},`
        })
    }
}
initAnswerComment();
initlikeButtonListeners();
// getAllComments();

nameInputElement.addEventListener('input', () => {
    if (nameInputElement.value.trim() !== '') {
        buttonElemtnt.disabled = false;
        return;
    } else (buttonElemtnt.disabled = true);
    return;
});

buttonElemtnt.addEventListener('click', () => {
    let countInLike;
    nameInputElement.classList.remove('error');
    if (nameInputElement.value === '') {
        nameInputElement.classList.add('error');
        return;
    }

    commentInputElement.classList.remove('error');
    if (commentInputElement.value === '') {
        commentInputElement.classList.add('error');
        return;
    }
    // invisibleDiv.classList.remove('hidden');
    // invisibleDiv.classList.add('hidden');
    finComments();

    countInLike = 0;
    deletElement.value;
});



document.addEventListener('kayup', (event) => {
    if (event.key === 'Enter') {
        buttonElemtnt.click();
    }
});

deletElement.addEventListener("click", () => {
    const lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class="comment">');
    if (lastCommentIndex !== -1) {
        listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex);
    }
    comments.pop();
    renderComments();
});

  invisibleDivHead.classList.add('hidden');
  invisibleDiv.classList.add('hidden');
  invizPushComm.classList.add('hidden');



  initlikeButtonListeners(comments);
  initAnswerComment();

};

export { renderComments };
// export {commentInputElement};