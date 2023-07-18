import { getComments, postComment } from "./modules/api.js";
import { initAnsverEvent } from "./modules/initAnsverEvent.js";
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
      renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
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
  initAnsverEvent({ listElementData, commentTextareaElement, listElement });

  //Ф-ция лайков
  const initLikeEvent = () => {
    for (const likeButton of document.querySelectorAll('.like-button')) {
      likeButton.addEventListener('click', () => {
        event.stopPropagation();
        const index = likeButton.dataset.index;
        if (listElementData[index].like === false) {
          listElementData[index].like = true;
          listElementData[index].likeNumber += 1;
        } else {
          listElementData[index].like = false;
          listElementData[index].likeNumber -= 1;
        }
        console.log(commentTextareaElement.value);

        renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
      })
    }
  }

  //Ф-ция редактирования через кнопку (не доработано)
  const initRedactorEvent = () => {
    for (const redactorButton of document.querySelectorAll('.redactor-button')) {
      redactorButton.addEventListener('click', () => {
        event.stopPropagation();
        const index = redactorButton.dataset.index;
        console.log(index);

        renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
      })
    }
  }

  //Ф-ция удаления через кнопку
  const initDeleteEvent = () => {
    for (const deleteButton of document.querySelectorAll('.delete-button')) {
      deleteButton.addEventListener('click', () => {
        event.stopPropagation();
        const index = deleteButton.dataset.index;
        listElementData.splice(index, 1);

        renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
      })
    }
  }

  renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });

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
  const enterComment = () => {
    nameInputElement.classList.remove('error');
    commentTextareaElement.classList.remove('error');

    if (nameInputElement.value === '' && commentTextareaElement.value === '') {
      nameInputElement.classList.add('error');
      commentTextareaElement.classList.add('error');
      return;
    }
    else if (commentTextareaElement.value === '') {
      commentTextareaElement.classList.add('error');
      return;
    }
    else if (nameInputElement.value === '') {
      nameInputElement.classList.add('error');
      return;
    }
    else {
      loaderCommentElement.style.display = 'block';
      formElement.style.display = 'none';
    }

    
    //Добавляем комментарий в список комментариев (fetch POST)
    const fetchPost = () => {
      postComment({
        text: commentTextareaElement.value,
        name: nameInputElement.value,
      }).then((responseData) => {
        console.log(responseData);

        return fetchGet();
      })
      .then(() => {
        formElement.style.display = 'flex';
        loaderCommentElement.style.display = 'none';
        nameInputElement.value = '';
        commentTextareaElement.value = '';
      })
      .catch((error, typeError) => {
        if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
          alert ('Имя и комментарий должны быть не короче 3 символов');
          console.log(3);
        } 
        else if(error.message === 'Сервер сломался, попробуй позже') {   
          console.log(4);       
          fetchPost();
          // (Основная часть ДЗ. Закомменчена, чтобы не конфликтовать с дополнительной частью.)  
          // alert('Сервер сломался, попробуй позже');      
        }
        else {
          console.log(5);
          alert("Кажется, у вас сломался интернет, попробуйте позже");   
        }        
        console.warn(error);
        formElement.style.display = 'flex';
        loaderCommentElement.style.display = 'none';
      });
    }
    
    fetchPost();
    renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
    initLikeEvent();
  }

  //Вызываем функцию добавления комментария через комбинацию клавиш Ctrl + Enter
  document.addEventListener('keyup', function (e, l) {
    if (e.ctrlKey & e.key === 'Enter') {
      enterComment();
    }
  });
  //Вызываем функцию добавления комментария через клие по кнопке "Написать"
  buttonElement.addEventListener('click', () => {
    enterComment();
  });