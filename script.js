
import { safeInputText,} from "./secondaryFunc.js"
import { delComment, delValue,pushCommentwithEnter,addcommentuser,reComment,addLike,renderComments} from "./workWithForm.js";

export const addComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
export const listElement = document.getElementById("comments");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
export const mainForm = document.querySelector(".add-form");
export const likeButton = document.querySelectorAll(".like-button");
export const waitLoadComments = document.getElementById("loaderComments");
const pushComments = document.getElementById("PushCommentsText");
pushComments.style.display = "none"
waitLoadComments.style.display = "flex";


 export let comments  = []

// функция Данные с сервера
const fetchAndRenderTasks = () =>{
 return fetch("https://webdev-hw-api.vercel.app/api/v1/Kerimov-Evgeny/comments", {
  method: "GET"
})
  .then((response) => {
     if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже")};
     return response.json()
  })

  .then((responseData) => {
    comments = responseData.comments;
    waitLoadComments.style.display = "none";
    renderComments();
  })

  .catch((error) => {
    if (error.message === "Сервер сломался, попробуй позже") {
      alert('Сервер упал')
      return;
    }

})
 

}


// отправка комментария на сервер
export function pushComment(){
  fetch('https://webdev-hw-api.vercel.app/api/v1/Kerimov-Evgeny/comments', {
    method: "POST",

    body: JSON.stringify({
        date: new Date,
        likes: 0,
        isLiked: false,
        text: safeInputText(commentInputElement.value),
        name: safeInputText(nameInputElement.value),
        forceError: true
      })

      })
      .then((response) => {
        if (response.status === 400){
          throw new Error("Слишком короткая строчка");
        } 
        if (response.status === 500) {
          pushComment();
          throw new Error("Сервер сломался, попробуй позже")
        }
          mainForm.style.display = "none";
          pushComments.style.display = "flex"
          return fetchAndRenderTasks()

      })
  
      .then(()=>{     
        mainForm.style.display = "flex";
        pushComments.style.display = "none"
        delValue(); 
      })

      .catch((error) => {
        if (error.message === "Сервер сломался, попробуй позже") {
          console.warn("Сервер не работает, попробуйте позже")
          mainForm.style.display = "flex";
          pushComments.style.display = "none"
            return;
        }
        if (error.message === "Слишком короткая строчка") {
            alert("Имя и комментарий должны быть не короче 3 символов")
            mainForm.style.display = "flex";
            pushComments.style.display = "none"
            return;
        }
        mainForm.style.display = "flex";
        pushComments.style.display = "none"
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        return;
       
    })
   

}

fetchAndRenderTasks();

// Добавление лайкаs
addLike ()
// Добавление комментария  к инпуту
reComment()
// // Рендер разметки
renderComments()
// функция Добавление комментария
addcommentuser();

// Удаление последнего комментария
removeComment.addEventListener("click", () => {
  delComment()
})
 // Ввод по нажатию клавиши Enter
pushCommentwithEnter();












