import {renderComments, validateButton, initDisabledButtonElement, deleteLastComment, deleteComment, pushEnter} from "./formComments.js";
// import { getFetchPromise } from "./fetchPromise.js";
import { myDate, secureInput} from "./optionalFunction.js";
export const buttonElement = document.querySelector('button.add-form-button');
export const listElement = document.querySelector('.comments');
export const inputNameElement = document.querySelector('.add-form-name');
export const textareaElement = document.querySelector('.add-form-text');
export const loaderCommentsElement = document.getElementById('loaderComments');
export const addFormElement = document.querySelector('.add-form')



// export const myDate = () => {
//   const getDate = new Date();
//   const options = {
//     year: "2-digit",
//     month: "2-digit",
//     day: "2-digit",
//     timezone: "UTC",
//     hour: "numeric",
//     minute: "2-digit"
//   };
  
//   options.hour = "2-digit";
//   return getDate.toLocaleDateString("ru-Ru", options).split(', ').join(' ');
// }

// //выключение кнопки

// const validateButton = () => {
//   if (!inputNameElement.value || !textareaElement.value) {
//     buttonElement.disabled = true;
//   } else buttonElement.disabled = false;
// }

// const initDisabledButtonElement = () => {
//   validateButton();
//   document.querySelectorAll(".add-form-text,.add-form-name").forEach((input) => {
//     input.addEventListener("input", () => {
//       validateButton();
//     });
//   });
// };

// initDisabledButtonElement();


// //обезопасить ввод данных пользователя

// export const secureInput = (safeText) => {
//   return safeText
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//   //.replaceAll("&", "&amp;")
//   //.replaceAll('"', "&quot;");
// }

//GET API

export let comments = [];

//функция GET

export const getFetchPromise = () => {
  loaderCommentsElement.classList.remove('-display-none');
  return fetch('https://webdev-hw-api.vercel.app/api/v1/:natalvod/comments',{
    method: "GET"
  }).then((response) => {
    if (response.status === 200){
      return response.json();
   } else {
     throw new Error("Сервер сломался, попробуй позже")
    }
  //return response.json();
  }).then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: secureInput(comment.author.name),
        date: myDate(new Date(comment.date)),
        text: secureInput(comment.text),
        likes: comment.likes,
        isLike: false,
      };
    })
    comments = appComments;
    loaderCommentsElement.classList.add('-display-none');
    renderComments(listElement);
  }).catch((error) => {
    alert('Сервер не работает, повторите попытку позже');
    console.warn(error);
  });
}
getFetchPromise();

//рендер функция

// const renderComments = () => {
//   const commentHtml = comments.map((comment, index) => {
//     return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
//   <div class="comment-header">
//     <div>${comment.name}</div>
//     <div>${myDate(new Date(comment.date))}</div>
//   </div>
//   <div class="comment-body">

//     ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.text}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
  
//   </div>
//   <div class="comment-footer">
//    <div class="likes">
//     <span class="likes-counter">${comment.likes}</span>

//     <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>

//     ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
    
//     <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
//    </div>
//   </div>
// </li>`
//   }).join('');

//   listElement.innerHTML = commentHtml;

//   initChangeLikeButtonListeners();
//   initEditButtonListeners();
//   deleteComment();
//   //answerToComment(); ДЗ 2.11
//   answerQuoteToComment(); // ДЗ со звездочкой 2.11
// }
// getFetchPromise()
//редактировать комментарии

renderComments(listElement)

// const initEditButtonListeners = () => {
//   const editButtons = document.querySelectorAll(".edit-button");
//   for (const editButton of editButtons) {
//     editButton.addEventListener('click', (e) => {
//       e.stopPropagation();
//       const index = editButton.dataset.index;

//       if (comments[index].isEdit === false) {
//         comments[index].isEdit = true;

//       } else {
//         comments[index].isEdit = false;
//         const textareaEditElements = document.querySelectorAll(".edit-area-text");
//         for (const textareaEditElement of textareaEditElements) {
//           comments[index].text = textareaEditElement.value;
//         }
//       }
//       renderComments(listElement);
//     })
//   };
//   const saveButtons = document.querySelectorAll(".save-button");
//   for (const saveButton of saveButtons) {
//     saveButton.addEventListener('click', (e) => {
//       e.stopPropagation();
//       const index = saveButton.dataset.index;
//       if (comments[index].isEdit === false) {
//         comments[index].isEdit = true;
//       } else {
//         comments[index].isEdit = false;
//         const textareaEditElements = document.querySelectorAll(".edit-area-text");
//         for (const textareaEditElement of textareaEditElements) {
//           comments[index].text = textareaEditElement.value;
//         }
//       }
//       renderComments(listElement)

//     });
//   }
// };

//Смена класса кнопки лайка

// export const initChangeLikeButtonListeners = () => {
//   const likeButtonElements = document.querySelectorAll('.like-button');

