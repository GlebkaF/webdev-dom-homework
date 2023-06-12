import { getAllComments, finComments } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";
export let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

getAllComments();
const textEnter = `<div id="toggle-page">Чтобы добавить комментарий, авторизируйтесь</div>
</div>`

const renderComments = (comments) => {
  const appEl = document.getElementById("app");

  // if (token) {
  //   renderLoginComponent({
  //     appEl, setToken: (newToken) => {
  //       token = newToken;
  //     },
  //     getAllComments,
  //   });

  //   return;
  // }

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

  const formTemp = `        <div id="block-form" class="add-form">
  <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
  <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
    rows="4"></textarea>
  <div class="add-form-row">
    <button id="add-button" class="add-form-button">Написать</button>
  </div>
  <div class="add-form-row">
    <button id="delet-button" class="add-form-button">Удалить коммент</button>
  </div>
</div>`

  const appHtml = `
      <div class="container">
        <div>
          <h3 id="invizDivHeader">Идет загрука комментариев...</h3>
        </div>
        <ul id="list" class="comments">
          <!-- Список рендериться в main -->
          ${commentsHtml}
        </ul>
        <div>
          <h3 id="invizDiv">Загружаю комментарий...</h3>
        </div>
${token ? formTemp : textEnter
    }
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
  const autorizButton = document.getElementById('toggle-page');

  if (autorizButton) {
    autorizButton.addEventListener('click', () => {
      renderLoginComponent({
        appEl, setToken: (newToken) => {
          token = newToken;
        },
        getAllComments,
      });
    })
  }


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

  if (nameInputElement) {
    nameInputElement.addEventListener('input', (comments) => {
      if (nameInputElement.value.trim() !== '') {
        buttonElemtnt.disabled = false;
        return;
      } else (buttonElemtnt.disabled = true);
      return;
    });
  }


  if (buttonElemtnt) {
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
      const text = document.getElementById("comment-input").value;
      finComments({ text, token });

      countInLike = 0;
      deletElement.value;
    });

  }

  document.addEventListener('kayup', (event) => {
    if (event.key === 'Enter') {
      buttonElemtnt.click();
    }
  });

  if (deletElement) {
    deletElement.addEventListener("click", () => {
      const lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class="comment">');
      if (lastCommentIndex !== -1) {
        listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex);
      }
      comments.pop();
      renderComments();
    });
  }


  invisibleDivHead.classList.add('hidden');
  invisibleDiv.classList.add('hidden');
  // invizPushComm.classList.add('hidden');

  initlikeButtonListeners(comments);
  initAnswerComment();
  // renderComments(comments)
};

export { renderComments };
//10.06.23 12:50
//10.06.23 13:38
//10.06.23 14:53
//10/06/23 15:20
//10/06/23 15:46 добавлена форма регистрации
// 10/06/23 16:04 добавили регистрацию