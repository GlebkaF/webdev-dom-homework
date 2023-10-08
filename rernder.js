import { сomments } from "./main.js"; 
let comments = [];
export function renderComments (comments){
    const commentsHTML = comments.map((element, index)=>{
         return `<li class="comment" data-index="${index}" >
         <div class="comment-header">
           <div>${element.name}</div>
           <div>${element.date}</div>
         </div>
         <div class="comment-body">
           <div class="comment-text">
             ${element.text}
           </div>
         </div>
         <div class="comment-footer">
           <div class="likes">
             <span class="likes-counter">${element.likes}</span>
             <button data-index="${index}" class="like-button ${element.islike ? "-active-like" : ""}"></button>
             
           </div>
         </div>
         <button data-index="${index}" class="add-form-button delete-button">Удалить</button>
       </li>`
       
     }).join("");
     list.innerHTML = commentsHTML;
    };