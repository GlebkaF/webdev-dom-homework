// import {commentElement as appEl} from "./main.js";
// import {getLikeButton,changeComment} from "./main.js";
import {renderLoginComponent } from "./login-components.js";
import { getPost } from "./api.js";
import {getFetchPromice} from "./main.js";
import { getList } from "./list.js";
 

// let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
let token = null;
let name = null;

const renderApp = (comments, list) => {
  const appEl = document.getElementById ("app");
  if (!token) {
    renderLoginComponent({
      comments,
      appEl,
    setToken: (newToken) => {
      token = newToken;
    },
    setName: (newName) => {
      name = newName; 
    },
    getFetchPromice});
  } else { 

const commentsHtml = comments.map((comment, index) => list(comment, index)).join(""); 
const appHtml = `<div class="container">
     <ul class="comments">   
      ${commentsHtml}
     </ul>
     <div class="add-form">
 <input type="text" class ="add-form-name" value = "${name}" />
  <textarea type="textarea" class="add-form-text" placeholder ="Введите ваш коментарий" rows="4" ></textarea>
       <div class="add-form-row">
         <button class="add-form-button">Написать</button>  
       </div>
     </div>
     <div class="comment-loading">Комментарий добавляется...</div> 
     </div>`;

appEl.innerHTML = appHtml;

const formCommentElement = document.querySelector ('.add-form')
const buttonElement = document.querySelector ('.add-form-button');
const currentDate = new Date().toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
" " + new Date().toLocaleTimeString().slice(0, -3);
const buttontwoElement = document.getElementById ('buttontwo');
const loadingElement = document.querySelector ('.page-loading');
const commentLoadingElement = document.querySelector('.comment-loading');
const inputNameElement = document.querySelector ('.add-form-name');
const inputTextElement = document.querySelector ('.add-form-text');
const commentElement = document.querySelector ('.comments');
 
function changeComment () {
  const textComments = document.querySelectorAll ('.comment');
  for (const textComment of textComments ) {
  textComment.addEventListener ('click',()=> {
  const textCommentIndex = textComment.dataset.index;
  inputTextElement.value =`${comments[textCommentIndex].name}:\n${comments[textCommentIndex].textComment}`;

  renderApp(comments, getList);
  });
  };  
  };
  changeComment ();

 function getLikeButton () {
const likesButtons = document.querySelectorAll (".like-button");
for (const likeButton of likesButtons) {
likeButton.addEventListener ('click',(event)=> {
event.stopPropagation ();
const likeButtonIndex =  likeButton.dataset.index;
const commentsElement = comments [likeButtonIndex];
    if (commentsElement.likeComment) {
      commentsElement.likesNumber -=1;
      commentsElement.colorLikes = 'like-button  -no-active-like';
      commentsElement.likeComment = false;
    } else {
      commentsElement.likesNumber +=1;
      commentsElement.colorLikes = 'like-button  -active-like';
      commentsElement.likeComment = true;
    }
      renderApp(comments, getList);
    });
  };
}; 
getLikeButton ();
//  renderApp(comments, getList);
// getLikeButton();
// changeComment();
buttonElement.addEventListener("click", () => {

    commentLoadingElement.classList.remove ('comment-loading');
    formCommentElement.classList.add ('comment-loading');

      inputNameElement.style.backgroundColor = '';
          inputTextElement.style.backgroundColor = '';
    if (inputNameElement.value === '' && inputTextElement.value === '') {
      
        inputNameElement.style.backgroundColor = 'red';
          inputTextElement.style.backgroundColor = 'red';
          return;
        } else if (inputNameElement.value === '') {
        inputNameElement.style.backgroundColor = 'red';
          return;
        } else if (inputTextElement.value === '') {
       
          inputTextElement.style.backgroundColor = 'red';
          return;
        };  
    
    //   //Первое доп задание
    
    // buttonElement.addEventListener("click", () => {
   
    // if (inputNameElement.value ==='' && inputTextElement.value === '') {
    //     buttonElement.disabled = true;
    //     return;
    // } else if (inputNameElement.value!=='' && inputTextElement.value!=='') {
    //   buttonElement.disabled=false;
    //   return;
    // };

    // Второе доп задание
  //  document.addEventListener("keyup", function(enter) {
  // if (enter.keyCode == 13) {
  //   buttonElement.click();
  // }
// });

    //  buttonElement.disabled = true;
    //  buttonElement.textContent = 'Элемент добавляется...';
   
    return getPost( {token,inputTextElement,inputNameElement})
    .then((response)=>{
      return getFetchPromice();
     })
      .then ((data)=>{
      
      commentLoadingElement.classList.add ('comment-loading');
      formCommentElement.classList.remove ('comment-loading');
        
      inputNameElement.value="";
      inputTextElement.value="";   
    })
    .catch((error)=>{
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуйте позже");
        getPost();
      } else
        if (error.message === "Плохой запрос") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else {
          alert('Кажется, у вас сломался интернет, попробуйте позже');
          console.log(error);
        }
      buttonElement.removeAttribute('disabled');
      commentLoadingElement.classList.add ('comment-loading');
      formCommentElement.classList.remove ('comment-loading');
     
    });
  
  });
  
};
}
export default renderApp;


