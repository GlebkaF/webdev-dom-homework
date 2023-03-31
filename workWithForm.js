import { nameInputElement, commentInputElement, mainForm, addComment,pushComment,listElement,comments } from "./script.js";

import { delay, getDate } from "./secondaryFunc.js";




// Функция удаления последнего комментария
export function delComment() {
    comments.pop()
      renderComments();
  }


  // Отчистка данных с поля
export function delValue() {
    nameInputElement.value = "";
    commentInputElement.value = "";
  };
  
// // Ввод по нажатию клавиши Enter

  export function pushCommentwithEnter(){
    mainForm.addEventListener('keyup', (event) => {
  
      if (event.code === "Enter"  ) {
        addComment.click();
      }
    });  
  }

  // Блокировка кнопки ввода()
  export const buttonBlock = () => {
    document.querySelectorAll("#name-input,#comment-input").forEach((el) => {
      el.addEventListener("input", () => {
        if (document.getElementById("name-input").value === '' || document.getElementById("comment-input").value === '')
          document.getElementById("add-button").disabled = true;
        else
          document.getElementById("add-button").disabled = false;
      });
    });
  }

 // функция Добавление комментария
export function addcommentuser(){
    addComment.addEventListener("click", () => {
  
      if (nameInputElement.value === "" || commentInputElement.value === "") {
        
        nameInputElement.classList.add("error");
        commentInputElement.classList.add("error");
        nameInputElement.placeholder = 'Введите имя';
        commentInputElement.placeholder = 'Введите комментарий';
        buttonBlock()
        return;  
      } 
    
        pushComment()
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");
        const oldListHtml = listElement.innerHTML;
        renderComments();
     
    });
  }


   export function reComment () {
  
    const allComments = document.querySelectorAll('.comment')
    for(let comment of allComments){
     comment.addEventListener('click', (event)=>{
       event.stopPropagation()
       const nameUser = comment.dataset.name;
       const userComments = comment.dataset.comment;
       commentInputElement.value =` >${userComments} \n${nameUser} <\n`
       
     })
    
    }
   }

// Добавление лайка
export function addLike () {
    const likeButtons = listElement.querySelectorAll('.like-button');
    for(let likeButton of likeButtons){
  
      likeButton.addEventListener('click', ( event) => {
        event.stopPropagation()
            const index = likeButton.dataset.index;
            likeButton.classList.add('-loading-like')
            delay(2000).then(()=> {
             
              if (!comments[index].isLiked) {
                comments[index].isLiked = true;
                comments[index].likes +=1;
              } else {
                comments[index].isLiked = false;
                comments[index].likes -=1;
              }
              renderComments();
            })
  
        })
    }
  }   


  // Рендер разметки

// Рендер разметки
export function renderComments() {
  
  const userHtml = comments.map((user, index) => {
    return `<li class="comment"  data-name="${user.author.name}" data-comment="${user.text}">
    <div class="comment-header">
      <div>${user.author.name}</div>
      <div>${getDate(user.date)}</div>
    </div>
    <div class="comment-body" >
   <div class ="comment-text"> ${user.text} </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button data-index="${index}"  class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
    
      </div>
    </div>
  </li>`
  }).join('')

  listElement.innerHTML = userHtml;
  addLike()  // лайки
  reComment() // Комментирование поста

}