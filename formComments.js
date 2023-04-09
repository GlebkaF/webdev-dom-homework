//import { comments, postFetchPromise } from "./index.js";
import { myDate } from "./optionalFunction.js";


  //выключение кнопки
  
  // export const validateButton = () => {
  //   if (!inputNameElement.value || !textareaElement.value) {
  //     buttonElement.disabled = true;
  //   } else buttonElement.disabled = false;
  // }
  
  // export const initDisabledButtonElement = () => {
  //   validateButton();
  //   document.querySelectorAll(".add-form-text,.add-form-name").forEach((input) => {
  //     input.addEventListener("input", () => {
  //       validateButton();
  //     });
  //   });
  // };
  
 //ввод по кнопке enter

// export const pushEnter = () => {
// addFormElement.addEventListener('keyup', (ent) => {
//       if (ent.code === "Enter") {
//         buttonElement.click();
//         inputNameElement.value = '';
//         textareaElement.value = '';
//       }
//     });
//  }

// Смена класса кнопки лайка

// export const initChangeLikeButtonListeners = () => {
//     const likeButtonElements = document.querySelectorAll('.like-button');
  
//     for (const likeButtonElement of likeButtonElements) {
//       likeButtonElement.addEventListener('click', (event) => {
//         event.stopPropagation();
//         const index = likeButtonElement.dataset.index;
  
//         if (comments[index].isLike === false) {
//           comments[index].likes += 1;
//           comments[index].isLike = true;
  
  
//         } else {
//           comments[index].likes -= 1;
//           comments[index].isLike = false;
//         }
  
//         renderComments(listElement);
//       })
//     }
//   };

//редактирование комментария

  // export const initEditButtonListeners = () => {
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

// удаление комментария по отдельности

  export const deleteComment = () => {
    const deleteButtonElements = document.querySelectorAll('.delete-button');
    for (const deleteButtonElement of deleteButtonElements) {
      deleteButtonElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = deleteButtonElement.dataset.index;
        comments.splice(index, 1);
        renderComments(listElement);
      });
    }
  };

//Удаление последнего комментария

  // export const deleteLastComment = () => {
  //   const deleteLastButtonElement = document.querySelector('.add-form-button--remove');
  
  //   deleteLastButtonElement.addEventListener('click', () => {
  //     comments.pop();
  //     renderComments(listElement);
  //   });
  // };

//Ответ на комментарий с цитатой (задание со звездочкой 2.11)

  const answerQuoteToComment = () => {
    const commentListItems = document.querySelectorAll('.comment');
    for (const commentListItem of commentListItems) {
      commentListItem.addEventListener('click', () => {
        const userName = commentListItem.dataset.name;
        const userComment = commentListItem.dataset.comment;
        textareaElement.value = `*_${userName}: \n${userComment}__*`;
      })
    }
  }

//добавление нового комментария

//  export const pushNewComment = () => {
//   buttonElement.addEventListener('click', () => {
//     inputNameElement.classList.remove('error');
//     textareaElement.classList.remove('error')
//     if (!inputNameElement.value || !textareaElement.value) {
//       inputNameElement.classList.add('error');
//       textareaElement.classList.add('error');
//       return;
//     };
  
//     buttonElement.disabled = true;
//     buttonElement.textContent = "Добавляется..."
//     addFormElement.classList.add('-display-block')
//     console.log(addFormElement);
//     postFetchPromise().then((response) => {
//     buttonElement.disabled = false;
//       buttonElement.textContent = "Написать"
//       inputNameElement.value = '';
//       textareaElement.value = '';
//       return response
//     }).catch((error) => {
//       addFormElement.classList.remove('-display-block')
//       buttonElement.disabled = false;
//       buttonElement.textContent = 'Написать';
//       if(!navigator.onLine) {
//         alert('Кажется, у вас сломался интернет, попробуйте позже')
//         // throw new Error("Сломался интернет")
//       }
//       console.warn(error);
//   });
//     renderComments(listElement);
//     buttonElement.disabled = true;
//     addFormElement.classList.remove('-display-block')
//   });
//  }
  
//рендер функция
// export const loaderCommentsElement = document.getElementById('loaderComments');

// export const renderComments = ({token}) => {
//   const appEl = document.getElementById('app');
//   if(!token) {
//     const commentHtml = comments.map((comment, index) => {
//       return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
//     <div class="comment-header">
//       <div>${comment.name}</div>
//       <div>${myDate(new Date(comment.date))}</div>
//     </div>
//     <div class="comment-body">
  
