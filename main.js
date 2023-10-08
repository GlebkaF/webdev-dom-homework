import { getElements, postElements, showAddForm, hideAddForm, showLoadingIndicatorComments, deleteLoadingIndicatorComments, showLoadingIndicator, deleteLoadingIndicator, correctDate} from "./api.js";
import { renderComments } from "./rernder.js"
"use strict";



   

const listElements = document.getElementById("list");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const buttonElements = document.querySelector('.add-form-button');
const deleteButtonElement = document.querySelector('.delete-button');
let comments = [];

export const сomments = (newComments) => {
    comments = newComments;
}

export function getFetch() {
showLoadingIndicator();
hideAddForm();


  getElements().then((responseData) => {
       const appComment = responseData.comments.map((comment) => {
     
         return {
            name: comment.author.name,
            date: correctDate(comment.date),
            text: comment.text,
            likes: comment.likes,
            islike: false,
          }
        });
         comments = appComment
         renderElements();
         deleteLoadingIndicator(); 
         showAddForm();
      }) 
   .catch((error) => {
     alert('Что-то пошло не так, попробуйте позже');
    });


}
getFetch();
function renderElements (){
 renderComments(comments);
 
 commentOnComment();
 deleteComment();
 addLike();
 
}
renderElements();




function addLike () {

const likeElements = document.querySelectorAll('.like-button');
for(let like of likeElements) {
 like.addEventListener('click', (event) => { 
   event.stopPropagation();
   let index = like.dataset.index 
   let object = comments[index];
   if (object.islike){
     object.islike = false;
     object.likes --;
   } else {
     object.islike = true;
     object.likes ++;
   }
   renderElements();
 })
}

}


function commentOnComment() {
 const commentOnComment = document.querySelectorAll('.comment');
  for(let comment of commentOnComment) {
  comment.addEventListener('click', () => {
    let index = comment.dataset.index
  let object = comments[index];
   commentInputElement.value = `${object.text}  ${object.name}`
  renderElements();
  })
 
 }
}







 const buttonElement = document.getElementById("add-button");
 const listElement = document.getElementById("list");
 const nameInputElement = document.getElementById("name-input");
 const commentInputElement = document.getElementById("comment-input");
 //const currentDate = new Date ().toLocaleString().slice(0, -3);
 

function addComment() {
buttonElement.addEventListener('click', () => {
   nameInputElement.classList.remove("error");
   commentInputElement.classList.remove("error");
    if (nameInputElement.value === '' || commentInputElement.value === '') {
     nameInputElement.classList.add("error");
     commentInputElement.classList.add("error");
     return;
    }
    const nameInComment = nameElement.value 
    const textInComment = textElement.value
    showLoadingIndicatorComments();
    hideAddForm();
    
     postElements({
        text: textInComment.value,
        name: nameInComment.value
     })

   });
}
addComment();






function deleteComment () {
 const buttonDelete = document.querySelectorAll('.delete-button');
 for( let button of buttonDelete) {
   button.addEventListener('click', (event) => {
     let index = button.dataset.index
     comments.splice(index, 1);
     event.stopPropagation();
    renderElements();
   })
 }
   
};


   
         

 console.log("It works!");