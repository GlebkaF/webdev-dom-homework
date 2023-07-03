
import{fetchFunction} from "./index.js";
import {comments} from "./index.js"
import { getFetch, postFetch } from "./api.js";
import {renderLoginComponent} from "./login-components.js";

export const buttonElement = document.getElementById('add-form-button');
export const nameInputElement = document.getElementById('input-name');
export const textElement = document.querySelector('.add-form-text');
export const commentsElement = document.querySelector('.comments');
export const addFormElement = document.getElementById('add-form');
 let token = null;
let name = null;

 const renderComments  = ({ getCommentsList}) => {
 const appEl = document.getElementById("app");
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
      fetchFunction,
  });
  
}
  
  else {
    const commentsHTML = comments
     .map((comment, index) => getCommentsList (comment, index)).join(''); 
    
     const appHtml = `   <div class="container" id = "container">
     <div >
 
     <ul class="comments" id="comments">
     ${commentsHTML}
     </ul>
     <div class="add-form" id = 'add-form'>
       <input
         type="text"
         class="add-form-name"
         placeholder="Введите ваше имя"
         id = 'input-name' value = "${name}"
       />
       <textarea
         type="textarea"
         class="add-form-text"
         placeholder="Введите ваш коментарий"
         rows="4" id ="new-text"
       ></textarea> 
       <div class="add-form-row">
         <button class="add-form-button" id = 'add-form-button'>Написать</button> 
        </div> 
        </div>
        </div> 
      </div> `
    
    
         appEl.innerHTML = appHtml;
    
        

  // return;
  const addFormElement = document.getElementById('add-form');
       addFormElement.classList.remove('hide');
        

        const nameInputElement = document.getElementById('input-name');
         const textElement = document.querySelector('.add-form-text');
         const buttonElement = document.getElementById('add-form-button');
        nameInputElement.setAttribute('disabled', 'disabled');


//добавление комментария
function  commentPost (){
   return postFetch(nameInputElement, textElement, token)
    .then((response) => {
     return getFetch();
    })
    .then(() => {
     nameInputElement.value = "";
     textElement.value = "";
     })
    .catch((error) => {
     if (error.message === "Сервер сломался") {
     alert("Сервер сломался, попробуйте позже");
       
     commentPost ();
     } else if (error.message === "Плохой запрос") {
     alert("Имя и комментарий должны быть не короче 3 символов");
     } else {
     alert("Кажется, у вас сломался интернет, попробуйте позже");
    console.log(error);
     }
    });
}


//добавление новых комментариев по кнопке
buttonElement.addEventListener ("click", () => {
  //nameInputElement.style.background = '';
 // if (nameInputElement.value === "" ){
//    nameInputElement.style.background = 'red';
//    return;
//   };
   textElement.style.background = '';
   if (textElement.value === ""){
      textElement.style.background = 'red';
      return;
   };

 const addFormElement = document.getElementById('add-form');
 addFormElement.classList.remove('hide');

commentPost();
renderComments ({ comments, getCommentsList} )

})
//цитирование
 const quotation = () => {

  let commentElements  = document.querySelectorAll ('.comment');

  for (const commentElement of commentElements){
  commentElement.addEventListener('click', () => {
  const index = commentElement.dataset.index;
  textElement.value =  `"${comments[index].name}:  ${comments[index].textElement}"\n`
      });
    };
  };
  quotation ();
    
function likeCommentButton() {    
 const likesButton = document.querySelectorAll('.like-button');
for (const like of likesButton) {
   like.addEventListener("click", (event) => {
    event.stopPropagation();
   const likeIndex = like.dataset.index;
    const commentsElement = comments[likeIndex];
            
    if (commentsElement.likeComment) {
    commentsElement.likesNumber -= 1;
    commentsElement.likeComment = false;
    commentsElement.propertyColorLike = 'like-button -no-active-like';           
  } else {
    commentsElement.likesNumber += 1;
   commentsElement.likeComment = true;
    commentsElement.propertyColorLike = 'like-button -active-like';                  
    }
renderComments({ comments, getCommentsList} );
 })
}
};
   likeCommentButton();

     }
 }
export default renderComments;