//       ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.text}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
    
//     </div>
//     <div class="comment-footer">
//      <div class="likes">
//       <span class="likes-counter">${comment.likes}</span>
  
//       <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>
  
//       ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
      
//       <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
//      </div>
//     </div>
//   </li>`
//     }).join('');
//   }

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
 

//   const appHtml = `<section id="loaderComments" class="loader -display-none">
//   <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
// </section>
// <div class="container">
//   <ul class="comments">
//   <!-- список рендерится из js !!!!!!!-->
//   ${commentHtml}
//   </ul>

//   <div class="add-form add-form--register">
//     <h3>Форма авторизации</h3>
//     <input
//       type="text"
//       class="add-form-login"
//       placeholder="Введите логин"
//       value=""
//     />
//     <input
//       type="password"
//       class="add-form-password"
//       placeholder="Введите пароль"
//       rows="4"
//       value = ""
//     ></input>
//     <div class="add-form-row">
//       <button class="login-form-button">Войти</button> 
//     </div>
//   </div>

//   <div class="add-form">
//     <input
//       type="text"
//       class="add-form-name"
//       placeholder="Введите ваше имя"
//       value=""
//     />
//     <textarea
//       type="textarea"
//       class="add-form-text"
//       placeholder="Введите ваш комментарий"
//       rows="4"
//       value = ""
//     ></textarea>
//     <div class="add-form-row">
//       <button class="add-form-button">Написать</button>
//       <button class="add-form-button add-form-button--remove">Удалить последний комментарий</button>
//     </div>
//   </div>
// </div>`;

    
  
//     appEl.innerHTML = appHtml;
    

//     const buttonElement = document.querySelector('button.add-form-button');
//     const listElement = document.querySelector('.comments');
//     const inputNameElement = document.querySelector('.add-form-name');
//     const textareaElement = document.querySelector('.add-form-text'); //export const loaderCommentsElement = document.getElementById('loaderComments');
//     const addFormElement = document.querySelector('.add-form');


//       buttonElement.addEventListener('click', () => {
//         inputNameElement.classList.remove('error');
//         textareaElement.classList.remove('error')
//         if (!inputNameElement.value || !textareaElement.value) {
//           inputNameElement.classList.add('error');
//           textareaElement.classList.add('error');
//           return;
//         };
      
//         buttonElement.disabled = true;
//         buttonElement.textContent = "Добавляется..."
//         addFormElement.classList.add('-display-block')
//         console.log(addFormElement);
//         postFetchPromise().then((response) => {
//         buttonElement.disabled = false;
//           buttonElement.textContent = "Написать"
//           inputNameElement.value = '';
//           textareaElement.value = '';
//           return response
//         }).catch((error) => {
//           addFormElement.classList.remove('-display-block')
//           buttonElement.disabled = false;
//           buttonElement.textContent = 'Написать';
//           if(!navigator.onLine) {
//             alert('Кажется, у вас сломался интернет, попробуйте позже')
//             // throw new Error("Сломался интернет")
//           }
//           console.warn(error);
//       });
//         renderComments(listElement);
//         buttonElement.disabled = true;
//         addFormElement.classList.remove('-display-block')
//       });
     
    
//     const validateButton = () => {
//       if (!inputNameElement.value || !textareaElement.value) {
//         buttonElement.disabled = true;
//       } else buttonElement.disabled = false;
//     }

//     const initDisabledButtonElement = () => {
//       validateButton();
//       document.querySelectorAll(".add-form-text,.add-form-name").forEach((input) => {
//         input.addEventListener("input", () => {
//           validateButton();
//         });
//       });
//     };

//     const pushEnter = () => {
//       addFormElement.addEventListener('keyup', (ent) => {
//             if (ent.code === "Enter") {
//               buttonElement.click();
//               inputNameElement.value = '';
//               textareaElement.value = '';
//             }
//           });
//        }

//     pushEnter();
//     //pushNewComment();
//     initChangeLikeButtonListeners();
//     initEditButtonListeners();
//     initDisabledButtonElement();
//     deleteComment();
//     //answerToComment(); ДЗ 2.11
//     answerQuoteToComment(); // ДЗ со звездочкой 2.11
//   }