//   for (const likeButtonElement of likeButtonElements) {
//     likeButtonElement.addEventListener('click', (event) => {
//       event.stopPropagation();
//       const index = likeButtonElement.dataset.index;

//       if (comments[index].isLike === false) {
//         comments[index].likes += 1;
//         comments[index].isLike = true;


//       } else {
//         comments[index].likes -= 1;
//         comments[index].isLike = false;
//       }

//       renderComments(listElement);
//     })
//   }
// };


// initEditButtonListeners()
// initChangeLikeButtonListeners()

//Ответ на комментарий (ДЗ 2.11)

// const answerToComment = () => {
//   const commentTexts = document.querySelectorAll('.comment-text');
//   for (const commentText of commentTexts) {
//     commentText.addEventListener('click', (event) => {
//       event.stopPropagation();
//       const userName = commentText.dataset.name;
//       const userComment = commentText.dataset.comment;
//       // const index = el.dataset.index;
//       textareaElement.value = `>${userComment} \n${userName}`;
//       renderComments(listElement);
//     })
//   }
// }

//answerToComment();

//Ответ на комментарий с цитатой (задание со звездочкой 2.11)

// const answerQuoteToComment = () => {
//   const commentListItems = document.querySelectorAll('.comment');
//   for (const commentListItem of commentListItems) {
//     commentListItem.addEventListener('click', () => {
//       const userName = commentListItem.dataset.name;
//       const userComment = commentListItem.dataset.comment;
//       textareaElement.value = `*_${userName}: \n${userComment}__*`;
//     })
//   }
// }
//answerQuoteToComment();

//удаление комментария по отдельности

// export const deleteComment = () => {
//   const deleteButtonElements = document.querySelectorAll('.delete-button');
//   for (const deleteButtonElement of deleteButtonElements) {
//     deleteButtonElement.addEventListener('click', (e) => {
//       e.stopPropagation();
//       const index = deleteButtonElement.dataset.index;
//       comments.splice(index, 1);
//       renderComments(listElement);
//     });
//   }
// };

deleteComment();

//удаление последнего комментария

// const deleteLastComment = () => {
//   const deleteLastButtonElement = document.querySelector('.add-form-button--remove');

//   deleteLastButtonElement.addEventListener('click', () => {
//     comments.pop();
//     renderComments(listElement);
//   });
// };

deleteLastComment();
getFetchPromise();
pushEnter();
renderComments(listElement);

//Функция POST

const postFetchPromise = () => {
  
  return fetch('https://webdev-hw-api.vercel.app/api/v1/:natalvod/comments', {
    method: "POST",
    body: JSON.stringify({
      name: secureInput(inputNameElement.value),
      date: myDate(new Date),
      text: secureInput(textareaElement.value),
      likes: 0,
      isLike: false,
      forceError: false,
    }),
  }).then((response) => {

    if (response.status === 201){
       return response.json();
    } else if (response.status === 500) {
      alert('Сервер не работает, повторите попытку позже')
      throw new Error("Сервер сломался, попробуй позже")
     } else if (response.status === 400) {
      alert ('Имя и комментарий должны быть не короче 3 символов')
      throw new Error("Имя и комментарий короче 3 символов")
    }  
  }).then(() => {
    return getFetchPromise();
  })
}


//добавление нового комментария

buttonElement.addEventListener('click', () => {
  inputNameElement.classList.remove('error');
  textareaElement.classList.remove('error')
  if (!inputNameElement.value || !textareaElement.value) {
    inputNameElement.classList.add('error');
    textareaElement.classList.add('error');
    return;
  };

  buttonElement.disabled = true;
  buttonElement.textContent = "Добавляется..."
  addFormElement.classList.add('-display-block')
  console.log(addFormElement);
  postFetchPromise().then((response) => {
  buttonElement.disabled = false;
    buttonElement.textContent = "Написать"
    inputNameElement.value = '';
    textareaElement.value = '';
    return response
  }).catch((error) => {
    addFormElement.classList.remove('-display-block')
    buttonElement.disabled = false;
    buttonElement.textContent = 'Написать';
    if(!navigator.onLine) {
      alert('Кажется, у вас сломался интернет, попробуйте позже')
      // throw new Error("Сломался интернет")
    }
    console.warn(error);
});
  renderComments(listElement);
  buttonElement.disabled = true;
  addFormElement.classList.remove('-display-block')
});

validateButton()
initDisabledButtonElement()
// pushEnter()
// //ввод по кнопке enter

// const formEnter = document.querySelector('.add-form');
//const pushEnter = () => {
  //const formEnter = document.querySelector('.add-form');
 // formEnter.addEventListener('keyup', (ent) => {
    //   if (ent.code === "Enter") {
    //     buttonElement.click();
    //     inputNameElement.value = '';
    //     textareaElement.value = '';
    //   }
    // });
 //}
  // formEnter.addEventListener('keyup', (ent) => {
//   if (ent.code === "Enter") {
//     buttonElement.click();
//     inputNameElement.value = '';
//     textareaElement.value = '';
//   }
// });





