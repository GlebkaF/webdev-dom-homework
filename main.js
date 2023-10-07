    "use strict";

import { getComments } from "./api.js";
import { postComment } from "./api.js";

    const buttonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.querySelector(".add-form-text");
    const textareaInputElement = document.getElementById("textarea-input");


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
  if (textareaInputElement.value === "") {
    textareaInputElement.classList.add("error");
    return;
  }

    // дополнительно кнопка написать не активна при пустых значениях //
    buttonElement.setAttribute('disabled', true);
    nameInputElement.oninput = function(){
      if (nameInputElement.value === '' && textareaInputElement.value === ''){
        buttonElement.setAttribute('disabled', true);
        return;
    } else {
      buttonElement.removeAttribute("disabled");
      return;
    }
  };


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