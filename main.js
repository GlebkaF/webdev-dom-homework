import { getComments, postComment } from "./modules/api.js";
import { enterComment } from "./modules/enterComment.js";
import { initAnsverEvent } from "./modules/initAnsverEvent.js";
import { initDeleteEvent } from "./modules/initDeleteEvent.js";
import { initLikeEvent } from "./modules/initLikeEvent.js";
import { initRedactorEvent } from "./modules/initRedactorEvent.js";
import { renderListElement } from "./modules/renderListElement.js";

const listElement = document.getElementById('list');
  const buttonElement = document.getElementById('add-button');
  const nameInputElement = document.getElementById('name');
  const commentTextareaElement = document.getElementById('comment');
  const formElement = document.getElementById('form');
  const loaderListElement = document.getElementById('loader-list');
  const loaderCommentElement = document.getElementById('loader-comment');

  //Запрашиваем список комментариев (fetch GET)
  const fetchGet = () => {
    getComments().then((responseData) => {
      console.log(responseData)
      
      const appComments = responseData.comments.map((comment) => {
        let currentDate = new Date(comment.date);
        let myDate = currentDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: '2-digit' }) + ' ' + currentDate.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
        return {
          name: comment.author.name,
          date: myDate,
          comment: comment.text,
          like: comment.isLiked,
          likeNumber: comment.likes,
          id: comment.id,
        }
      })

      listElementData = appComments;
      renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, enterComment, nameInputElement });
      loaderListElement.style.display = 'none';
    })
    .catch((error) => {
      if (error === 'Сервер сломался, попробуй позже') {
        alert('Сервер сломался, попробуй позже')
      }
      else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      console.warn(error);
      formElement.style.display = 'flex';
      loaderCommentElement.style.display = 'none';
    });;
  } 
  
  loaderCommentElement.style.display = 'none';
  
  let listElementData = [];

  fetchGet();

  //Ф-ция цитаты
  initAnsverEvent({ listElementData, commentTextareaElement, renderListElement });

  //Ф-ция лайков
  initLikeEvent({ listElementData, renderListElement });

  //Ф-ция редактирования через кнопку (не доработано)
  initRedactorEvent({ renderListElement });

  //Ф-ция удаления через кнопку
  initDeleteEvent({ listElementData, renderListElement });

  renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, enterComment, nameInputElement });

  //Событие выключения кнопки "Написать"
  document.addEventListener('mouseover', () => {
    if (nameInputElement.value === '' || commentTextareaElement.value === '') {
      buttonElement.classList.add('button-off');
      buttonElement.disabled = true;
    }
  })

  //Событие включения кнопки "Написать"
  document.addEventListener('keyup', () => {
    if (nameInputElement.value !== '' && commentTextareaElement.value !== '') {
      buttonElement.classList.remove('button-off');
      buttonElement.disabled = false;
    }
  })

  //Ф-ция добавления комментария
  enterComment({ nameInputElement, commentTextareaElement,listElement, loaderCommentElement, formElement, listElementData, renderListElement });

  //Вызываем функцию добавления комментария через комбинацию клавиш Ctrl + Enter
  document.addEventListener('keyup', function (e, l) {
    if (e.ctrlKey & e.key === 'Enter') {
      enterComment({ nameInputElement, commentTextareaElement,listElement, loaderCommentElement, formElement, listElementData, renderListElement });
    }
  });
  //Вызываем функцию добавления комментария через клие по кнопке "Написать"
  buttonElement.addEventListener('click', () => {
    enterComment({ nameInputElement, commentTextareaElement,listElement, loaderCommentElement, formElement, listElementData, renderListElement });
  });