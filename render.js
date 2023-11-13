import { postTodo, setUserName, userName } from "./API.js";
import { apiGet, commentsArray, token } from "./main.js";
import { renderLogin } from "./renderLogin.js";

export const renderData = () => {
  const appHtml = document.getElementById("app");
  const formHtml = `<div class="add-form">
  <input 
    id="inputName"
    type="text" 
    class="add-form-name"
    placeholder="Введите ваше имя"  
  />
  <textarea
    id="inputText"
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button id="buttonPush" class="add-form-button">Написать</button>
  </div>
</div>`
  const btnLoginHtml = `<div class="titleAddComment">Чтобы добавить коментарий,<span class="linkLoginForm">авторизуйтесь</span>  </div>`
  const renderComments = () => {

    const commentsHtml =  commentsArray
      .map((item, index) => {
        return `
            <li class="comment" data-user-name="${item.name}" data-text="${item.comment}">
            <div class="comment-header">
              <div>${item.name}</div>
              <div>${item.date}</div>
            </div>
            <div class="comment-body">
                  <div class = "comment-text">${item.comment}</div>
            </div>
            <div class="comment-footer">
              <button data-index="${index}" class="remove-button">Удалить</button>
              <div class="likes">
                <span class="likes-counter">${item.like}</span>
                <button data-index='${index}' class="like-button ${item.paint}"</button>
              </div>
            </div>
          </li>`;
      })
      .join("");
      appHtml.innerHTML = `
      <div class="commentsLoading">
      Пожалуйста подождите, комментарии загружаются...
    </div>
    <ul id="ul" class="comments">
    ${commentsHtml}
    </ul>
    <div class="commentLoading">Комментарий загружается...</div>
    
    ${token ? formHtml : btnLoginHtml}`
 
    actionForm();
  };
  
function actionForm(){
  if (!token) return
  const nameElement = document.getElementById("inputName");
const textElement = document.getElementById("inputText");
const buttonElement = document.getElementById("buttonPush");
const commentLoadingElement = document.querySelector(".commentLoading");
const formElement = document.querySelector(".add-form");
if(userName){
  nameElement.value=userName;
  nameElement.disabled = true;
}
  function validationInput() {
    if (nameElement.value === "" || textElement.value === "") {
      buttonElement.disabled = true;
      return;
    } else {
      buttonElement.disabled = false;
    }
  }
  buttonElement.disabled = true;
  nameElement.addEventListener("input", validationInput);
  textElement.addEventListener("input", validationInput);
  
  buttonElement.addEventListener("click", () => {
    buttonElement.disabled = true;
    commentLoadingElement.classList.add("commentLoadingInvisible");
    formElement.classList.add("add-formInvisible");
    const postCommentsPromise = () => {
      postTodo(textElement, nameElement)
        .then((response) => {
          if (response.status === 500) {
            throw new Error("Неполадки с сервером");
          } else if (response.status === 400) {
            throw new Error("Недопустимое количество символов");
          } else {
            nameElement.value = "";
            textElement.value = "";
          }
  
          apiGet();
        })
        .catch((error) => {
          if (error === "Failed to fetch") {
            alert("Нет соединения с интернетом");
          } else {
            alert(error.message);
          }
        })
        .finally(() => {
          buttonElement.disabled = false;
          commentLoadingElement.classList.remove("commentLoadingInvisible");
          formElement.classList.remove("add-formInvisible"); 
        });
    };
    postCommentsPromise();
  });
}
 
 
  const deleteButtonsUser = () => {
    const deleteButtons = document.querySelectorAll(".remove-button");
    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        const index = deleteButton.dataset.index;
        commentsArray.splice(index, 1);
        renderComments();
        likes();
        deleteButtonsUser();
        answerComment();
      });
    }
  };

  const answerComment = (textElement) => {
    textElement = document.getElementById("inputText");
    const commentAnswers = document.querySelectorAll(".comment");
    for (const commentAnswer of commentAnswers) {
      commentAnswer.addEventListener("click", () => {
        textElement.value = `QUOTE_BEGIN 
                    ${commentAnswer.dataset.text}${commentAnswer.dataset.userName} 
                    QUOTE_END 
                    Ответ:  `;
                    answerComment(textElement)
      });
    }
  };

  function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

  const likes = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        likeButton.classList.add("loadingLike");
        delay(2000).then(() => {
          likeButton.classList.remove("loadingLike");
          const index = likeButton.dataset.index;
          if (commentsArray[index].userLike === false) {
            commentsArray[index].paint = "-active-like";
            commentsArray[index].like += 1;
            commentsArray[index].userLike = true;
          } else {
            commentsArray[index].paint = "";
            commentsArray[index].like -= 1;
            commentsArray[index].userLike = false;
          }
          renderComments();
          likes();
          deleteButtonsUser();
          answerComment()
        });
      });
    }
  };
  renderComments();
  likes();
  answerComment();
  deleteButtonsUser();
  gotoLogin()
 
};
export function gotoLogin(){
  if(token) return
  const loginButton = document.querySelector(".linkLoginForm");
  loginButton.addEventListener("click",()=>{
    renderLogin();
  })
}

