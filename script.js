
import { safeInputText,} from "./secondaryFunc.js"
import { delValue,pushCommentwithEnter,renderComments,} from "./workWithForm.js";
import { getCommentList, host,} from "./api.js";




export const listElement = document.getElementById("comments");

export const mainForm = document.querySelector(".add-form");
const waitLoadComments = document.getElementById("loaderComments");




// waitLoadComments.style.display = "flex";


export let token ="Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"

export let comments =[]


// функция Данные с сервера.
export const fetchAndRenderTasks = () =>{
 
 return getCommentList()
  .then((responseData) => {
   
    comments = responseData.comments;
    // waitLoadComments.style.display = "none";
  renderComments();
  })

  .catch((error) => {
    console.error(error)
    if (error.message === "Сервер сломался, попробуй позже") {
      alert('Сервер упал')
      return;
    }

})

}
fetchAndRenderTasks();



 // функция Добавление комментария
 
  
 


// отправка комментария на сервер

   





// Добавление лайкаs
// addLike ()
// // Добавление комментария  к инпуту
// reComment()
// // // Рендер разметки
// renderComments()
renderComments()
// // функция Добавление комментария
// addcommentuser();


// delLastComment()

//  // Ввод по нажатию клавиши Enter
// pushCommentwithEnter();












