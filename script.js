import { getCommentsList, publicComment } from "./api.js";
import {getDate,safeInputText,delay} from "./secondaryFunc.js"


 let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
let comments = [];

// token = null;
const waitCommentMessage = document.getElementById("waitComment");
/* waitCommentMessage.style.display = "inline"; */



//get запрос
const fetchGetAndRender = () => {
  return getCommentsList({token})
    .then((responseData) => {
      comments = responseData.comments;
      renderComments();
    })
    .catch((error) => {
      /* waitCommentMessage.style.display = "none"; */
      if (error === "Сервер упал") {
        alert("Сервер сломался, попробуй позже");
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      console.warn(error);
    });
};

//рендер-функция

const renderComments = () => {
  const appEl = document.getElementById("app");

  if (!token) {
    const commentsHtml =
    comments.map((user, index) => {
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

    const appHtml = `
            <div class="container">
              <p id = 'waitComment' style="display: none">Комментарии загружаются...</p>
              <ul id="list" class="comments">
                ${commentsHtml}
              </ul>
              <p id = 'addingComment' style="display: none">Комментарий добавляется...</p>
              

            <div class="add-form">
              <h2 class="class">Форма входа</h2>
              <input
                type="text"
                id="login-input"
                class="add-form-name"
                placeholder="Введите ваш логин"
              /> <br/>
              <input
                type="text"
                id="password-input"
                class="add-form-name"
                placeholder="Введите ваш пароль"
              />
              
              <div class="add-form-row">
                <button id="login-button" class="add-form-button">Войти</button>
                <button data-id = 'id' id="reg-button" class="add-form-button">
                  Зарегистрироваться
                </button>
              </div>
            </div>

          </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
      token =
        "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
      renderComments();
    });

    return;
  }

  const commentsHtml =
  comments.map((user, index) => {
    return `<li class="comment"  data-name="${user.author.name}" data-comment="${user.text} ">
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
        <button  data-index="${index}" class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
    
      </div>
    </div>
  </li>`
  }).join('')

  const appHtml = `
            <div class="container">
              <p id = 'waitComment' style="display: none">Комментарии загружаются...</p>
              <ul id="list" class="comments">
                ${commentsHtml}
              </ul>
              <p id = 'addingComment' style="display: none">Комментарий добавляется...</p>
              <div class="add-form">
              
              <input
                type="text"
                id="name-input"
                class="add-form-name"
                placeholder="Введите ваше имя"
              />
              <textarea
                type="textarea"
                id="text-input"
                class="add-form-text"
                placeholder="Введите ваш комментарий"
                rows="4"
              ></textarea>
              <div class="add-form-row">
                <button id="add-button" class="add-form-button">Написать</button>
                <button data-id = 'id' id="delete-button" class="add-form-button">
                  Удалить комментарий
                </button>
              </div>
            </div>
          </div>`;

  appEl.innerHTML = appHtml;


// Переменные
  const buttonElement = document.getElementById("add-button");
  const deleteButtonElement = document.getElementById("delete-button");
  // const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-input");
  const mainForm = document.querySelector(".add-form");
  const addCommentText = document.getElementById("addingComment");
  const likeButtons = appEl.querySelectorAll('.like-button');

  //Добавление комментария, POST запрос с GET

  buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");

    if (nameInputElement.value === "" || textInputElement.value === "") {
      nameInputElement.classList.add("error");
      textInputElement.classList.add("error");
      return;
    }
    addCommentText.style.display = "inline";
    mainForm.style.display = "none";
    buttonElement.disabled = true;
    buttonElement.textContent = "Загружаю...";

    publicComment({
      name: safeInputText(nameInputElement.value),
      text: safeInputText(textInputElement.value),
      date: new Date(),
      forceError: true,
      token,
    })
      .then(() => {
        return fetchGetAndRender();
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

  // блокировка кнопки
  const validateInput = () => {
    if (nameInputElement.value === "" || textInputElement.value === "") {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };
  const buttonBlock = () => {
    validateInput();
    document.querySelectorAll("#name-input,#text-input").forEach((el) => {
      el.addEventListener("input", () => {
        validateInput();
      });
    });
  };

  // ввод по кнопке enter
  function pushCommentwithEnter(){
    mainForm.addEventListener('keyup', (event) => {
  
      if (event.code === "Enter"  ) {
        buttonElement.click();
      }
    });  
  }

  // удаление последнего комментария


  // function deleteComment(index, token) {
  //   fetch("https://webdev-hw-api.vercel.app/api/v2/Kerimov-Evgeniy/comments" + id, {
  //       method: "DELETE",
  //       headers: {
  //           authorization: token ,
  //       },
  //   })
  //       .then((response) => {        
  //           if(response.status === 200){
  //               comments.splice(index, 1);
  //               renderComments(token);
  //               return response.json();
  //           }
  //       })
  //       .catch(error => {
  //           console.warn(error);
  //           if (error.message = 'Failed to fetch'){
  //               alert('Нет соединения с интернетом')
  //           }
  //       })
    
  // };

  //Комментарий на комментарий
 function reComment (index) {
  
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

  addLike(); //Лайки
  // deleteComment(); //Удаление комментария
  pushCommentwithEnter(); //Отправка по Enter
  reComment(); //  Ответ на коммент
  buttonBlock(); // Блокировка кнопки

};

renderComments();
fetchGetAndRender();

