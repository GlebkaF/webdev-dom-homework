    "use strict";

import { getComments } from "./api.js";
import { postComment } from "./api.js";

    const buttonElement = document.getElementById("add-button");
    const commentsElement = document.getElementById("comments");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.querySelector(".add-form-text");
    const textareaInputElement = document.getElementById("textarea-input");


        // Ответ на комментарий
    const answerText = () => {
    const textTextElement = document.querySelectorAll('.comment-text');
    const textNameElement = document.querySelectorAll('.comment-name');
    for (const text of textTextElement) {
      text.addEventListener("click", () => {
        const index = text.dataset.index;
        textInputElement.value = 
        `>${textTextElement[index].innerHTML} ${textNameElement[index].innerHTML}`;
      });
    }
  }
  

    // Кнопка лайков работает
    const initEventlikes = () => {
      const likeButtons = Array.from(document.querySelectorAll(".like-button"));
      const likeCount = Array.from(document.querySelectorAll(".likes-counter"));
      likeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          button.classList.toggle('-active-like');
          const current = Number(likeCount[index].innerHTML);
          const plus = button.classList.contains('-active-like') ? 1 : - 1;
          likeCount[index].innerHTML = current + plus;
        });
      });
    };

  const initDeliteButtonsListeners = () => {
    const deleteButtonElement = document.querySelector(".delete-button");
    deleteButtonElement.addEventListener('click', () => {
      comments.pop();
      renderComments();
    });
  };

    // Текущая дата
    function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    var hour = date.getHours();
    var min = date.getMinutes();
    if (min < 10) min = '0' + min;
    var sec = date.getSeconds();
    return dd + '.' + mm + '.' + yy + ', ' + hour + ':' + min + ':' + sec;
};   
    var d = new Date();
    
    
    // Массив TODO получать из хранилища данных
    let comments = [];

    const fetchAndRenderComments = () => {
    getComments().then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString(),
          text: comment.text,
          likes: comment.likes,
        };
      });
    renderComments();
    });
  };


    // Рендер
    const renderComments = () => {
      const commentsHtml = comments.map((comment, index) => {
        return  ` <li class="comment">
          <div class="comment-header">
            <div class="comment-name" data-index="${index}">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
          <div class="comment-text" data-index="${index}">
            ${comment.text}
            </div>
          </div>  
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li> `;
        })
        .join("");

      commentsElement.innerHTML = commentsHtml;
      answerText();
      initEventlikes();
      initDeliteButtonsListeners();
    };
    
    fetchAndRenderComments();
    renderComments();
      
    

    /* код для проверки, что комментарий не пустой и отправки комментария 
    скопировали код nameInput чтобы не писать его дважды, тк одно действие и те же проверки
    */
    const onSubmit = () => {
      nameInputElement.classList.remove("error");
    if (nameInputElement.value === '') {
      nameInputElement.classList.add("error"); 
      return;
    }
      textareaInputElement.classList.remove("error");
    if (textareaInputElement.value === '') {
      textareaInputElement.classList.add("error"); 
      return;
    }
  

    
    // дополнительно кнопка написать не активна при пустых значениях //
    buttonElement.setAttribute('disabled', true);
    nameInputElement.oninput = function(){
      if (nameInputElement.value === '' && textareaInputElement.value === ''){
        buttonElement.setAttribute('disabled', true);
        return;
      }else{
        buttonElement.removeAttribute('disabled');
        return;
      }
    };
  
    
    /////////////////////////////////////////////
    // TODO добавлять задачу в хранилище данных

    const startAt = Date.now();
  
    buttonElement.disabled = true;
    buttonElement.textContent = 'Элемент добавляется...';

    
      postComment({
        name: nameInputElement.value,
        text: textInputElement.value,
      }).then((response) => {
          console.log("Время: " + (Date.now() - startAt));
          return response;
        })
        .then(() => {
          fetchAndRenderComments();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
          nameInputElement.value = "";
          textareaInputElement.value = "";
        })
        // интернет отключили
        .catch((error) => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
          if (response.status === 400) {
            alert("Пропал интернет, попробуй позже");
          }
          else{
            return pesponse;
          }
        });

        renderComments();
  }; 

    document.addEventListener("keydown", (event) => {
     
     if (event.key === "Enter") {
       onSubmit();
     }
   });

    const initEventListeners = () => {
      const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
      });
    };
  };
  
  renderComments();

    // Вынесли код обработчика в отдельную функцию onSubmit - (enterPress)
    buttonElement.addEventListener('click', onSubmit);