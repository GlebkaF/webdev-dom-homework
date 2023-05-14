import { fetchComments, newComment } from "./api.js";
import { renderLogin } from "./login-component.js";
import { delay } from "./dalay.js";
import { format } from 'date-fns';

const load = document.querySelector(".load");
load.style.display = "flex";
let comments = [];

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;

const fetch = () => {
  return fetchComments({ token })
  .then((responseData) => {
  comments = responseData.comments;
  load.style.display = "none";
  renderTasks();
  })
  .catch((err) => {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    console.warn(err);
  });
  };

const answer = () => {
  const answerComments = document.querySelectorAll(".comment");
  const formText = document.querySelector(".add-form-text");
  for (const answerComment of answerComments){
    answerComment.addEventListener('click', () =>{
      const arr = comments[answerComment.dataset.index];
      let str = arr.text + ' ' + arr.name;
      formText.value += `${str}`;
      formText.focus();
    });
  };
  };

  const initEventLike = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for(const likeButton of likeButtons){
      const index = likeButton.dataset.index;
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      likeButton.classList.add("load-like");
      delay(2000).then(() => {
      if (comments[index].likeComment = !comments[index].likeComment) {
        comments[index].likeComment = false;
        comments[index].likes += 1;
      } else {
        comments[index].likeComment = true;
        comments[index].likes -= 1;
      }
      likeButton.classList.remove("load-like");
      renderTasks();
      initEventLike();
      });
        });
      };
    };

    const renderTasks = () => {
      const appEl = document.querySelector(".container");
      if(!token) {
      renderLogin({appEl,
        comments,
        setToken: (newToken) => {
          token = newToken;
        },
        renderTasks,
      });
      return;
      }

      const listComment = comments.map((user, index) => {
        const createDate = format(new Date(comments.created_at), 'YYYY-MM-DD hh.mm.ss');
        const now = new Date();
        format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33
        return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div>${user.author.name}</div>
          <div>${createDate}</div>
        </div>
        <div data-index="${index}" class="comment-body">
          <div class="comment-text">
            ${user.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button data-index="${index}"class="like-button ${user.likeComment ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
      }
      ).join("");
    
      const appAddForm =
      `<ul class="comments">
      ${listComment}
      </ul>
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
        <div class="add-form-row">
          <button class="delete-form-button">Удалить последний комментарий</button>
        </div>
      </div>`;
      appEl.innerHTML= appAddForm;

      const deleteButton = document.querySelector('.delete-form-button');
      deleteButton.addEventListener("click", () => {
        comments.pop();
        renderTasks();
      });
    
    const form = document.querySelector(".add-form");
    const newForm = form.innerHTML;
    
    answer();
    initEventLike();
    
    const buttonElement = document.querySelector(".add-form-button");
    const formName = document.querySelector(".add-form-name");
    const formText = document.querySelector(".add-form-text");
    
    buttonElement.addEventListener("click", () => {
      formName.classList.remove("error");
      if (formName.value === ""){
        formName.classList.add("error");
        return;
      };
      formText.classList.remove("error");
      if (formText.value === ""){
        formText.classList.add("error");
        return;
      };
    
      buttonElement.disabled = true;
      form.innerHTML = "Комментарий добавляется...";

      });
    
    const handlePostClick = () => {
      return newComment({name: formName.value, text:formText.value, token})
      .then((response) => {
        if(response.status === 500){
          throw new Error("Ошибка сервера");
        }
        })
        .then(() => {
           return fetch();
        })
      .then(() => {
        buttonElement.disabled = false;
        form.innerHTML = newForm;
        formName.value = "";
        formText.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        form.innerHTML = newForm;
        if(error.message === "Ошибка сервера"){
          alert("Сервер сломался")
            }
          })
      };
    
    buttonElement.addEventListener("click", handlePostClick);
    
    formName.addEventListener('keyup', function(event) {
      if(event.keyCode === 13) {
        event.preventDefault();
       buttonElement.click();
      }
    });
    formText.addEventListener('keyup', function(event) {
      event.preventDefault();
      if(event.keyCode === 13) {
        event.preventDefault();
       buttonElement.click();
      }
    });   
   };
renderTasks();
fetch();
