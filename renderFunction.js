import { commentPost, token, nameSession } from "./api.js";
import { editButton } from "./editButton.js";
import { likedFunction } from "./isliked.js";
import { answerElement } from "./main.js";
import { renderLogin } from "./renderLogin.js";
const boxMessages = document.querySelector('.comments');


const loginHtml = `

<div class="add-form">
      <h2 class="login-title">Форма входа</h2>
      
      <div class="form-row">
      <input type="text" id="login-input" class="add-form-login" placeholder="Введите логин" value="" />
      <input type="password" id="password-input" class="add-form-login" placeholder="Введите ваш пароль">
      </div>
      <button id="login-button" class="login-button">Войти</button>
      </div>
`;


const autorMenu = `
<div class="add-form">
        <input
        type="text"class="add-form-name" placeholder="Введите ваше имя"/>
<textarea
type="textarea"
style="white-space:pre-line"
class="add-form-text"
placeholder="Введите ваш коментарий"
rows="2"
></textarea>
<div class="add-form-row">
<button class="add-form-button">Написать</button>
</div>
</div>`



export const renderFunction = ({ comments, apiCommentsGet}) => {
    const commtentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class='quote'>
              <div class="comment-body">
              ${comment.isEdit? `<textarea data-index="${index}" class="edit-text white-space: pre-line">${comment.text}</textarea>` : `<div data-index="${index}" class="comment-text" style="white-space:pre-line">${comment.text
                .replaceAll("BEGIN_QUOTE", "<div class='quoteOne'>")
                .replaceAll("QUOTE_END", "</div>")}</div>`}
            </div>
              </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.like}</span>
                <button data-index="${index}" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
              </div>
              
            </div>
            <button data-index="${index}" class="edit-button">${comment.isEdit? 'Сохранить' : 'Редактировать'}</button>
          </li>`
          

    }
  
    ).join("");

    const appElement = document.getElementById('app')
    const appHtml = `
    <div class="container">
    <h2 style="color: green; font-size: 40px;">Комментарии загружаются...</h2>
    <ul class="comments">${commtentsHtml}
    </ul>
    ${token? `<div class="add-form">
    <input
    type="text"class="add-form-name"  >
<textarea
type="textarea"
style="white-space:pre-line"
class="add-form-text"
placeholder="Введите ваш коментарий"
rows="2"
></textarea>
<div class="add-form-row">
<button class="add-form-button">Написать</button>
</div>` : '<div class="atPosition">Для комментирования перейдите на страницу <span id="renderLP"><a href="#" class="hrefColor">авторизации</a></span></div>'}
    </div>

  `
  appElement.innerHTML = appHtml;

  const button = document.querySelector('.add-form-button');
  const text = document.querySelector('.add-form-text');
  const name = document.querySelector('.add-form-name');
  const downloadAlert = document.querySelector('h2')
  const newElement = document.getElementById('renderLP')

function disabledToken () {
  newElement.addEventListener("click", () => {
    renderLogin();
    })
}
    
function endableToken ()  {
button.disabled = true;
button.classList.add('unactive');


button.addEventListener("click", () => {
  addCommentare();

});

text.addEventListener("keyup", keyCode);

function keyCode(e) {
if (e.keyCode === 13) {
  addCommentare();
  
} else {
return;
}
}

text.addEventListener("input", () => {
  button.disabled = false;
  button.classList.remove('unactive');
}); 
name.addEventListener("input", () => {
  button.disabled = false;
  button.classList.remove('unactive');

  button.addEventListener("click", () => {
    addCommentare();
  
  });
});  
name.disabled = true;
name.value=nameSession;
}

token ? endableToken() : disabledToken() ;



  function addCommentare() {
    let savedTextValue = text.value;
    let savedNameValue = name.value;
text.classList.remove('red');
name.classList.remove('red');
if(name.value === '' && text.value === '') {
  text.placeholder = 'Это поле не должно быть пустым'
  text.classList.add('red');
  name.placeholder = 'Это поле не должно быть пустым'
  name.classList.add('red');
  return;
}
else if (name.value === '') {
  name.placeholder = 'Это поле не должно быть пустым'
  name.classList.add('red');
  return;
} 
else if (text.value === ''){
  text.placeholder = 'Это поле не должно быть пустым'
  text.classList.add('red');
  return;
}
button.textContent = 'Загрузка.'
button.disabled = true;
button.classList.add('unactive');

function postComment () {
commentPost({ text, name })

  .then(() => {
  return apiCommentsGet({ comments, text });
  })
  .then(() => {
    button.textContent = 'Написать'
    name.value = '';
    text.value = '';
  })
  .catch((error) => {
    console.warn(error);
    if (error.message === 'некорректный запрос') {
      alert('Имя и комментарий должны быть не короче 3 символов');
    }
    if (error.message === 'ошибка сервера') {
      alert('Сломался сервер, попробуйте позже');
      postComment();
    }
    if (window.navigator.onLine === false) {
      alert('Проблемы с интернетом, проверьте подключение.');
    }
    button.disabled = false;
    button.textContent = 'Написать'
    button.classList.remove('unactive');
    button.classList.add('class="add-form-button"')
    name.value = savedNameValue;
    text.value = savedTextValue;
  })
};

postComment();

name.value = '';
text.value = '';

renderFunction({ comments, apiCommentsGet});


}

    likedFunction({ comments });
    editButton({ comments });
    answerElement();
  };








  // ${token? `
  // <div class="add-form">
  //         <input
  //         type="text"class="add-form-name"  >
  // <textarea
  // type="textarea"
  // style="white-space:pre-line"
  // class="add-form-text"
  // placeholder="Введите ваш коментарий"
  // rows="2"
  // ></textarea>
  // <div class="add-form-row">
  // <button class="add-form-button">Написать</button>
  // </div>
  // </div>`: 
  // `
  
  // <div class="add-form">
  //       <h2 class="login-title">Форма входа</h2>
        
  //       <div class="form-row">
  //       <input type="text" id="login-input" class="add-form-login" placeholder="Введите логин" value="" />
  //       <input type="password" id="password-input" class="add-form-login" placeholder="Введите ваш пароль">
  //       </div>
  //       <button id="login-button" class="login-button">Войти</button>
  //       </div>
  // ` }