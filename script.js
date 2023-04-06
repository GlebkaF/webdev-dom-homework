import { getCommentsList, publicComment } from "./api.js";
import {getDate,safeInputText,delay} from "./secondaryFunc.js"

let comments = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
// token = null;
const waitCommentMessage = document.getElementById("waitComment");
/* waitCommentMessage.style.display = "inline"; */



//get запрос
const fetchGetAndRender = () => {
  return getCommentsList()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: safeInputText(comment.author.name),
          date: new Date,
          text: safeInputText(comment.text),
          likes: comment.likes,
          isLiked: false,
        };
      });
      /* waitCommentMessage.style.display = "none"; */
      comments = appComments;
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
      comments &&
      comments
        .map((comment, index) => {
          return `<li data-text = ${comment.text} \n ${
            comment.name
          }' class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${getDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index = '${index}' class="${
            comment.isLiked ? "like-button -active-like" : "like-button"
          }"></button>
            </div>
          </div>
        </li>`;
        })
        .join("");
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
    comments &&
    comments
      .map((comment, index) => {
        return `<li data-text = '&gt ${comment.text} \n ${
          comment.name
        }' class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${getDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index = '${index}' class="${
          comment.isLiked ? "like-button -active-like" : "like-button"
        }"></button>
            </div>
          </div>
        </li>`;
      })
      .join("");

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
      name: nameInputElement.value,
      text: textInputElement.value,
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

  //удаление последнего комментария

  const deleteComment = () => {
    deleteButtonElement.addEventListener("click", () => {
      comments.pop();
      renderComments();
    });
  };

  //Комментарий на комментарий
   function reComment () {
    const allComments = document.querySelectorAll('.comment')
    for(let comment of allComments){
     comment.addEventListener('click', (event)=>{
       event.stopPropagation()
       const nameUser = comment.dataset.name;
       const userComments = comment.dataset.text;
       textInputElement.value =` >${userComments} \n${nameUser} <\n`
       
     })
    
    }
   }

  addLike(); //Лайки
  deleteComment(); //Удаление комментария
  pushCommentwithEnter(); //Отправка по Enter
  reComment(); //  Ответ на коммент
  buttonBlock(); // Блокировка кнопки

};

renderComments();
fetchGetAndRender();


