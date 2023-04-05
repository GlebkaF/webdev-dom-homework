import { comments,  mainForm,listElement, } from "./script.js";
// import { pushComment } from "./script.js";
import { delay, getDate,safeInputText } from "./secondaryFunc.js";
import { host,token } from "./api.js";








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




   export function reComment () {
  
    const allComments = document.querySelectorAll('.comment')
    for(let comment of allComments){
     comment.addEventListener('click', (event)=>{
       event.stopPropagation()
       const nameUser = comment.dataset.name;
       const userComments = comment.dataset.comment;
       commentInputElement.value =` >${userComments} \n${nameUser} <\n`
       
     })
    
    }
   }

// // Добавление лайка
// export function addLike () {
//     const likeButtons = listElement.querySelectorAll('.like-button');
//     for(let likeButton of likeButtons){
  
//       likeButton.addEventListener('click', ( event) => {
//         event.stopPropagation()
//             const index = likeButton.dataset.index;
//             likeButton.classList.add('-loading-like')
//             delay(2000).then(()=> {
             
//               if (!comments[index].isLiked) {
//                 comments[index].isLiked = true;
//                 comments[index].likes +=1;
//               } else {
//                 comments[index].isLiked = false;
//                 comments[index].likes -=1;
//               }
//               renderComments();
//             })
  
//         })
//     }
//   }   


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

  
  <ul class="comments" id ="comments">
    <!-- Список рендерится из JS -->
      ${userHtml}
  </ul>
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
const commentInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");
const pushComments = document.getElementById("PushCommentsText");
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

const addComment = document.getElementById("add-button");
    addComment.addEventListener("click", () => {
      console.log('dsadasd')
    
  
      if (nameInputElement.value === "" || commentInputElement.value === "") {
        
        nameInputElement.classList.add("error");
        commentInputElement.classList.add("error");
        nameInputElement.placeholder = 'Введите имя';
        commentInputElement.placeholder = 'Введите комментарий';
        buttonBlock()
        return;  
      } 
    
      fetch(host, {
        method: "POST",
        headers: {
          authorization: token,
      },
        body: JSON.stringify({
            date: new Date,
            likes: 0,
            isLiked: false,
            text: safeInputText(commentInputElement.value),
            name: safeInputText(nameInputElement.value),
            forceError: true
          }),

          })
          .then((response) => {
            if (response.status === 400){
              throw new Error("Слишком короткая строчка");
            } 
            if (response.status === 500) {
              pushComment();
              throw new Error("Сервер сломался, попробуй позже")
            }
            if (response.status === 401) {
              throw new Error("Нет авторизации")
              
          };
              mainForm.style.display = "none";
              pushComments.style.display = "flex"
              return response.json();
              
    
          })
          .then(()=>{
            return fetchAndRenderTasks()

          })

          .then(()=>{     
            mainForm.style.display = "flex";
            pushComments.style.display = "none"
            delValue(); 
          })
    
          .catch((error) => {
            if (error.message === "Сервер сломался, попробуй позже") {
              mainForm.style.display = "flex";
              pushComments.style.display = "none"
                return;
            }
            if (error.message === "Слишком короткая строчка") {
                alert("Имя и комментарий должны быть не короче 3 символов")
                mainForm.style.display = "flex";
                pushComments.style.display = "none"
                return;
            }
            if (error.message === "Нет авторизации") {
              alert("Нет авторизации")
              mainForm.style.display = "flex";
              pushComments.style.display = "none"
              return;
          }
            mainForm.style.display = "flex";
            pushComments.style.display = "none"
            alert("Кажется, у вас сломался интернет, попробуйте позже");
            
            return;
           
        })
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");
        const oldListHtml = appEl.innerHTML;
        
     
    });
    
  addLike()  // лайки
  // reComment() // Комментирование поста

}