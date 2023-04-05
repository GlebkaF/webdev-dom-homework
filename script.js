
import { safeInputText,} from "./secondaryFunc.js"
import { delValue,pushCommentwithEnter,addcommentuser,reComment,renderComments,} from "./workWithForm.js";
import { getCommentList, host,} from "./api.js";




export const listElement = document.getElementById("comments");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
export const mainForm = document.querySelector(".add-form");
const waitLoadComments = document.getElementById("loaderComments");




// waitLoadComments.style.display = "flex";


export let token ="Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"

export let comments =[]


// функция Данные с сервера.
const fetchAndRenderTasks = () =>{
 
 return getCommentList()
  .then((responseData) => {
   
    comments = responseData.comments;
    // waitLoadComments.style.display = "none";
    renderComments();
  })

  .catch((error) => {
    
    if (error.message === "Сервер сломался, попробуй позже") {
      alert('Сервер упал')
      return;
    }

})

}
fetchAndRenderTasks();

// отправка комментария на сервер
export function pushComment(){
  const pushComments = document.getElementById("PushCommentsText");
  // pushComments.style.display = "none"
  fetch(host, {
    method: "POST",

    body: JSON.stringify({
        date: new Date,
        likes: 0,
        isLiked: false,
        text: safeInputText(commentInputElement.value),
        name: safeInputText(nameInputElement.value),
        forceError: true
      }),

      headers: {
        Authorization: token,
    },
  

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
          return response.json();

      })
      .then(()=>{
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



// Добавление лайкаs
// addLike ()
// // Добавление комментария  к инпуту
// reComment()
// // // Рендер разметки
renderComments()
// // функция Добавление комментария
// addcommentuser();


// delLastComment()

//  // Ввод по нажатию клавиши Enter
// pushCommentwithEnter();












