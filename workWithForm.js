import { comments,  mainForm,listElement, } from "./script.js";
// import { pushComment } from "./script.js";
import { delay, getDate,safeInputText } from "./secondaryFunc.js";
import { host,token } from "./api.js";
import { fetchAndRenderTasks } from "./script.js";




  // Отчистка данных с поля
export function delValue() {
    nameInputElement.value = "";
    commentInputElement.value = "";
  };
  
// // Ввод по нажатию клавиши Enter

  export function pushCommentwithEnter(){
    mainForm.addEventListener('keyup', (event) => {
  
      if (event.code === "Enter"  ) {
        addComment.click();
      }
    });  
  }

  // Блокировка кнопки ввода()
  export const buttonBlock = () => {
    document.querySelectorAll("#name-input,#comment-input").forEach((el) => {
      el.addEventListener("input", () => {
        if (document.getElementById("name-input").value === '' || document.getElementById("comment-input").value === '')
          document.getElementById("add-button").disabled = true;
        else
          document.getElementById("add-button").disabled = false;
      });
    });
  }







  // Рендер разметки

// Рендер разметки
export function renderComments() {
  const appEl = document.getElementById('app')
  const userHtml = comments.map((user, index) => {
    return `<li class="comment"  data-name="${user.author.name}" data-comment="${user.text}">
    <div class="comment-header">
      <div>${user.author.name}</div>
      <div>${getDate(user.date)}</div>
    </div>
    <div class="comment-body" >
   <div class ="comment-text"> ${user.text} </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button data-index="${index}"  class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
    
      </div>
    </div>
  </li>`
  }).join('')


  const appHtml = ` <div class="container">
  <div id="loaderComments">Комментарии загружаются...</div>
  <form class="form" action="" method="post">
    <h1>Форма входа</h1>
    <input class="input"id='login-input' type="text" autocomplete="username" placeholder="Ваше имя">
    <br>
    <input class="input" id='password-input' type="password" autocomplete="current-password" placeholder="Пароль">
    <br>
    <button class="btn" id="login-button" type="submit">войти</button>
    <button class="btn" type="submit">Авторизация</button>
  </form>

  <p id = 'waitComment' style="display: none">Комментарии загружаются...</p>
  <ul class="comments" id ="comments">
      ${userHtml}
  </ul>
  <p id = 'addingComment' style="display: none">Комментарий добавляется...</p>
  <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      id ='name-input'
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш комментарий"
      rows="4"
      id="comment-input"
    ></textarea>
    <div class="add-form-row">
      <button  class="add-form-button" id="add-button" >Написать</button>
      <button  class="add-form-button"     id="remove-comment" >Удалить последний коммент</button>
    </div>
  </div>
  <div id="PushCommentsText" >Комментарий добавляется</div>
  
</div>`

  appEl.innerHTML = appHtml;

  
//Переменные 
const likeButtons = appEl.querySelectorAll('.like-button');
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("add-button");
const mainForm = document.querySelector(".add-form");
const pushComments = document.getElementById("PushCommentsText");
const addCommentText = document.getElementById("addingComment");
  // Добавление лайка
function addLike () {
  
  for(let likeButton of likeButtons){

    likeButton.addEventListener('click', ( event) => {
      event.stopPropagation()
          const index = likeButton.dataset.index;
          likeButton.classList.add('-loading-like')
          delay(2000).then(()=> {
           
            if (!comments[index].isLiked) {
              comments[index].isLiked = true;
              comments[index].likes +=1;
            } else {
              comments[index].isLiked = false;
              comments[index].likes -=1;
            }
            renderComments();
          })

      })
  }
}   

//Добавление комментария, POST запрос с GET

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === "" || textInputElement.value === "") {
    nameInputElement.classList.add("error");
    textInputElement.classList.add("error");
    return;
  }
  // addCommentText.style.display = "inline";
  mainForm.style.display = "none";
  buttonElement.disabled = true;
  buttonElement.textContent = "Загружаю...";
  fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value,
      date: new Date(),
      forceError: true,
    }),
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("нет авторизации");
        return response.json();
      } else if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        return Promise.reject("Короткий текст");
      } else if (response.status === 500) {
        return Promise.reject("Сервер упал");
      }
    })

    .then(() => {
      return fetchAndRenderTasks();
    })
    .then(() => {
      addCommentText.style.display = "none";
      mainForm.style.display = "flex";
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      nameInputElement.value = "";
      textInputElement.value = "";
    })
    .catch((error) => {
      addCommentText.style.display = "none";
      mainForm.style.display = "flex";
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      if (error === "Короткий текст") {
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else if (error === "Сервер упал") {
        alert("Сервер сломался, попробуй позже");
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      console.warn(error);
    });

  renderComments();
});


function reComment () {
  
  const allComments = document.querySelectorAll('.comment')
  for(let comment of allComments){
   comment.addEventListener('click', (event)=>{
     event.stopPropagation()
     const nameUser = comment.dataset.name;
     const userComments = comment.dataset.comment;
     textInputElement.value =` >${userComments} \n${nameUser} <\n`
     
   })
  
  }
 }

  reComment()
  addLike()  // лайки
  // reComment() // Комментирование поста

}