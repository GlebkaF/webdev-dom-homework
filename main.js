"use strict";
//   import { fetchPromise } from "./api.js";
import renderComments from "./renderStudents";

  const buttonElement = document.getElementById("button")
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const commentForm = document.getElementById("form-comment");
  const commentsContainer = document.getElementById("commentsContainer");
  const newContainerComments = document.getElementById("container")

  commentsContainer.style.display = 'none';
  const commentAdding = document.createElement('div'); 
  commentAdding.innerText = 'Пожалуйста подождите, загружаю комментарии...';
  commentsContainer.parentNode.insertBefore(commentAdding, commentsContainer);
//   fetchPromise();
  const fetchPromise = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/olya-myalo/comments", {
      method: "GET"
    })
    .then((response) => (response.json()))
    .then((responseData) => { 
    const appComments = responseData.comments.map((comment) => { 
      return { 
        name: comment.author.name,  
        date: formatDate(new Date(comment.date)),  
        text: comment.text, 
        active: false,
        like: comment.likes, 
        }; 
      }); 
      comments = appComments; 
      renderComments();
      })
      .then((data) => {
        commentAdding.style.display = 'none';
        commentsContainer.style.display = 'block';
        });
};

  let comments = [
];
const formatDate = (commentDate) => { 
  let month = (commentDate.getMonth() + 1).toString().padStart(2, '0'); 
  let day = commentDate.getDate().toString().padStart(2, '0'); 
  let year = commentDate.getFullYear().toString().substr(-2); 
  let hours = commentDate.getHours().toString().padStart(2, '0'); 
  let minutes = commentDate.getMinutes().toString().padStart(2, '0'); 
  let seconds = commentDate.getSeconds().toString().padStart(2, '0'); 
  const resultDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  return resultDate;
}
const onCommentLikeClick = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButtonsElement of likeButtonsElements) {
    likeButtonsElement.addEventListener("click", () => {
      event.stopPropagation();
      const index = likeButtonsElement.dataset.index;
      const likesContainer = likeButtonsElement.closest('.comment-footer');
      const likesCounter = likesContainer.querySelector('.likes-counter');
      let likesCount = likesCounter.textContent;
      if (comments[index].active === true) {
        likesCount = (+likesCount) - 1;
        comments[index].active = false;
      } else {
        likesCount = (+likesCount) + 1;
        comments[index].active = true;
      }
      comments[index].like = likesCount;
      renderComments();
    });
  }
};

const onCommentEditClick = () => { 
  const editButtonsElements = document.querySelectorAll(".edited-button"); 
  for (const editButtonElement of editButtonsElements) { 
    editButtonElement.addEventListener("click", () => { 
      event.stopPropagation();
      const index = editButtonElement.dataset.index; 
      const button = event.target; 
      const buttonTitle = button.innerText; 
      const commentElement = button.parentNode.parentNode; 
      const text = commentElement.getElementsByClassName('comment-text')[0]; 
      const isEdit = comments[index].isEdit; 
      if (buttonTitle === 'Редактировать') { 
        button.innerText = 'Сохранить'; 
        if (!isEdit) { 
          comments[index].isEdit = true; 
          text.innerHTML = `<textarea>${text.innerText}</textarea>`; 
        } 
      } 
      else { 
        button.innerText = 'Редактировать'; 
        if (isEdit) { 
          comments[index].isEdit = false; 
          const textArea = text.getElementsByTagName('textarea')[0]; 
          comments[index].text = textArea.value; 
          text.innerHTML = comments[index].text; 
        } 
      } 
    });
  } 
}

let currentCommentFeedback = null;
const onCommentFeedbackClick = () => {  
  const feedbackButtonsElements = document.querySelectorAll(".comment-text");   
  for (const feedbackButtonsElement of feedbackButtonsElements) {   
    feedbackButtonsElement.addEventListener("click", () => {  
      currentCommentFeedback = feedbackButtonsElement.dataset.index;
      commentInputElement.value = `>${comments[currentCommentFeedback].text} ${comments[currentCommentFeedback].name}`;
    });  
  }  
};

// const renderComments = () => {
//    const commentsHtml = comments.map((comment, index) => {
//     let likeClass = comment.active ? "-active-like" : "";
//     return `<li class="comment">
//           <div class="comment-header">
//             <div id ="name">${comment.name}</div>
//             <div>${comment.date} </div>
//           </div>
//           <div class="comment-body">
//             <div id = "text" data-index="${index}" class="comment-text" style={{ whiteSpace: 'pre-line' }}>
//               ${comment.text}
//             </div>
//           </div>
//           <div class="comment-footer">
//             <button data-index="${index}" class="edited-button">Редактировать</button>
//             <div class="likes">
//               <span class="likes-counter">${comment.like}</span> ${comment.like === 1 ? 'лайк' : 'лайков'}
//               <button data-index="${index}" class="like-button ${likeClass}"></button> 
//             </div>
//           </div>
//         </li>`
//     }).join('');
//     listElement.innerHTML = commentsHtml;
//     onCommentLikeClick();
//     onCommentEditClick();
//     onCommentFeedbackClick();
//   }
  fetchPromise();
  renderComments();

    
    buttonElement.addEventListener("click", () => {
      commentForm.style.display = 'none';
      const commentAddingMessage = document.createElement('div'); 
      commentAddingMessage.innerText = 'Комментарий добавляется...';
      commentForm.parentNode.insertBefore(commentAddingMessage, commentForm); 
      
      nameInputElement.classList.remove("error");
      if (nameInputElement.value === "" && nameInputElement.value.length < 3) {
        nameInputElement.classList.add("error");
        return;
      }
      commentInputElement.classList.remove("error");
      if (commentInputElement.value === "" && commentInputElement.value.length < 3) {
        commentInputElement.classList.add("error");
        return;
      }
      let date = new Date();
      let likes = 0;
      comments.push({ 
      name: nameInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">","&gt;"), 
      date: formatDate(date), 
      text: commentInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">","&gt;"), 
      active: false,
      like: likes, 
});
      fetch("https://webdev-hw-api.vercel.app/api/v1/olya-myalo/comments", {
        method: "POST",
        body: JSON.stringify({
          name: nameInputElement.value,  
          text: commentInputElement.value,
          forceError: false,
        })
      })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        }
        if (response.status === 400) {
          throw new Error("Неверный запрос");
        }
        else {
          return response.json();
        }
      })
      .then(() => {
          fetchPromise();
        })
      .then((data) => {
        commentAddingMessage.style.display = 'none';
        commentForm.style.display = 'block';
        nameInputElement.value = "";
        commentInputElement.value = "";
        renderComments();
        })
        .catch((error) => {
        commentAddingMessage.style.display = "none";
        commentForm.style.display = "block";
        if (error.message === "Неверный запрос") {
        alert("Имя и комментарий должны быть не короче 3-х символов");
        } 
        if (error.message === "Сервер упал") {
        alert("Извините сервер сломался, попробуйте позже");
        }
        else {
        alert("Отсутствует подключение к сети, попробуйте позже!");
        }
        console.warn(error);
        });
      });
   export default comments;  
   export default onCommentLikeClick;
   export default onCommentEditClick;
   export default onCommentFeedbackClick;

