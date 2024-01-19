"use strict";

import { getTodos, postTodo } from "./api.js";
import { renderComments } from "./renderComments.js";


    const buttonElement = document.querySelector ('.add-form-button');
    const inputElement = document.querySelector ('.add-form-name');
    const textareaElement = document.querySelector ('.add-form-text');

    const likeEventListerner = () => {
      const likeButtonElements = document.querySelectorAll('.like-button');
      for (const likeButtonElement of likeButtonElements) { 
        likeButtonElement.addEventListener ('click', event => {
          event.stopPropagation();
          const index = likeButtonElement.dataset.index;
          if (comments[index].isLike === false) {
            comments[index].like++;
            comments[index].isLike = true;
        } else {
            comments[index].like--;
            comments[index].isLike = false;
          };
          renderComments({ comments, likeEventListerner, commentEventListener });
        });
      };
    };

    const commentEventListener = () => {
        const commentElements = document.querySelectorAll('.comment');
        for(const comment of commentElements) {
            comment.addEventListener('click', () => {
            const index = comment.dataset.index;
            const text = `QUOTE_BEGIN >${comments[index].comment};
            
    ${comments[index].name}, QUOTE_END`;
            textareaElement.value = text.replaceAll('QUOTE_BEGIN', '').replaceAll('QUOTE_END', '');
            });
        };
    };

    let comments = [];

    const fetchAndRenderComments = () => { //Обернул в функцию
      getTodos().then((responseData) => {
          comments = responseData.comments.map((comment) => {
            return { 
            name: comment.author.name, 
            time: new Date(comment.date).toLocaleTimeString('sm', {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}), 
            comment: comment.text, 
            like: comment.likes, 
            isLike: false, 
            };
          }); 
        const textExpectation = document.querySelector('.title');
        textExpectation.style.display = 'none';
        renderComments({ comments, likeEventListerner, commentEventListener }); 
      }).catch((error) => {
         buttonElement.disabled = false;
         buttonElement.textContent = 'Написать';
         alert('Кажется, у вас сломался интернет, попробуйте позже');
         console.warn(error);
      }); 
    };

    fetchAndRenderComments();

    
   const buttonElementLinester = () => {
        if (inputElement.value === '' && textareaElement.value === '') {
          inputElement.classList.add('error');
          textareaElement.classList.add('error');
            return;
        } else if (inputElement.value === '') {
            inputElement.classList.add('error');
            return;
        } else if (textareaElement.value === '') {
            textareaElement.classList.add('error');
            return;
        } else {
          inputElement.classList.remove('error');
          textareaElement.classList.remove('error');
        };
      };


    buttonElement.addEventListener('click', () => {
      buttonElementLinester();
      buttonElement.disabled = true;
      buttonElement.textContent = 'Комментарий загружается...';
      buttonElement.classList.remove('hover');


      postTodo({
        name: inputElement.value,
        text: textareaElement.value,
      }).then(() => {
        console.log(1);
        return fetchAndRenderComments();
      }).then(() => {
        console.log(2);
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
          inputElement.value = '';
          textareaElement.value = '';
      }).catch((error) => {
         buttonElement.disabled = false;
         buttonElement.textContent = 'Написать';
         console.warn(error);
      }); 

      renderComments({ comments, likeEventListerner, commentEventListener });
    });
    renderComments({ comments, likeEventListerner, commentEventListener });
    console.log("It works!");