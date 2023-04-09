import { 
  //deleteLastComment, deleteComment 
} from "./formComments.js";
import { myDate, secureInput} from "./optionalFunction.js";

// export const buttonElement = document.querySelector('button.add-form-button');
export const listElement = document.querySelector('.comments');
// export const inputNameElement = document.querySelector('.add-form-name');
// export const textareaElement = document.querySelector('.add-form-text'); 
//export const loaderCommentsElement = document.getElementById('loaderComments');
// export const addFormElement = document.querySelector('.add-form')
export const loaderCommentsElement = document.getElementById('loaderComments');
//массив comments

export let comments = [];

//функция GET

let host = 'https://webdev-hw-api.vercel.app/api/v2/:natalvod/comments';

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

export const getFetchPromise = () => {
  //loaderCommentsElement.classList.remove('-display-none');
  return fetch(host,{
    method: "GET",
    headers: {
      Authorization: token,
  }
  }).then((response) => {
    if (response.status === 200){
      return response.json();
     } else if (response.status === 401) {
        throw new Error("Нет авторизации");
    } else {
     throw new Error("Сервер сломался, попробуй позже")
    };
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
    //loaderCommentsElement.classList.add('-display-none');
    renderComments(listElement);
  }).catch((error) => {
    alert('Сервер не работает, повторите попытку позже');
    console.warn(error);
  });
};



export const renderComments = () => {
  const commentHtml = comments.map((comment, index) => {
    return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${myDate(new Date(comment.date))}</div>
  </div>
  <div class="comment-body">

    ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.text}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
  
  </div>
  <div class="comment-footer">
   <div class="likes">
    <span class="likes-counter">${comment.likes}</span>

    <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>

    ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
    
    <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
   </div>
  </div>
</li>`
  }).join('');

  const appEl = document.getElementById('app');

  const appHtml = `
  <section id="loaderComments" class="loader -display-none">
    <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
  </section>
<div class="container">
  <ul class="comments">
  <!-- список рендерится из js !!!!!!!-->
  ${commentHtml}
  </ul>
  <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      value=""
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш комментарий"
      rows="4"
      value = ""
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
      <button class="add-form-button add-form-button--remove">Удалить последний комментарий</button>
    </div>
  </div>
</div>`;
  
  if(!token) {
    const appHtml = `<section id="loaderComments" class="loader -display-none">
    <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
  </section>
  <div class="container">
    <ul class="comments">
    <!-- список рендерится из js !!!!!!!-->
    ${commentHtml}
    </ul>
  
    <div class="add-form add-form--register">
      <h3>Форма авторизации</h3>
      <input
        type="text"
        class="add-form-login"
        placeholder="Введите логин"
        value=""
      />
      <input
        type="password"
        class="add-form-password"
        placeholder="Введите пароль"
        rows="4"
        value = ""
      ></input>
      <div class="add-form-row">
      <button class="login-form-button">Войти</button>
      </div>
    </div>`;

  appEl.innerHTML = appHtml;

document.querySelector('.login-form-button').addEventListener('click', () => {
  token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
  getFetchPromise();
  //renderComments();
})

  return;
  }


  appEl.innerHTML = appHtml;


//   const appHtml = `
//   <section id="loaderComments" class="loader -display-none">
//     <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
//   </section>
// <div class="container">
//   <ul class="comments">
//   <!-- список рендерится из js !!!!!!!-->
//   ${commentHtml}
//   </ul>
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

    
  
    // appEl.innerHTML = appHtml;
    

    const buttonElement = document.querySelector('button.add-form-button');
    const listElement = document.querySelector('.comments');
    const inputNameElement = document.querySelector('.add-form-name');
    const textareaElement = document.querySelector('.add-form-text'); //export const loaderCommentsElement = document.getElementById('loaderComments');
    const addFormElement = document.querySelector('.add-form');


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
     
    
    const validateButton = () => {
      if (!inputNameElement.value || !textareaElement.value) {
        buttonElement.disabled = true;
      } else buttonElement.disabled = false;
    }

    const initDisabledButtonElement = () => {
      validateButton();
      document.querySelectorAll(".add-form-text,.add-form-name").forEach((input) => {
        input.addEventListener("input", () => {
          validateButton();
        });
      });
    };

    const pushEnter = () => {
      addFormElement.addEventListener('keyup', (ent) => {
            if (ent.code === "Enter") {
              buttonElement.click();
              inputNameElement.value = '';
              textareaElement.value = '';
            }
          });
       }

    pushEnter();
    //pushNewComment();
    //initChangeLikeButtonListeners();
    //initEditButtonListeners();
    initDisabledButtonElement();
    //deleteComment();
    //answerToComment(); ДЗ 2.11
    //answerQuoteToComment(); // ДЗ со звездочкой 2.11
  }

//getFetchPromise();
renderComments(listElement)


//Функция POST

export const postFetchPromise = (
  //{name, date, text, forceError, token}
  ) => {
  
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: secureInput(inputNameElement.value),
      date: myDate(new Date),
      text: secureInput(textareaElement.value),
      likes: 0,
      isLike: false,
      forceError: false,
      // name,
      // date,
      // text,
      // forceError,
    }),
    headers: {
      Authorization: token,
  }
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

//validateButton()
//initDisabledButtonElement()
//deleteLastComment();
//deleteComment();
getFetchPromise();
//pushEnter();
//pushNewComment();
renderComments(listElement);





