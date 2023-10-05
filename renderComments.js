import { renderComments } from "./render.js";
import { postApi, deleteCommentApi } from "./api.js";
import { appElement } from "./ui.js";
import { fetchAndRenderComments } from "./main.js";


function initLikeComments ({ comments }) {       
    
    const listLikeButtons = document.querySelectorAll('.like-button');
  
    for (let like of listLikeButtons) {
      like.addEventListener("click", (event) => {
        event.stopPropagation();
        let indexLike = like.dataset.index;
        if (comments[indexLike].isLiked) {
          comments[indexLike].likes -= 1;
          comments[indexLike].isLiked = false;
        } else {
          comments[indexLike].likes += 1;
          comments[indexLike].isLiked = true;
        }
  
        renderComments({ comments });
  
      })
    }
}


function initReplyComment ({ comments }) {         

   const listLiItems = document.querySelectorAll('.comment');
   const textElement = document.querySelector('textarea[class="add-form-text"]');
 
        for (let liItem of listLiItems) {
            liItem.addEventListener("click", () => {
            let idComment = liItem.dataset.index;

            let indexComment = comments.findIndex(function(comment) {
              return comment.id === idComment;
            });
                     
            let replyComment = `QUOTE_BEGIN ${comments[indexComment].author.name}(${comments[indexComment].author.login}):\n${comments[indexComment].text}QUOTE_END \n`;
            textElement.value = replyComment;
            renderComments({ comments });
            })
        }
}

function checkInput ({ buttonElement, nameElement, textElement }) {

    buttonElement.className = 'error-add-form-button'; 
    let nameElementCheck = false;                  
    let textElementCheck = false;         
    function handleInputs() {             
      if (nameElementCheck && textElementCheck) {     
        buttonElement.className = 'add-form-button';   
      }
    }
    nameElement.addEventListener("input", () => {   
      nameElementCheck = true;
      handleInputs();
    })
    textElement.addEventListener("input", () => {   
      textElementCheck = true;
      handleInputs();
    })
}

function addComment ({ buttonElement, addFormElement, addFormProgressElement, nameElement, textElement, comments, fetchAndRenderComments }) {
    let buttonCheck = false;  
    let enterCheck = false;   
    function handleAddButtons() {          
      if (buttonCheck || enterCheck) {  
        if (nameElement.value === '' || textElement.value === '') { 
          buttonElement.className = 'error-add-form-button';        
          return;
        }
      addFormElement.style.display = 'none';
      addFormProgressElement.style.display = 'block'
        
          function postComment() {
          postApi ({
              name: nameElement.value,
              text: textElement.value,
          })
          .then((responseData) => {
            comments = responseData.comments;
          })
          .then(() => {
            return fetchAndRenderComments();  
          })
          .then((data) => {
            addFormProgressElement.style.display = 'none';
            addFormElement.style.display = 'flex';
            nameElement.value = '';           
            textElement.value = '';
            checkInput ({ buttonElement, nameElement, textElement });
          })
          .catch((error, typeError) => {
            addFormProgressElement.style.display = 'none';
            addFormElement.style.display = 'flex';
            if (error.message === "Плохой запрос") {
              alert("Имя и комментарий должны быть не короче 3 символов");
              return;
            }
            if (error.message === "Сервер сломался") {
              addFormElement.style.display = 'none';
              addFormProgressElement.style.display = 'block';
              postComment();
            }
            else {
              alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
            console.warn(error);
          });
          }
      postComment();
      }
    }

    buttonElement.addEventListener("click", () => {   
      buttonCheck = true;
      handleAddButtons();

    })

    document.addEventListener("keyup", (event) => {   
      if (event.key === 'Enter') {
        enterCheck = true;
        handleAddButtons();
      }
    })
}

function deleteComment({ comments }) {
  let indexDeleteComment = comments.length - 1;
  let id = comments[indexDeleteComment].id;
  let buttonDelete = document.querySelector('button[class="delete-form-button"]');
  buttonDelete.addEventListener("click", () => {
    console.log(id);
    buttonDelete.disabled = true;
    buttonDelete.textContent = "Комментарий удаляется...";
    deleteCommentApi({ id })
    .then(() => {
      fetchAndRenderComments();
    })
    .catch((error) => {
      if (error.message === "Нет авторизации") {
        alert("Сначала авторизуйтесь!");
        buttonDelete.disabled = false;
        buttonDelete.textContent = "Удалить последний комментарий";
        return;    
    } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        buttonDelete.disabled = false;
        buttonDelete.textContent = "Удалить последний комментарий";
    }
    console.warn(error);
    });    
  })
}

export function initLoaderComments() {
  appElement.innerHTML = `
  <div class="comments-progress">
    <p>Подождите, комментарии загружаются...</p>
  </div>`;
}

export { initLikeComments, initReplyComment, checkInput, addComment, deleteComment };